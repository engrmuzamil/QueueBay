"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Upload, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Index() {
  const [productTitle, setProductTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editProductTitle, setEditProductTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("jewelry, leather, wallet, handcrafted");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-6 h-6 bg-black rounded-sm mr-3"></div>
              <h1 className="text-xl font-semibold text-gray-900">Marketly</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 font-medium"
              >
                Explore
              </a>
              <a
                href="#"
                className="text-gray-900 font-medium border-b-2 border-blue-500 pb-4"
              >
                Create
              </a>
            </nav>

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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Create a New Listing
        </h1>

        <div className="space-y-8">
          {/* Step 1: Upload Image */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Step 1: Upload Image
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-white">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-900 font-medium mb-2">
                Drag and drop an image here, or
              </p>
              <p className="text-gray-500 text-sm mb-4">Browse files</p>
              <Button
                variant="outline"
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Upload Image
              </Button>
            </div>
          </section>

          {/* Step 2: AI-Powered Preview */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Step 2: AI-Powered Preview
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Product Title
                  </label>
                  <div className="relative">
                    <Input
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                      className="pr-10"
                    />
                    <Sparkles className="absolute right-3 top-3 w-4 h-4 text-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Description
                  </label>
                  <Textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="resize-none"
                  />
                  <p className="text-xs text-blue-600 mt-1">Generated by AI</p>
                </div>
              </div>
            </div>
          </section>

          {/* Step 3: Edit Listing */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Step 3: Edit Listing
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Product Title
                    </label>
                    <Input
                      value={editProductTitle}
                      onChange={(e) => setEditProductTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Description
                    </label>
                    <Textarea
                      rows={6}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Category
                    </label>
                    <Input
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Price
                    </label>
                    <Input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="$0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Tags
                    </label>
                    <div className="bg-gray-50 border border-gray-300 rounded-md p-3">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">
                          Add
                        </span>
                      </div>
                      <Input
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="text-xs bg-transparent border-0 p-0 focus:ring-0"
                        placeholder="jewelry, leather, wallet, handcrafted"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Preview */}
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 w-full max-w-sm">
                    <div className="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      <img
                        src="https://cdn.builder.io/api/v1/assets/df977754efb34c24bcf178e24df51933/create-product-listing-198ff8?format=webp&width=400"
                        alt="Handcrafted Leather Wallet"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Handcrafted Leather Wallet
                    </h3>
                    <p className="text-sm text-gray-600">
                      Accessories • $49.99
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 4: Publish */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Step 4: Publish
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button
                variant="outline"
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Save as Draft
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                Publish Listing
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}