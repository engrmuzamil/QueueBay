"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, Upload } from "lucide-react";

export default function OrderTracker() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-6 h-6 bg-white rounded-full mr-3"></div>
              <h1 className="text-xl font-semibold text-white">QueueBay</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-300 hover:text-white font-medium"
              >
                Shop
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white font-medium"
              >
                Contact
              </a>
            </nav>

            {/* Search and Profile */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 w-64"
                />
              </div>
              <MessageCircle className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Order Tracker</h1>
          <p className="text-gray-400 text-lg">
            Track your order status and upload delivery proof
          </p>
        </div>

        {/* Order Status Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">
            Order Status
          </h2>

          {/* Progress Bar */}
          <div className="relative mb-4">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>

          {/* Status Steps */}
          <div className="flex justify-between text-sm mb-6">
            <span className="text-blue-400">Order Placed</span>
            <span className="text-blue-400">Processing</span>
            <span className="text-blue-400">Shipped</span>
            <span className="text-gray-400">Delivered</span>
          </div>

          <p className="text-gray-300">
            <span className="text-gray-400">Estimated Delivery:</span> July 20,
            2024
          </p>
        </div>

        {/* QR Code Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">
            Scan QR Code
          </h2>

          <div className="bg-orange-200 rounded-lg p-8 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fdf977754efb34c24bcf178e24df51933%2F15a2006c057d4a1083cda6f087e923d1?format=webp&width=200"
                alt="QR Code for order tracking"
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Upload Delivery Proof Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">
            Upload Delivery Proof
          </h2>

          <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center bg-gray-800">
            {uploadedFile ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-green-400 font-medium">
                  {uploadedFile.name} uploaded successfully
                </p>
                <Button
                  onClick={() => setUploadedFile(null)}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  Upload Different Image
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-white font-medium mb-2">
                    No images uploaded
                  </p>
                  <p className="text-gray-400 text-sm">
                    Upload an image to confirm delivery
                  </p>
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    >
                      Upload Image
                    </Button>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Details Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            Order Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Order Number:</span>
              <span className="text-white ml-2">#ORD-2024-001</span>
            </div>
            <div>
              <span className="text-gray-400">Order Date:</span>
              <span className="text-white ml-2">July 15, 2024</span>
            </div>
            <div>
              <span className="text-gray-400">Shipping Address:</span>
              <span className="text-white ml-2">
                123 Main St, City, State 12345
              </span>
            </div>
            <div>
              <span className="text-gray-400">Tracking Number:</span>
              <span className="text-white ml-2">1Z999AA1234567890</span>
            </div>
          </div>
        </div>

        {/* Need Help Button */}
        <div className="text-center">
          <Button
            variant="outline"
            className="bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700 px-8 py-3"
          >
            Need Help?
          </Button>
        </div>
      </main>
    </div>
  );
}
