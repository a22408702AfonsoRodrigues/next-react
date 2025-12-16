'use client' 
import React, { useState } from 'react'
import useSWR from 'swr'
import { Pais } from '@/models/interfaces'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function PaisesPage() {
    
    const { data } = useSWR<Pais[]>('/paises.json', fetcher);

    const [search, setSearch] = useState("");

    const [area, setArea] = useState("");

    let filteredData = data || []

    filteredData = filteredData.filter(pais => pais.name.toLowerCase().includes(search.toLowerCase()))

    if (area) {
        filteredData = filteredData.filter(pais => pais.area === area)
    }
    

}