import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MessageCirclePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cx } from "class-variance-authority";
import { Chat } from "@/types";

export function AppSidebar({ items }: { items: Chat[] }) {
  return (
    <Sidebar>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel>Чаты</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Button
                className={cx(
                  "cursor-pointer bg-[#e9e9e9] text-black border-primary border-2 hover:text-white"
                )}
                asChild
              >
                <span>
                  <MessageCirclePlusIcon />
                  <p>Новый чат</p>
                </span>
              </Button>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton className={cx("cursor-pointer")} asChild>
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
