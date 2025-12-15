'use client'

import tecnologias from '@/app/data/tecnologias.json'
import { useParams } from 'next/navigation'
import TecnologiaDetailsCard from "@/components/TecnologiaDetailsCard/TecnologiaDetailsCard";
import Link from "next/link";

export default function TecnologiaPage() {
    const params  = useParams()
    const id = Number(params.id)

    const tecnologia = tecnologias[id]

    return (
        <main className="p-10">
        
        <TecnologiaDetailsCard
        title={tecnologia.title}
        image={tecnologia.image}
        description={tecnologia.description}
        rating={tecnologia.rating}
        />
        <Link 
            href="/tecnologias"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
        >
        Voltar
        </Link>
        </main>
    )


}