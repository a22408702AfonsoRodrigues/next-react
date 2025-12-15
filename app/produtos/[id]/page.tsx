'use client'
import React from 'react'
import useSWR from 'swr'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/models/interfaces'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProdutoDetalhePage() {
    const params = useParams<{ id: string }>();
    
    const { data, error, isLoading } = useSWR<Product>(
        params.id ? `https://deisishop.pythonanywhere.com/products/${params.id}` : null, 
        fetcher
    );

    if (error) return <div>Erro ao carregar produto.</div>;
    if (isLoading) return <div>A carregar detalhes...</div>;
    if (!data) return <div>Produto não encontrado.</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl flex flex-col md:flex-row gap-8">
            
            <div className="w-full md:w-1/2 relative h-96">
                <Image 
                    src={data.image} 
                    alt={data.title} 
                    fill 
                    className="object-contain"
                />
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
                <span className="bg-gray-200 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full w-fit uppercase tracking-wide">
                    {data.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
                <p className="text-gray-600 leading-relaxed">{data.description}</p>
                
                <div className="flex items-center justify-between mt-4">
                    <span className="text-3xl font-bold text-green-600">{data.price.toFixed(2)} €</span>
                    <button 
                        className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition"
                        onClick={() => alert('Adicionado ao carrinho!')}
                    >
                        Comprar Agora
                    </button>
                </div>

                <Link href="/produtos" className="text-blue-500 hover:underline mt-4">
                    ← Voltar à Loja
                </Link>
            </div>
        </div>
    )
}