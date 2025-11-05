"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import { ShoppingBag, ClipboardList, CheckCircle, Clock, ChevronRight } from "lucide-react";

interface RetailerOrdersProps {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
}

const RetailerOrders = ({
  totalOrders,
  pendingOrders,
  completedOrders
}: RetailerOrdersProps) => {
  const router = useRouter();

  return (
    <Card
      className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-indigo-400"
      onClick={() => router.push("/orders/retailer")}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Retailer Orders
              </CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                View orders placed by retailers
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">

          {/* Total Orders */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <ClipboardList className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500 uppercase font-medium">
                Total
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
          </div>

          {/* Pending Orders */}
          <div className="bg-yellow-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-yellow-600" />
              <span className="text-xs text-yellow-700 uppercase font-medium">
                Pending
              </span>
            </div>
            <p className="text-2xl font-bold text-yellow-700">{pendingOrders}</p>
          </div>

          {/* Completed Orders */}
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-700 uppercase font-medium">
                Completed
              </span>
            </div>
            <p className="text-2xl font-bold text-green-700">
              {completedOrders}
            </p>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default RetailerOrders;
