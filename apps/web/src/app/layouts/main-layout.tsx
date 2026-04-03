import { MoonIcon, SunIcon } from 'lucide-react'
import { Fragment } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useTheme } from '@/context/theme'

export default function MainLayout() {
  const { pathname } = useLocation()
  const { theme, setTheme } = useTheme()

  const breadcrumbItems = pathname
    .split('/')
    .filter(Boolean)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))

  const breadcrumbPath = (index: number) => {
    return `/${breadcrumbItems
      .slice(0, index + 1)
      .join('/')
      .toLowerCase()}`
  }

  const isLastBreadcrumbItem = (index: number) => index === breadcrumbItems.length - 1

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-foreground" />
            <Separator orientation="vertical" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                  <Fragment key={item}>
                    {!isLastBreadcrumbItem(index) ? (
                      <>
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link to={breadcrumbPath(index)}>{item}</Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                      </>
                    ) : (
                      <BreadcrumbPage>{item}</BreadcrumbPage>
                    )}
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center px-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </Button>
          </div>
        </header>
        <div className="max-h-[calc(100vh-5rem)] flex-1 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
