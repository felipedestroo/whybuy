'use client'

import { useState } from 'react'
import { Expense } from '@/types/expense'
import { getExpenses } from '@/services/expenseService'

function getEmotionEmoji(emotion: string) {
  const map: Record<string, string> = {
    feliz: '😄',
    neutro: '😐',
    ansioso: '😰',
    estressado: '😡',
    triste: '😔',
  }

  return map[emotion] || '❓'
}

export default function Home() {
  const [expenses] = useState<Expense[]>(() => getExpenses())

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">WhyBuy?</h1>

      <p className="mt-2 text-gray-600">
        Entenda como suas emoções influenciam seus gastos.
      </p>

      <ul className="mt-6 space-y-3">
        {expenses.map((expense) => (
          <li key={expense.id} className="flex justify-between rounded border p-4">
            <div>
              <p className="font-medium">{expense.category}</p>
              <p className="text-sm text-gray-500">{expense.date}</p>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                R$ {expense.value.toFixed(2)}
              </p>
              <p>
                {getEmotionEmoji(expense.emotion)} {expense.emotion}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
