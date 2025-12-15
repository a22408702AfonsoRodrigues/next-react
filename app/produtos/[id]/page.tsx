'use client'
import React from 'react'
import useSWR from 'swr'
import { useParams } from 'next/navigation'
import { Product } from '@/models/interfaces'
import ProdutoDetalhe from '@/components/ProdutosDetalhe/ProdutosDetalhe'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function PaginaProduto() {
    const params = useParams<{ id: string }>(); 

    const { data, error, isLoading } = useSWR<Product>(
        params.id ? `https://deisishop.pythonanywhere.com/products/${params.id}` : null, 
        fetcher
    );

    if (error) return <div className="text-center mt-10 text-red-500">Erro ao carregar o produto.</div>;
    if (isLoading) return <div className="text-center mt-10 text-xl">A carregar detalhes do produto...</div>;
    if (!data) return <div className="text-center mt-10">Produto não encontrado.</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <ProdutoDetalhe product={data} />
        </div>
    )
}