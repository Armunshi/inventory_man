"use-client"
import { WarehouseClient } from '@/types'
import { User } from '@prisma/client'
import React, { useEffect, useRef, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'

export function useManager(setValue:UseFormSetValue<WarehouseClient>){
    const [managerSearch,setManagerSearch] = useState('')
    const [managerSuggestions,setManagerSuggestions]  = useState<User[]>([])
    const [showSuggestions,setShowSuggestions] = useState(false)
    const suggestionsRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if (managerSearch.length>0){
            fetch(`api/users/managers?search=${encodeURIComponent(managerSearch)}`)
                .then(res=>res.json())
                .then(data=>{
                    setManagerSuggestions(data);
                    setShowSuggestions(true);
                })
                .catch(error=>console.error('Error Fetching Managers:',error));
        }else{
            setManagerSuggestions([]);
            setShowSuggestions(false);
        }
    },[managerSearch]);
    //close suggestions on clicking outside
    // useEffect(() => {
    // const handleClickOutside = (event: MouseEvent) => {
    //     const target = event.target as HTMLElement | null;
    //     if (suggestionsRef.current && target && !suggestionsRef.current.contains(target)) {
    //     setShowSuggestions(false);
    //     }
    // };
    // document.addEventListener('mousedown', handleClickOutside);
    // return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, []);

    const handleManagerSelect = (manager:User) =>{
        setValue('managerName',manager.name)
        setValue('managerName',manager.id.toString());
        setManagerSearch(manager.name);
        setShowSuggestions(false);
    };

    return {
        managerSearch,
        setManagerSearch,
        managerSuggestions,
        showSuggestions,
        setShowSuggestions,
        suggestionsRef,
        handleManagerSelect
    }
}
