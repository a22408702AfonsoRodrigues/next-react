import React from 'react'
import Link from 'next/link'

export default function CaracteristicaPage(props: any) {

    const caracteristicas = [
        'JSX, sintaxe que mistura HTML e JS.',
        'Componentes, funções que retornam JSX.',
        'Componentes Reutilizáveis e Modulares.',
        'Roteamento Automático e APIs.',
        'Hooks: useState, useEffect e useSWR.',
        'Renderização Rápida e SEO Friendly.',
        'TypeScript Seguro e Escalável.',
        'Comunidade Ativa e Popularidade.'
    ]

    return (
        <div className="flex flex-col h-screen items-center justify-center">
        
        <h1 className="text-4xl font-bold mb-10 text-blue-600 text-center p-4">
            
        </h1>

        <Link href="/caracteristicas">
            <button className="bg-black text-white p-4 rounded hover:bg-gray-800">
                Voltar
            </button>
        </Link>

    </div>
    )
}