"use client";

import React from "react";

import { useCookies } from "next-client-cookies";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { cn } from "@/lib/utils";
import Navbar from "./navbar";
import SidebarLink from "./sidebar-link";
import { TooltipProvider } from "./ui/tooltip";
import Mation from "./mation";

interface Props {
  children: React.ReactNode;
}

export function Container({ children }: Props) {
  const cookies = useCookies();
  const layout = cookies.get("react-resizable-panels:layout:mail");
  const collapsed = cookies.get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout) : [13, 32, 48];
  const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined;

  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`;
        }}
        className="min-h-screen items-stretch fixed  overflow-hidden"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={0}
          collapsible={true}
          minSize={13}
          maxSize={13}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed
              ? "min-w-[60px] dark:bg-black transition-all duration-300 ease-in-out"
              : `min-w-52 transition-all dark:bg-black duration-300 ease-in-out`
          )}
        >
          <SidebarLink isCollapsed={isCollapsed} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <Navbar />
          <Mation>
            <div className="p-6 space-y-8">{children}</div>
          </Mation>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
