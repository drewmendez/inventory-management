import {
  BoxIcon,
  HistoryIcon,
  LayoutDashboard,
  ListIcon,
  ScaleIcon,
  TagsIcon,
  TerminalIcon,
  UsersIcon,
} from 'lucide-react'

import * as React from 'react'
import { Link } from 'react-router'
import { NavGroup } from '@/components/app-sidebar/nav-group'
import { NavUser } from '@/components/app-sidebar/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useAuth } from '@/context/auth'

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: <LayoutDashboard />,
    },
    {
      title: 'Item Inventories',
      url: '/dashboard/item-inventories',
      icon: <BoxIcon />,
    },
    {
      title: 'Transactions',
      url: '/dashboard/transactions',
      icon: <ListIcon />,
    },
    {
      title: 'Inventory Logs',
      url: '/dashboard/inventory-logs',
      icon: <HistoryIcon />,
    },
  ],
  navAdmin: [
    {
      title: 'Manage Users',
      url: '/dashboard/manage-users',
      icon: <UsersIcon />,
    },
    {
      title: 'Manage Categories',
      url: '/dashboard/manage-categories',
      icon: <TagsIcon />,
    },
    {
      title: 'Manage Units',
      url: '/dashboard/manage-units',
      icon: <ScaleIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isAdmin } = useAuth()
  const { setOpenMobile } = useSidebar()
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard" onClick={() => setOpenMobile(false)}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <TerminalIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Inventory Management</span>
                  <span className="truncate text-xs">System</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavGroup title="Main Menu" items={data.navMain} />
        {isAdmin && <NavGroup title="Admin Menu" items={data.navAdmin} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
