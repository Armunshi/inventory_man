"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useSession } from 'next-auth/react'
import { WarehouseBase } from '@/types'
import { Building2, MapPin, User, Package, AlertTriangle, TrendingUp, ChevronRight } from "lucide-react"

interface WarehouseCardProps extends WarehouseBase {
  onClick?: () => void;
}



const WarehouseCard = ({
    name,
    location,
    capacity,
    managerName,
    totalProducts,
    lowStockCount,
    criticalCount,
    utilisationPercentage,
    onClick
}: WarehouseCardProps) => {
    const { data: session } = useSession();
    
    return (
        <Card 
            className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-indigo-400"
            onClick={onClick}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-indigo-100 rounded-lg">
                            <Building2 className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-semibold text-gray-900">
                                {name}
                            </CardTitle>
                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                <MapPin className="w-4 h-4" />
                                {location}
                            </div>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Manager Info - Only show if not warehouse manager */}
                {session?.user?.role !== 'WAREHOUSE_MANAGER' && managerName && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 pb-3 border-b">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{managerName}</span>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Package className="w-4 h-4 text-gray-500" />
                            <span className="text-xs text-gray-500 uppercase font-medium">Products</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                        {capacity && (
                            <p className="text-xs text-gray-500 mt-1">of {capacity} capacity</p>
                        )}
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-4 h-4 text-gray-500" />
                            <span className="text-xs text-gray-500 uppercase font-medium">Usage</span>
                        </div>
                        <p className="text-2xl font-bold text-indigo-600">{utilisationPercentage}%</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                                className={`h-2 rounded-full transition-all ${
                                    utilisationPercentage > 80 ? 'bg-red-500' : 
                                    utilisationPercentage > 60 ? 'bg-yellow-500' : 
                                    'bg-green-500'
                                }`}
                                style={{ width: `${Math.min(utilisationPercentage, 100)}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Alerts Section */}
                <div className="space-y-2 pt-2">
                    {criticalCount > 0 && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-700 border border-red-200">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm font-medium">
                                {criticalCount} Critical Stock Alert{criticalCount > 1 ? 's' : ''}
                            </span>
                        </div>
                    )}
                    
                    {criticalCount === 0 && lowStockCount > 0 && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-50 text-yellow-700 border border-yellow-200">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm font-medium">
                                {lowStockCount} Low Stock Warning{lowStockCount > 1 ? 's' : ''}
                            </span>
                        </div>
                    )}
                    
                    {criticalCount === 0 && lowStockCount === 0 && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 text-green-700 border border-green-200">
                            <span className="text-sm font-medium">✓ All Stock Levels Healthy</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default WarehouseCard