import { WarehouseClient } from '@/types'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getWarehouses as fetchWarehouses } from '@/services/warehouseService'

export function useWarehouse (){
  const [warehouses,setWarehouses] = useState<WarehouseClient[]>([])
  const [loading,setLoading] = useState(true);
  const {data:session,status} = useSession();
  useEffect(() => {
    const getWarehouses = async () => {
      if (!session?.user?.id || !session.user?.role) {
        return;
      }

      try {
        const data = await fetchWarehouses();
        setWarehouses(data)
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
