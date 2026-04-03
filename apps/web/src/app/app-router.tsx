import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from '@/app/layouts/main-layout'
import Dashboard from '@/app/pages/dashboard'
import Login from '@/app/pages/login'
import AuthLayout from './layouts/auth-layout'

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
        ],
      },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
