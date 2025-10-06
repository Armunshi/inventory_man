"use client"
import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  Menu,
  Search,
  Bell,
  Mail,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Package,
  BarChart3,
  Users,
  ArrowUpRight,
  Plus,
  Store
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { useSession } from 'next-auth/react';

const salesData = [
  { day: 'Mon', totalPurchase: 65, totalSale: 80 },
  { day: 'Tue', totalPurchase: 59, totalSale: 75 },
  { day: 'Wed', totalPurchase: 80, totalSale: 90 },
  { day: 'Thu', totalPurchase: 81, totalSale: 95 },
  { day: 'Fri', totalPurchase: 85, totalSale: 100 },
  { day: 'Sat', totalPurchase: 75, totalSale: 85 },
  { day: 'Sun', totalPurchase: 60, totalSale: 70 },
];

const pieData = [
  { name: 'New Users', value: 5500, color: '#10b981' },
  { name: 'Return', value: 3500, color: '#ef4444' }
];

const Dashboard = () => {
  const { data: session, status } = useSession();
  // Get current date and day
  const now = new Date(Date.now());
  
  const fullDate = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const [day,setDay] = useState<String>(fullDate)


  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Handle unauthenticated state
  if (!session) {
    return <div>Please log in</div>;
  }
  return (
    <>
      {/* Dashboard Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back, {session.user?.name || 'User'}</h1>
          <h2 className='text-xl  text-gray-900'>{session.user?.role}</h2>
          <p className="text-gray-500 text-sm mt-1">{day}</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <div className="flex gap-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
            <Button variant="outline">Import</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Sales */}
          <div className="bg-white rounded-xl p-6 border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Total Sales</h3>
              <select className="text-xs border rounded px-2 py-1">
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold">$48,988</span>
              <span className="text-green-500 text-sm flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                7.8%
              </span>
            </div>
            <p className="text-gray-500 text-xs">Sales in last month</p>
            <button className="text-indigo-600 text-xs mt-2 flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Sales Return */}
          <div className="bg-white rounded-xl p-6 border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Sales Return</h3>
              <select className="text-xs border rounded px-2 py-1">
                <option>Weekly</option>
              </select>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold">$16,478</span>
              <span className="text-red-500 text-sm flex items-center">
                <TrendingDown className="w-3 h-3 mr-1" />
                1.0%
              </span>
            </div>
            <p className="text-gray-500 text-xs">Return return in last month</p>
            <button className="text-indigo-600 text-xs mt-2 flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Total Purchase */}
          <div className="bg-white rounded-xl p-6 border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Total Purchase</h3>
              <select className="text-xs border rounded px-2 py-1">
                <option>Weekly</option>
              </select>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold">$24,145</span>
              <span className="text-green-500 text-sm flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                8.1%
              </span>
            </div>
            <p className="text-gray-500 text-xs">Purchase in last month</p>
            <button className="text-indigo-600 text-xs mt-2 flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Purchase Return */}
          <div className="bg-white rounded-xl p-6 border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Purchase Return</h3>
              <select className="text-xs border rounded px-2 py-1">
                <option>Weekly</option>
              </select>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold">$18,458</span>
              <span className="text-green-500 text-sm flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                1.5%
              </span>
            </div>
            <p className="text-gray-500 text-xs">Purchase return in last month</p>
            <button className="text-indigo-600 text-xs mt-2 flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Sales & Purchase Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Sales & Purchase</h3>
              <div className="flex gap-4">
                <button className="text-xs px-3 py-1 rounded bg-gray-100">1D</button>
                <button className="text-xs px-3 py-1 rounded">1W</button>
                <button className="text-xs px-3 py-1 rounded">1M</button>
                <button className="text-xs px-3 py-1 rounded bg-gray-900 text-white">3Y</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalPurchase" fill="#a78bfa" radius={[8, 8, 0, 0]} />
                <Bar dataKey="totalSale" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Overall Information */}
          <div className="bg-white rounded-xl p-6 border">
            <h3 className="text-lg font-semibold mb-6">Overall Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-lg">
                <div>
                  <p className="text-2xl font-bold">6987</p>
                  <p className="text-xs text-gray-300">Invoices</p>
                </div>
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-2xl font-bold">4896</p>
                  <p className="text-xs text-gray-500">Sales</p>
                </div>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-2xl font-bold">567</p>
                  <p className="text-xs text-gray-500">Orders</p>
                </div>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customers Overview */}
          <div className="bg-white rounded-xl p-6 border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                Customers Overview
              </h3>
              <select className="text-xs border rounded px-2 py-1">
                <option>Weekly</option>
              </select>
            </div>
            <div className="flex items-center justify-center gap-8">
              <div className="relative w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-600">Total User</span>
                  </div>
                  <p className="text-2xl font-bold">5.5K</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-sm text-gray-600">Return</span>
                  </div>
                  <p className="text-2xl font-bold">3.5K</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="bg-white rounded-xl p-6 border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Top Selling Products</h3>
              <select className="text-xs border rounded px-2 py-1">
                <option>Weekly</option>
              </select>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg"></div>
                  <div>
                    <p className="font-medium">Product Name</p>
                    <p className="text-xs text-gray-500">Category</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">$2,450</p>
                  <p className="text-xs text-gray-500">245 sold</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg"></div>
                  <div>
                    <p className="font-medium">Product Name</p>
                    <p className="text-xs text-gray-500">Category</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">$1,890</p>
                  <p className="text-xs text-gray-500">189 sold</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard