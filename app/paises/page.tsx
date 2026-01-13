'use client' 
import React, { useState } from 'react'
import dadosPaises from '@/public/paises.json'


export default function PaisesPage() {
    
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Lista de Países</h1>

            <div className= "text-white bg-blue-950 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dadosPaises.map((pais, index) => (
                    <div key= {index} className= "flex flex-col">
                        <p>{pais.name.common}</p>

                        <p>Area: {Number(pais.area)}</p>
                        
                        <p>População: {Number(pais.population)}</p>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}