import { createBrowserRouter, RouterProvider } from 'react-router'
import AuthLayout from '@/app/layouts/auth-layout'
import MainLayout from '@/app/layouts/main-layout'
import Dashboard from '@/app/pages/dashboard'
import InventoryLogs from '@/app/pages/inventory-logs'
import ItemInventories from '@/app/pages/item-inventories'
import Login from '@/app/pages/login'
import ManageCategories from '@/app/pages/manage-categories'
import ManageUnits from '@/app/pages/manage-units'
import ManageUsers from '@/app/pages/manage-users'
import Transactions from '@/app/pages/transactions'

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
            path: '/dashboard/inventory-logs',
            element: <InventoryLogs />,
          },
          {
            path: '/dashboard/item-inventories',
            element: <ItemInventories />,
          },
          {
            path: '/dashboard/manage-categories',
            element: <ManageCategories />,
          },
          {
            path: '/dashboard/manage-units',
            element: <ManageUnits />,
          },
          {
            path: '/dashboard/manage-users',
            element: <ManageUsers />,
          },
          {
            path: '/dashboard/transactions',
            element: <Transactions />,
          },
        ],
      },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
