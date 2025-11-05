import { WarehouseClient } from '@/types';
import { Warehouse } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

export function useWarehouse (){
  const [warehouses,setWarehouses] = useState<WarehouseClient[]>([])
  const [loading,setLoading] = useState(true);
  const {data:session,status} = useSession();
  useEffect(() => {
    const getWarehouses = async () => {
      console.log("Session:", session); // Add this to debug
      console.log("User ID:", session?.user?.id); // Add this to debug

      if (!session?.user?.id ||!session.user?.role) {
        console.log("No user ID  or role, returning early"); // Add this
        return;
      }

      console.log("Fetching warehouses..."); // Add this

      try {
        const params = new URLSearchParams();
        params.append('id', session.user.id.toString());
        params.append('role', session.user.role?.toString());

        const url = `/api/warehouses/getwarehouses?${params.toString()}`;
        console.log('Fetching warehouses with URL:', url);
        const response = await fetch(url, {
          method: "GET",
          headers: { 'Content-Type': "application/json" },
        })
        if (response.ok) {
          const data = await response.json();
          setWarehouses(data)
        }
      } catch (err) {
        console.log("Error while fetching Warehouses", err)
      } finally {
        setLoading(false);
      }
    }
    getWarehouses()
  }, [session?.user?.id, session?.user?.role])

    return {warehouses,loading,setWarehouses};
}

