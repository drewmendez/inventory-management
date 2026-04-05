import { HomeIcon } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-2">
          <p className="text-6xl font-semibold tracking-tight text-muted-foreground tabular-nums">404</p>
          <CardTitle className="text-xl">Page not found</CardTitle>
          <CardDescription>
            The page you are looking for does not exist or may have been moved.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Check the URL, or go back to the home page or dashboard.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link to="/">
              <HomeIcon />
              Home
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
