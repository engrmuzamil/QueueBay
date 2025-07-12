"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, MessageCircle, Star } from "lucide-react";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

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
              <Heart className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-green-100 rounded-lg p-8 flex items-center justify-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fdf977754efb34c24bcf178e24df51933%2F0d140650260e4c0f8e73f53574e50893?format=webp&width=400"
              alt="Reusable Water Bottle"
              className="max-w-full h-auto max-h-96 object-contain"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Title and Description */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Reusable Water Bottle
              </h1>
              <p className="text-gray-300 leading-relaxed">
                Stay hydrated on the go with our stylish and sustainable water
                bottle. Made from high-quality, BPA-free materials, it&apos;s perfect
                for everyday use.
              </p>
            </div>

            {/* Price and Negotiate */}
            <div className="space-y-4">
              <div>
                <span className="text-gray-400 text-sm">Price:</span>
                <div className="text-2xl font-bold text-white">£25.00</div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                Negotiate
              </Button>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
                Specifications
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="text-gray-400 text-sm block">Capacity</span>
                  <span className="text-white">500ml</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm block">Material</span>
                  <span className="text-white">Stainless Steel</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm block">
                    Dimensions
                  </span>
                  <span className="text-white">24cm x 7cm</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm block">Weight</span>
                  <span className="text-white">200g</span>
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
                Seller Information
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="text-gray-400 text-sm block">
                    Seller Name
                  </span>
                  <span className="text-white">Green Living Co.</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm block">Location</span>
                  <span className="text-white">London, UK</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm block">Rating</span>
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <Star className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-white text-sm">4.8/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping & Policies */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
                Shipping & Policies
              </h2>

              <div className="text-gray-300 text-sm leading-relaxed">
                We offer free shipping on orders over £50. Returns are accepted
                within 30 days of purchase. Please see our full policy for more
                details.
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4">
                <label className="text-gray-400 text-sm">Quantity:</label>
                <div className="flex items-center border border-gray-600 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-white hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-white border-x border-gray-600">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-white hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Product Information */}
        <div className="mt-12 space-y-8">
          {/* Product Description */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Product Description
            </h3>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                This premium reusable water bottle is designed for the
                environmentally conscious consumer who doesn&apos;t want to
                compromise on style or functionality. Crafted from high-grade
                stainless steel, it maintains your drink&apos;s temperature for hours
                while being completely BPA-free and safe for daily use.
              </p>
              <p>
                The sleek design features a wide mouth opening for easy filling
                and cleaning, while the leak-proof cap ensures your belongings
                stay dry. The botanical print adds a touch of nature to your
                daily hydration routine.
              </p>
              <p>
                Perfect for the office, gym, hiking, or any outdoor adventure.
                Join thousands of satisfied customers in making a positive
                impact on the environment, one sip at a time.
              </p>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Customer Reviews
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "Sarah M.",
                  rating: 5,
                  comment:
                    "Love this bottle! Keeps my water cold all day and the design is beautiful.",
                  date: "2 weeks ago",
                },
                {
                  name: "James K.",
                  rating: 4,
                  comment: "Great quality and fast shipping. Would recommend!",
                  date: "1 month ago",
                },
                {
                  name: "Emma L.",
                  rating: 5,
                  comment:
                    "Perfect size for my daily commute. No leaks at all!",
                  date: "1 month ago",
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className="border-b border-gray-700 pb-4 last:border-b-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">
                          {review.name}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-gray-400 text-xs">
                        {review.date}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
