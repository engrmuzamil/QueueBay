import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="text-xl font-semibold text-gray-900">Acme Co</div>
        <nav className="flex items-center space-x-8">
          <Link href="#" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900">
            About
          </Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900">
            Contact
          </Link>
          <Link href="/signup" className="text-gray-700 hover:text-gray-900">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <div className="text-left">
              <Link href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-2.5 rounded-md"
            >
              Log In
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">Or sign in with</p>
          </div>

          <button
            className="w-full bg-gray-100 border-0 text-gray-900 font-medium py-2.5 rounded-md hover:bg-gray-200"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
              <path d="M12 6c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" />
            </svg>
            Sign in with Google
          </button>
          <Button asChild >
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {"Don't have an account? "}
                <Link href="#" className="text-blue-600 hover:text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>
          </Button>
        </div>
      </main>
    </div>
  )
}
