"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

export default function Products() {
  const [searchQuery, setSearchQuery] = useState(
    "sustainablesneakersunder$100",
  );
  const [selectedCategory, setSelectedCategory] = useState("Shoes");

  // Placeholder products data - in real app this would come from database
  const products: Product[] = [
    {
      id: "1",
      name: "EcoRunners",
      price: "$89",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop&auto=format",
      category: "Shoes",
    },
    {
      id: "2",
      name: "Organic Cotton Tee",
      price: "$29",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&auto=format",
      category: "Clothing",
    },
    {
      id: "3",
      name: "Bamboo Toothbrush",
      price: "$5",
      image:
        "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&h=300&fit=crop&auto=format",
      category: "Accessories",
    },
    {
      id: "4",
      name: "Recycled Backpack",
      price: "$65",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&auto=format",
      category: "Accessories",
    },
    {
      id: "5",
      name: "Solar Powered Charger",
      price: "$40",
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop&auto=format",
      category: "Home Goods",
    },
    {
      id: "6",
      name: "Upcycled Denim Jacket",
      price: "$75",
      image:
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop&auto=format",
      category: "Clothing",
    },
  ];

  const categories = ["Shoes", "Clothing", "Accessories", "Home Goods"];

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All" || product.category === selectedCategory,
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-6 h-6 bg-white rounded-full mr-3"></div>
              <h1 className="text-xl font-semibold text-white">queue bay</h1>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 w-64"
                />
              </div>
              <Heart className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
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
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find sustainablesneakersunder$100"
              className="pl-12 pr-4 py-4 text-lg bg-indigo-600 border-indigo-600 text-white placeholder-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-gray-700 text-white border-gray-700"
                    : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product, index) => {
            const backgroundColors = [
              "bg-green-400", // EcoRunners
              "bg-gray-100", // Organic Cotton Tee
              "bg-orange-300", // Bamboo Toothbrush
              "bg-cyan-300", // Recycled Backpack
              "bg-gray-600", // Solar Powered Charger
              "bg-gray-200", // Upcycled Denim Jacket
            ];

            return (
              <div
                key={product.id}
                className="group cursor-pointer"
                onClick={() =>
                  (window.location.href = `/product/${product.id}`)
                }
              >
                <div
                  className={`aspect-square rounded-lg overflow-hidden mb-3 ${backgroundColors[index] || "bg-gray-300"} p-4 flex items-center justify-center`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-white group-hover:text-gray-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 font-medium">{product.price}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or browse a different category.
            </p>
          </div>
        )}

        {/* Featured Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div
                key={category}
                className="relative group cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                <div
                  className={`aspect-square rounded-lg overflow-hidden ${
                    index === 0
                      ? "bg-green-400"
                      : index === 1
                        ? "bg-gray-200"
                        : index === 2
                          ? "bg-orange-300"
                          : "bg-cyan-300"
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">
                      {category.charAt(0)}
                    </span>
                  </div>
                </div>
                <h3 className="mt-2 text-center font-medium text-white group-hover:text-gray-300">
                  {category}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Product Stats */}
        <div className="mt-16 bg-gray-800 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">1000+</div>
              <div className="text-gray-400">Sustainable Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400">Eco-Friendly Brands</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">50k+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
