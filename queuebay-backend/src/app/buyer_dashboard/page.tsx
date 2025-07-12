import { Home, ShoppingBag, Package, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BuyerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          {/* Profile Section */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face&auto=format"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Hi, Sarah</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 text-gray-900 bg-gray-100 rounded-lg"
            >
              <Home className="w-5 h-5" />
              <span className="text-sm font-medium">Home</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-sm font-medium">Shop</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <Package className="w-5 h-5" />
              <span className="text-sm font-medium">Orders</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">Wishlist</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Account</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome, Sarah
          </h1>

          {/* Recent Orders */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Orders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Running Shoes */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop&auto=format"
                    alt="Running Shoes"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Running Shoes
                </h3>
                <p className="text-sm text-green-600">Delivered</p>
              </div>

              {/* Winter Jacket */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop&auto=format"
                    alt="Winter Jacket"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Winter Jacket
                </h3>
                <p className="text-sm text-blue-600">Shipped</p>
              </div>

              {/* Slim Fit Pants */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&h=200&fit=crop&auto=format"
                    alt="Slim Fit Pants"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Slim Fit Pants
                </h3>
                <p className="text-sm text-orange-600">Processing</p>
              </div>
            </div>
          </section>

          {/* Recommendations */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recommendations For You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Running Shoes */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="aspect-square bg-gray-900 rounded-lg mb-3 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200&h=200&fit=crop&auto=format"
                    alt="Running Shoes"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Running Shoes
                </h3>
                <p className="text-sm text-gray-600 mb-3">$89.99</p>
                <Button
                  size="sm"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                >
                  Buy Now
                </Button>
              </div>

              {/* Winter Jacket */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop&auto=format"
                    alt="Winter Jacket"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Winter Jacket
                </h3>
                <p className="text-sm text-gray-600 mb-3">$129.99</p>
                <Button
                  size="sm"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                >
                  Buy Now
                </Button>
              </div>

              {/* Slim Fit Pants */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&h=200&fit=crop&auto=format"
                    alt="Slim Fit Pants"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Slim Fit Pants
                </h3>
                <p className="text-sm text-gray-600 mb-3">$59.99</p>
                <Button
                  size="sm"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </section>

          {/* Saved Items / Wishlist */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Saved Items / Wishlist
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Running Shoes */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop&auto=format"
                    alt="Running Shoes"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Running Shoes
                </h3>
                <p className="text-sm text-gray-600">$89.99</p>
              </div>

              {/* Winter Jacket */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop&auto=format"
                    alt="Winter Jacket"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Winter Jacket
                </h3>
                <p className="text-sm text-gray-600">$129.99</p>
              </div>

              {/* Slim Fit Pants */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&h=200&fit=crop&auto=format"
                    alt="Slim Fit Pants"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Slim Fit Pants
                </h3>
                <p className="text-sm text-gray-600">$59.99</p>
              </div>
            </div>
          </section>

          {/* Quick Access */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Access
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="text-left p-3 hover:bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">
                    Track Orders
                  </p>
                </button>
                <button className="text-left p-3 hover:bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">
                    My Reviews
                  </p>
                </button>
                <button className="text-left p-3 hover:bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">
                    Manage Address
                  </p>
                </button>
                <div className="flex items-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}