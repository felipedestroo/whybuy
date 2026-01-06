"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Complexity =
  | "O(1)"
  | "O(log n)"
  | "O(n)"
  | "O(n log n)"
  | "O(n²)"
  | "O(2ⁿ)"
  | "O(n!)";

/**
 * Factorial para n pequeno.
 */
function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

/**
 * Sempre n = 1..10 no eixo X.
 */
const BASE_N_VALUES: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

/**
 * Quantos pontos a linha realmente desenha antes de “parar”.
 *
 * Ordem de explosão (mais cedo → mais tarde):
 *   O(n!)  → para em n=3
 *   O(2ⁿ)  → para em n=5
 *   O(n²)  → para em n=9
 *   O(n log n), O(n), O(log n), O(1) → usam os 10 pontos
 */
const VISIBLE_POINTS_BY_COMPLEXITY: Record<Complexity, number> = {
  "O(1)": 10,
  "O(log n)": 10,
  "O(n)": 10,
  "O(n log n)": 10,
  "O(n²)": 9,
  "O(2ⁿ)": 5,
  "O(n!)": 3,
};

/**
 * Fórmulas “cruas” usadas para normalizar n log n, n² e 2ⁿ.
 */
const RAW_FORMULA_BY_COMPLEXITY: Record<Complexity, (n: number) => number> = {
  "O(1)": () => 1,
  "O(log n)": (n) => Math.log2(n + 1),
  "O(n)": (n) => n,
  "O(n log n)": (n) => n * Math.log2(n + 1),
  "O(n²)": (n) => n * n,
  "O(2ⁿ)": (n) => Math.pow(2, n),
  "O(n!)": (n) => factorial(n),
};

function resolveComplexity(complexity: string): Complexity {
  const known: Complexity[] = [
    "O(1)",
    "O(log n)",
    "O(n)",
    "O(n log n)",
    "O(n²)",
    "O(2ⁿ)",
    "O(n!)",
  ];
  return (
    known.includes(complexity as Complexity) ? complexity : "O(n)"
  ) as Complexity;
}

/**
 * Gera os dados do gráfico:
 *
 * - O(1), O(log n), O(n) → mantêm exatamente o comportamento que você curtiu.
 * - O(n!) → usa [1.11, 10, 100] em n=1,2,3 e some depois.
 * - O(n log n), O(n²), O(2ⁿ) → usam fórmulas reais e são normalizados para [1, 100]
 *   para ficar com o shape parecido com o gráfico de referência:
 *   - O(n log n): curva suave acima de linear (explode mais tarde).
 *   - O(n²): parabólica, explode antes de O(n log n), depois de O(2ⁿ).
 *   - O(2ⁿ): bem flat no início e explode por volta do meio do gráfico.
 */
function generateChartData(complexity: string) {
  const key = resolveComplexity(complexity);
  const visiblePoints = VISIBLE_POINTS_BY_COMPLEXITY[key];

  // Casos já aprovados: O(1), O(log n), O(n), O(n!)
  if (
    key === "O(1)" ||
    key === "O(log n)" ||
    key === "O(n)" ||
    key === "O(n!)"
  ) {
    return BASE_N_VALUES.map((n, index) => {
      if (key === "O(n!)") {
        // n! especial: n=1..3 com valores explícitos, depois some
        if (index >= visiblePoints) {
          return { n, operations: null as unknown as number };
        }
        const values = [1.11, 10, 100];
        const y = values[index];
        return { n, operations: Number(y.toFixed(2)) };
      }

      // O(1), O(log n), O(n) – escala manual que você curtiu
      let y: number;
      if (key === "O(1)") {
        y = 20; // constante
      } else if (key === "O(log n)") {
        y = Math.log2(n + 1) * 8; // curva baixa, nunca chega perto de 100
      } else {
        // O(n)
        y = n * 10; // 10,20,...,100
      }

      if (y > 100) y = 100;
      if (y < 0) y = 0;

      return {
        n,
        operations: Number(y.toFixed(2)),
      };
    });
  }

  // Aqui entram: O(n log n), O(n²), O(2ⁿ)
  const formula = RAW_FORMULA_BY_COMPLEXITY[key];
  const usedN = BASE_N_VALUES.slice(0, visiblePoints);
  const rawValues = usedN.map((n) => formula(n));

  const minRaw = Math.min(...rawValues);
  const maxRaw = Math.max(...rawValues);
  const range = maxRaw - minRaw || 1;

  return BASE_N_VALUES.map((n, index) => {
    if (index < visiblePoints) {
      const raw = rawValues[index];
      // normaliza para (1 .. 100) preservando a forma da curva
      const norm = ((raw - minRaw) / range) * 99 + 1;
      return {
        n,
        operations: Number(norm.toFixed(2)),
      };
    }

    // mantém X, mas quebra a linha depois dos pontos visíveis
    return {
      n,
      operations: null as unknown as number,
    };
  });
}

const getComplexityColor = (complexity: string) => {
  switch (complexity) {
    case "O(1)":
      return "hsl(142, 76%, 36%)"; // green-600
    case "O(log n)":
      return "hsl(217, 91%, 60%)"; // blue-500
    case "O(n)":
      return "hsl(48, 96%, 53%)"; // yellow-500
    case "O(n log n)":
      return "hsl(25, 95%, 53%)"; // orange-500
    case "O(n²)":
      return "hsl(20, 79%, 45%)"; // orange-600
    case "O(2ⁿ)":
      return "hsl(0, 84%, 60%)"; // red-500
    case "O(n!)":
      return "hsl(0, 72%, 51%)"; // red-600
    default:
      return "hsl(240, 5%, 64%)"; // gray-500
  }
};

interface ComplexityChartProps {
  detectedComplexity: string;
}

export function ComplexityChart({ detectedComplexity }: ComplexityChartProps) {
  const complexityKey = resolveComplexity(detectedComplexity);
  const chartData = generateChartData(complexityKey);
  const color = getComplexityColor(complexityKey);

  const chartConfig = {
    operations: {
      label: complexityKey,
      color,
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[200px] sm:h-[250px] w-full"
    >
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 0, right: 12, top: 12, bottom: 12 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="n"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          label={{
            value: "n",
            position: "insideBottomRight",
            offset: -5,
            className: "fill-muted-foreground text-xs",
          }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={45}
          domain={[0, 100]}
          label={{
            value: "relative cost",
            angle: -90,
            position: "insideLeft",
            className: "fill-muted-foreground text-xs",
          }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="operations"
          type="monotone"
          stroke={color}
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 4 }}
          connectNulls={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
