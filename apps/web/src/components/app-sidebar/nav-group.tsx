import { Link, useLocation } from 'react-router'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function NavGroup({
  title,
  items,
}: {
  title: string
  items: {
    title: string
    url: string
    icon: React.ReactNode
  }[]
}) {
  const { pathname } = useLocation()
  const isCurrentPath = (url: string) => pathname === url
  const { setOpenMobile } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              className={isCurrentPath(item.url) ? 'bg-sidebar-accent' : ''}
            >
              <Link to={item.url} onClick={() => setOpenMobile(false)}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
