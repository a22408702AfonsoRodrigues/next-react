'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/models/interfaces'

export default function ProdutoCard(props: Product) {
    

    const imgUrl = props.image.startsWith('http') ? props.image : `https://deisishop.pythonanywhere.com${props.image}`;

    return (
        <article className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center transition hover:scale-105">
            
            <div className="relative w-full h-48 mb-4">
                <Image 
                    src={imgUrl} 
                    alt={props.title} 
                    fill 
                    className="object-contain"
                />
            </div>
            
            <h3 className="font-bold text-lg text-center line-clamp-2 h-14 overflow-hidden">
                {props.title}
            </h3>
            
            <p className="text-xl font-bold text-green-600 my-2">
                {Number(props.price).toFixed(2)} €
            </p>
            

            <Link href={`/produtos/${props.id}`} className="w-full">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Ver Detalhes
                </button>
            </Link>
        </article>
    )
}