'use client'
import React from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/models/interfaces'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProdutosPage() {
    const { data, error, isLoading } = useSWR<Product[]>('https://deisishop.pythonanywhere.com/products', fetcher);

    if (error) return <div>Falha ao carregar</div>;
    if (isLoading) return <div>A carregar produtos...</div>;

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Produtos da Loja</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.map((product) => (
                    <div key={product.id} className="border p-4 rounded shadow hover:shadow-lg transition bg-white flex flex-col items-center">
                        
                        <Image 
                            src={product.image} 
                            alt={product.title} 
                            width={100} 
                            height={100} 
                            className="object-contain h-32 w-auto mb-4"
                        />
                        
                        <h3 className="font-bold text-sm text-center line-clamp-2">{product.title}</h3>
                        <p className="text-green-600 font-bold mt-2">{product.price.toFixed(2)} €</p>
                        
                        <Link href={`/produtos/${product.id}`} className="mt-4">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                                + Detalhes
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}