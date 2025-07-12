import { Bell, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SellerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-6 h-6 bg-black rounded-sm mr-3"></div>
              <h1 className="text-xl font-semibold text-gray-900">ShopSpot</h1>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-gray-500 cursor-pointer" />
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face&auto=format"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Sarah
          </h1>
        </div>

        {/* Overview Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Sales Today */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Total Sales Today
              </h3>
              <p className="text-2xl font-bold text-gray-900">$2,345</p>
            </div>

            {/* Active Listings */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Active Listings
              </h3>
              <p className="text-2xl font-bold text-gray-900">120</p>
            </div>

            {/* Orders in Progress */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Orders in Progress
              </h3>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>

            {/* Messages or Inquiries */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Messages or Inquiries
              </h3>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        {/* Trends Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Trends</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Over Time */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Sales Over Time
                </h3>
                <p className="text-2xl font-bold text-gray-900">$12,345</p>
                <p className="text-sm text-blue-600 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Last 30 Days +12%
                </p>
              </div>
              {/* Chart placeholder */}
              <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 300 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 80 Q50 40 80 60 T150 30 Q200 50 250 20 T290 40"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>
            </div>

            {/* Top Performing Products */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Top Performing Products
                </h3>
                <p className="text-2xl font-bold text-gray-900">$5,678</p>
                <p className="text-sm text-blue-600">This Month +8%</p>
              </div>
              {/* Product bars */}
              <div className="space-y-3">
                {[
                  "Product A",
                  "Product B",
                  "Product C",
                  "Product D",
                  "Product E",
                ].map((product, index) => (
                  <div key={product} className="flex items-center">
                    <div
                      className="bg-gray-200 rounded h-8 mr-3"
                      style={{
                        width: `${(5 - index) * 20}%`,
                        minWidth: "40px",
                      }}
                    ></div>
                    <span className="text-xs text-gray-600">{product}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-4">
              {/* Activity Item 1 */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <img
                    src="https://cdn.builder.io/api/v1/assets/df977754efb34c24bcf178e24df51933/create-product-listing-198ff8?format=webp&width=40"
                    alt="Product"
                    className="w-8 h-8 rounded object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    Order <span className="font-medium">#12345</span> for
                    &apos;Handmade Leather Wallet&apos; placed
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    New listing &apos;Vintage Camera&apos; added
                  </p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>

              {/* Activity Item 3 */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-300 rounded"></div>
                </div>
                <div className="flex-1">
                <p className="text-sm text-gray-900">
                  Order <span className="font-medium">#67890</span> for &apos;Organic Soap Set&apos; shipped
                </p>

                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Add New Listing
          </Button>
          <Button variant="outline">View Orders</Button>
        </div>
      </main>
    </div>
  );
}