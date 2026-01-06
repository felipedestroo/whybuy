"use client";

import { ModeToggle } from "./mode-toggle";
import { LanguageToggle } from "./language-toggle";
import { SidebarTrigger } from "./ui/sidebar";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/hooks/use-translation";

export function Header() {
  const pathname = usePathname();
  const isAnalyzerPage = pathname?.startsWith("/big-o-analyzer");
  const { t } = useTranslation();

  return (
    <header className="flex justify-between mx-4 mt-4">
      <SidebarTrigger />
      <div className="flex gap-4 pb-4">
        {!isAnalyzerPage && (
          <Button
            asChild
            className="relative rounded-md px-6 py-2 overflow-hidden group bg-primary text-white hover:bg-gradient-to-r hover:from-primary hover:to-primary/80 hover:ring-2 hover:ring-offset-2 hover:ring-primary/50 transition-all ease-out duration-300 cursor-pointer"
          >
            <Link
              href="/big-o-analyzer"
              className="relative inline-flex items-center justify-center w-32 gap-2"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative font-bold">{t("common.analyze")}</span>
              <Sparkles className="relative h-5 w-5" strokeWidth={2} />
            </Link>
          </Button>
        )}
        <LanguageToggle />
        <ModeToggle />
      </div>
    </header>
  );
}
