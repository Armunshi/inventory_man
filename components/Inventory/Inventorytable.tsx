import React, { useEffect, useMemo, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    RowSelectionState,
} from "@tanstack/react-table"
import { Product } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, ChevronLeft, ChevronRight, Trash2 } from "lucide-react"

const Inventorytable = ({ products }: { products: Product[] }) => {
    const { data: session } = useSession();
    const userRole = session?.user?.role;
    console.log(products)
    const [sorting, setSorting] = useState<SortingState>([])
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [data, setData] = useState<Product[]>(products)
    
    useEffect(() => {
        setData(products)
    }, [products])
    const getStockLevel = (batchesPresent: number, minStock: number): 'critical' | 'low' | 'healthy' => {
        if (batchesPresent < minStock) return 'critical';
        if (batchesPresent <= minStock + 20) return 'low'; // 10-20 batches above min
        return 'healthy';
    };
    const stockStats = useMemo(()=>{
        let criticalCount = 0;
        let lowCount = 0;
        data.forEach(product=>{
            const batches_present = product.batches_present||0;
            const min_stock = product.min_stock||0;
            const stockLevel = getStockLevel(batches_present,min_stock);
            if (stockLevel==='critical') criticalCount++;
            if (stockLevel==='low') lowCount++;
        })
        return {criticalCount,lowCount};
    },[data])    
        // Define columns
    const columns: ColumnDef<Product>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: ({ column }) => {
                return (
                    <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div>{row.getValue("id")}</div>,
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div>{row.getValue("name")}</div>,
        },
        {
            accessorKey: "batches_present",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                        Batches Present / Min Stock
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const batches_present = row.getValue("batches_present") as number ||0;
                const min_stock = row.original.min_stock || 0;
                const stockLevel = getStockLevel(batches_present,min_stock);

                
            const colorClass = 
                stockLevel === 'critical' ? 'bg-red-100 text-red-800 font-semibold px-2 py-1 rounded' :
                stockLevel === 'low' ? 'bg-yellow-100 text-yellow-800 font-semibold px-2 py-1 rounded' :
                'bg-green-100 text-green-800 px-2 py-1 rounded';
            
            return (
                <div className={colorClass}>
                    {batches_present} / {min_stock}
                </div>
            );
            },
        },
        {
            accessorKey: "expiry",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Expiry
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const expiry = row.getValue("expiry") as Date | null
                return <div>{expiry ? new Date(expiry).toLocaleDateString('en-US') : 'N/A'}</div>
            },
        },
        {
            accessorKey: "cost_price",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Cost Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const costPrice = row.getValue("cost_price")
                return <div>{costPrice?.toString() || 'N/A'}</div>
            },
        },
        {
            accessorKey: "selling_price",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Selling Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const sellingPrice = row.getValue("selling_price")
                return <div>{sellingPrice?.toString() || 'N/A'}</div>
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    })

    const handleDelete = async () => {
        const selectedRows = table.getFilteredSelectedRowModel().rows
        const selectedIds = selectedRows.map(row => row.original.id)
        
        if (selectedIds.length === 0) {
            alert('Please select rows to delete')
            return
        }

        if (!confirm(`Are you sure you want to delete ${selectedIds.length} item(s)?`)) {
            return
        }

        try {
            // TODO: Replace with your actual delete API endpoint
            const response = await fetch('/api/inventory/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: selectedIds }),
            })

            if (response.ok) {
                // Remove deleted items from local state
                setData(prevData => prevData.filter(item => !selectedIds.includes(item.id)))
                setRowSelection({})
                alert('Items deleted successfully')
            } else {
                alert('Failed to delete items')
            }
        } catch (error) {
            console.error('Error deleting items:', error)
            alert('An error occurred while deleting items')
        }
    }
    console.log("table rows:", table.getRowModel().rows.length)

    return (
        <>
            {/* Add this before the table */}
            {(stockStats.criticalCount > 0 || stockStats.lowCount > 0) && (
                <div className="mb-4 space-y-2">
                    {stockStats.criticalCount > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800">
                            ⚠️ {stockStats.criticalCount} product(s) below minimum stock
                        </div>
                    )}
                    {stockStats.lowCount > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-yellow-800">
                            ⚡ {stockStats.lowCount} product(s) running low on stock
                        </div>
                    )}
                </div>
            )}
            <div className='flex items-center justify-between mb-6'>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected
                    </span>
                </div>
                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Selected
                    </Button>
                )}
            </div>

            {/* Table Section */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Inventorytable