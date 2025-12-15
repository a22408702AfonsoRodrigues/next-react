import React from 'react'
import Caracteristica from '@/components/Caracteristica/Caracteristica'
import Link from 'next/link'

export default function CaracteristicasPage() {

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
    <div className="p-10">
        <h2>Caracteristicas do React e Next.js</h2>
        <ul>
            {caracteristicas.map((caracteristica, i) => {
            
                return (
                    <Link key={i} href={'/caracteristicas/' + caracteristica}>
                        <Caracteristica caracteristica={caracteristica} />
                    </Link>
                )          
            })}
        </ul>

    </div>
  )
}
