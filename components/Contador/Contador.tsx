"use client"
import React, { useState, useEffect} from "react"


export default function Contador() {
    const [count, setCount] = useState(() => {
        const countStored = localStorage.getItem('count')

        return countStored ? parseInt(countStored) : 0
    })

    const [historico, setHistorico] = useState<number[]>([])

    useEffect(() => {
        localStorage.setItem('count', '${count}');
    }, [count])

    const alterarValor = (novoValor: number) => {
        if (novoValor >= 0 && novoValor <= 10) {
            setCount(novoValor)

            setHistorico([...historico, novoValor])
        }
    }

    let corTexto = 'white'
    if (count >= 0 && count <= 3) {
        corTexto = 'red'
    } else if (count >= 4 && count <= 7) {
        corTexto = 'yellow'
    } else if (count >= 8 && count <= 10) {
        corTexto = 'green'
    }

    return (
        <section className="flex flex-col items-center gap-4 p-4">
            <p className="text-2xl "
            style={{ color: corTexto}}
            >Contador: {count}</p>

            <section className="flex gap-2">
                <button 
                    className="bg-red-500 text-white p-2 rounded-2xl"
                    onClick={() => alterarValor(count-1)}
                    >
                    Descrementar
                </button>

                <button
                    className="bg-green-500 text-white p-2 rounded-2xl"
                    onClick={() => alterarValor(count + 1)}>
                    Incrementar
                </button>

                <button
                    className="bg-black text-white p-2 rounded-2xl"
                    onClick={() => alterarValor(0)}>
                    Reset
                </button>
            </section>

            <div className="w-full mt-4">
                <p className="font-bold mb-2">Histórico de valores:</p>
                <ul className="p-4 rounded h-32 overflow-y-auto list-disc pl-6">
                    {historico.map((valor, index) => (
                        <li key={index}>
                            Passou por: <strong>{valor}</strong>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
