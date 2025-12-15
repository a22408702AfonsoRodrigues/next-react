'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/models/interfaces'

export default function ProdutoDetalhe({ product }: { product: Product }) {
    
    const imgUrl = product.image.startsWith('http') ? product.image : `https://deisishop.pythonanywhere.com${product.image}`;

    return (
        <div className="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto mt-10">
            
            <div className="relative w-full md:w-1/2 h-96">
                <Image 
                    src={imgUrl} 
                    alt={product.title} 
                    fill 
                    className="object-contain"
                />
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
                <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
                
                <p className="text-3xl font-bold text-green-600">
                    {Number(product.price).toFixed(2)} €
                </p>

                <span className="bg-gray-200 text-sm font-semibold px-3 py-1 rounded w-fit uppercase">
                    {product.category}
                </span>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                
                <div className="text-sm text-gray-500">
                    Avaliação: ★ {product.rating.rate} ({product.rating.count} votos)
                </div>

                <button 
                    className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition mt-4"
                    onClick={() => alert('Adicionado ao carrinho!')}
                >
                    Adicionar ao Carrinho
                </button>
                
                <Link href="/produtos" className="text-blue-600 font-bold hover:underline mt-4 text-center md:text-left">
                    ← Voltar à Lista
                </Link>
            </div>
        </div>
    )
}