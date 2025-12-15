'use client'
import React from 'react'
import useSWR from 'swr'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/models/interfaces'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProdutosPorCategoriaPage() {
    const params = useParams<{ categoria: string }>();
    const categoriaNome = decodeURIComponent(params.categoria);

    const { data, error, isLoading } = useSWR<Product[]>('https://deisishop.pythonanywhere.com/products', fetcher);

    const produtosFiltrados = data?.filter(prod => prod.category === categoriaNome);

    if (error) return <div>Erro ao carregar produtos.</div>;
    if (isLoading) return <div>A carregar produtos da categoria...</div>;

    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 capitalize text-center">
                Categoria: <span className="text-blue-600">{categoriaNome}</span>
            </h1>
            
            {produtosFiltrados && produtosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {produtosFiltrados.map((product) => (
                        <div key={product.id} className="bg-white p-4 rounded-xl shadow border flex flex-col items-center">
                            
                            <div className="relative w-full h-40 mb-4">
                                <Image 
                                    src={product.image.startsWith('http') ? product.image : `https://deisishop.pythonanywhere.com${product.image}`}
                                    alt={product.title} 
                                    fill 
                                    className="object-contain"
                                />
                            </div>
                            
                            <h3 className="font-bold text-sm text-center line-clamp-2 h-10 mb-2">{product.title}</h3>
                            
                            <p className="text-green-600 font-bold">
                                {Number(product.price).toFixed(2)} €
                            </p>
                            
                            <Link href={`/produtos/${product.id}`} className="mt-4">
                                <button className="text-blue-600 text-sm font-bold hover:underline">
                                    Ver Produto →
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">Nenhum produto encontrado nesta categoria.</p>
            )}
            
            <div className="mt-10 text-center">
                 <Link href="/categorias" className="bg-gray-200 px-4 py-2 rounded text-gray-700 hover:bg-gray-300">
                    Voltar às Categorias
                </Link>
            </div>
        </div>
    )
}