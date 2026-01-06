"use client";

import {
  BookOpen,
  HelpCircle,
  Settings,
  Code2,
  Info,
  MessageCircle,
  Play,
  ChartSpline,
  BookText,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTranslation } from "@/hooks/use-translation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const { setOpenMobile, isMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const documentationPages = [
    {
      title: t("sidebar.introduction"),
      url: "/getting-started",
      icon: BookOpen,
    },
    {
      title: t("sidebar.howItWorks"),
      url: "/how-it-works",
      icon: Settings,
    },
    {
      title: t("sidebar.userGuide"),
      url: "/user-guide",
      icon: Code2,
    },
    {
      title: t("sidebar.complexityTypes"),
      url: "/complexity-types",
      icon: ChartSpline,
    },
    {
      title: t("sidebar.examples"),
      url: "/examples",
      icon: BookText,
    },
    {
      title: t("sidebar.faq"),
      url: "/faq",
      icon: HelpCircle,
    },
  ];

  const evaluationPage = {
    title: t("sidebar.bigOAnalyzer"),
    url: "/big-o-analyzer",
    icon: Play,
    description: t("sidebar.analyzerDescription"),
  };

  const aboutPages = [
    {
      title: t("sidebar.aboutProject"),
      url: "/about",
      icon: Info,
    },
    {
      title: t("common.contactSupport"),
      url: "/contact",
      icon: MessageCircle,
    },
  ];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" onClick={handleLinkClick}>
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-transparent border border-border">
                  <Image
                    src="/big-o-logo.svg"
                    alt="Big O Logo"
                    width={32}
                    height={32}
                    className="size-8"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-semibold text-sm">
                    {t("sidebar.title")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t("sidebar.subtitle")}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/70">
            {t("common.documentation")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {documentationPages.map((page) => (
                <SidebarMenuItem key={page.title}>
                  <SidebarMenuButton asChild>
                    <Link href={page.url} onClick={handleLinkClick}>
                      <page.icon className="size-4" />
                      <span>{page.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/70">
            {t("common.application")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={evaluationPage.description}>
                  <Link href={evaluationPage.url} onClick={handleLinkClick}>
                    <evaluationPage.icon className="size-4" />
                    <span>{evaluationPage.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/70">
            {t("common.about")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aboutPages.map((page) => (
                <SidebarMenuItem key={page.title}>
                  <SidebarMenuButton asChild>
                    <Link href={page.url} onClick={handleLinkClick}>
                      <page.icon className="size-4" />
                      <span>{page.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
