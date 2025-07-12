"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Index() {
  const [streetAddress, setStreetAddress] = useState("123\nElm Street");
  const [city, setCity] = useState("Anytown");
  const [stateProvince, setStateProvince] = useState("CA");
  const [zipCode, setZipCode] = useState("90210");
  const [country, setCountry] = useState("Select");

  const [preferences, setPreferences] = useState({
    notifications: false,
    theme: false,
    interests: false,
    fashion: false,
    gaming: false,
    travel: false,
  });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Acme Co</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Features
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Resources
              </a>
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm"
              >
                Sign up
              </Button>
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Log in
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Set Up Your Profile
          </h1>
          <p className="text-gray-600 text-sm">
            Help us personalize your experience
          </p>
        </div>

        <form className="space-y-6">
          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face&auto=format"
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <button
              type="button"
              className="text-blue-600 text-sm font-medium hover:text-blue-700"
            >
              Upload Photo
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Street Address
              </label>
              <textarea
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                City
              </label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                State/Province
              </label>
              <Input
                value={stateProvince}
                onChange={(e) => setStateProvince(e.target.value)}
                className="text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Zip/Postal Code
              </label>
              <Input
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Country
              </label>
              <div className="relative">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="Select">Select</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Select Your Preferences
            </h2>

            <div className="grid grid-cols-3 gap-2">
              {[
                { key: "notifications", label: "Notifications" },
                { key: "theme", label: "Theme (Light/Dark)" },
                { key: "interests", label: "Interests (Tech)" },
                { key: "fashion", label: "Fashion" },
                { key: "gaming", label: "Gaming" },
                { key: "travel", label: "Travel" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    togglePreference(key as keyof typeof preferences)
                  }
                  className={cn(
                    "px-3 py-2 rounded-md text-xs font-medium border transition-colors text-center",
                    preferences[key as keyof typeof preferences]
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 space-y-3">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5"
            >
              Save and Continue
            </Button>

            <div className="text-center">
              <button
                type="button"
                className="text-gray-500 text-sm hover:text-gray-700"
              >
                Skip for now
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}