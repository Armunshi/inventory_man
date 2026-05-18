import { Navbar } from '@/components/Navbar'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@radix-ui/react-navigation-menu'
import React from 'react'

export default function HomePage() {
  return (
    <div className='flex flex-col'>
      <div className="zom-header h-[110vh] ">
        <Navbar />
        <div className="min-h-screen w-screen bg-[#fde7df] flex items-center">
          <div className="max-w-7xl mx-auto w-full px-12">

            <div className="grid grid-cols-2 gap-16 items-center">

              {/* LEFT CONTENT */}
              <div className="space-y-6">
                <h1 className="text-6xl font-extrabold leading-tight text-black">
                  Engineered to <br />
                  handle all your <br />
                  <span className="text-purple-500">inventory needs</span>
                </h1>

                <p className="text-gray-700 max-w-md text-lg">
                  Your complete inventory management software to track inventory,
                  streamline sales, fulfill orders, and oversee warehouses from a
                  single window.
                </p>
              </div>

              {/* RIGHT FORM */}
              <div className="bg-transparent">
                <h3 className="text-xl font-semibold mb-6">
                  Set up your organization right now
                </h3>

                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                  />

                  <input
                    type="text"
                    placeholder="India"
                    className="w-full px-4 py-3 rounded-md border border-gray-300"
                  />

                  <input
                    type="text"
                    placeholder="Maharashtra"
                    className="w-full px-4 py-3 rounded-md border border-gray-300"
                  />

                  <input
                    type="text"
                    placeholder="+91 Phone number"
                    className="w-full px-4 py-3 rounded-md border border-gray-300"
                  />

                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="mt-1" />
                    <p>
                      I agree to the{" "}
                      <span className="text-purple-500 cursor-pointer">
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span className="text-purple-500 cursor-pointer">
                        Privacy Policy
                      </span>
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-md transition"
                  >
                    CREATE YOUR FREE ACCOUNT
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>

      </div>
      <div className="main h-[110vh] w-screen bg-[#f1f1f1]">
        <section className="w-full bg-white py-24">
          <div className="max-w-7xl mx-auto px-8">

            {/* Header */}
            <h2 className="text-4xl font-bold text-center mb-20">
              Spend less time managing your orders
            </h2>

            <div className="grid grid-cols-2 gap-20 items-start">

              {/* LEFT: FEATURE LIST */}
              <div className="space-y-6">

                {/* ACTIVE */}
                <div className="p-6 bg-white rounded-xl shadow-lg border">
                  <h5 className="text-red-500 font-semibold mb-2">
                    Track effectively
                  </h5>
                  <h3 className="text-xl font-bold mb-3">
                    Complete visibility for your items
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Track different items across locations as they move through
                    your inventory based on serial numbers and batches.
                  </p>
                </div>

                {/* INACTIVE */}
                <div className="p-6 rounded-xl hover:bg-gray-50 cursor-pointer transition">
                  <h5 className="text-red-500 font-semibold mb-2">
                    Scale efficiently
                  </h5>
                  <h3 className="text-xl font-bold mb-3">
                    Warehouse management
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Initiate transfer orders, generate picklists, and dispatch
                    orders from the nearest warehouse.
                  </p>
                </div>

                <div className="p-6 rounded-xl hover:bg-gray-50 cursor-pointer transition">
                  <h5 className="text-red-500 font-semibold mb-2">
                    Collaborate better
                  </h5>
                  <h3 className="text-xl font-bold mb-3">
                    Dedicated customer portal
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Build stronger customer relationships with a dedicated
                    space to view and manage all transactions, pay online, and
                    initiate conversations.
                  </p>
                </div>

              </div>

              {/* RIGHT: IMAGE PREVIEW */}
              <div className="relative">

                <div className="rounded-xl shadow-xl overflow-hidden">
                  <img
                    src="/orders_screenshot.png"
                    alt="Inventory UI"
                    className="w-full"
                  />
                </div>

              </div>

            </div>
          </div>
        </section>
      </div>
      <footer className="w-screen bg-black text-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* LINKS ROW */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mb-6">
            <a href="#" className="hover:text-white transition">Contact</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">Security</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">Compliance</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">IPR Complaints</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">Anti-spam Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">Trademark Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">Cookie Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">GDPR Compliance</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">Abuse Policy</a>
          </div>

          {/* COPYRIGHT */}
          <p className="text-center text-xs text-gray-500">
            © 2026, Inventora Corp. All rights reserved.
          </p>

        </div>
      </footer>

    </div>

  )
}
