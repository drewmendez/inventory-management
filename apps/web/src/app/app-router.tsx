import { createBrowserRouter, RouterProvider } from 'react-router'
import AuthLayout from '@/app/layouts/auth-layout'
import MainLayout from '@/app/layouts/main-layout'
import Dashboard from '@/app/pages/dashboard'
import { ItemInventories } from '@/app/pages/item-inventories'
import Login from '@/app/pages/login'
import { ManageUsers } from '@/app/pages/manage-users'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
          },
          {
            path: '/dashboard/item-inventories',
            element: <ItemInventories />,
          },
          {
            path: '/dashboard/manage-users',
            element: <ManageUsers />,
          },
        ],
      },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
