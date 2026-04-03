import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './pages/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
