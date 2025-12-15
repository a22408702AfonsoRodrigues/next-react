'use client'
import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CategoriasPage() {
    const { data, error, isLoading } = useSWR<string[]>('https://deisishop.pythonanywhere.com/categories', fetcher);

    if (error) return <div>Erro ao carregar categorias.</div>;
    if (isLoading) return <div>A carregar categorias...</div>;

    return (
        <div className="p-10 min-h-screen bg-gray-50 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-10 text-gray-800">Categorias</h1>
            
            <div className="flex flex-wrap gap-6 justify-center max-w-4xl">
                {data?.map((categoria) => (
                    <Link key={categoria} href={`/categorias/${categoria}`}>
                        <div className="
                            bg-white border border-gray-200 p-8 rounded-2xl shadow-sm 
                            hover:shadow-lg hover:border-blue-500 hover:text-blue-600 hover:-translate-y-1
                            transition cursor-pointer w-64 text-center
                        ">
                            <h2 className="text-2xl font-bold capitalize">{categoria}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}