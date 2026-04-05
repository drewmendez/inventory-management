import { createBrowserRouter, RouterProvider } from 'react-router'
import AdminLayout from '@/app/layouts/admin-layout'
import AuthLayout from '@/app/layouts/auth-layout'
import MainLayout from '@/app/layouts/main-layout'
import Dashboard from '@/app/pages/dashboard'
import InventoryLogs from '@/app/pages/inventory-logs'
import ItemInventories from '@/app/pages/item-inventories'
import Login from '@/app/pages/login'
import ManageCategories from '@/app/pages/manage-categories'
import ManageUnits from '@/app/pages/manage-units'
import ManageUsers from '@/app/pages/manage-users'
import NotFound from '@/app/pages/not-found'
import Transactions from '@/app/pages/transactions'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    element: (
      <AuthLayout>
        <MainLayout />
      </AuthLayout>
    ),
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
        path: '/dashboard/transactions',
        element: <Transactions />,
      },
      {
        path: '/dashboard/inventory-logs',
        element: <InventoryLogs />,
      },

      {
        element: <AdminLayout />,
        children: [
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
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
