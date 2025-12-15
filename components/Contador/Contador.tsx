'use client'
import React, { useState, useEffect } from "react"

export default function Contador() {
    const [count, setCount] = useState(0);
    const [historico, setHistorico] = useState<number[]>([]);

    useEffect(() => {
        const countStored = localStorage.getItem('count');
        if (countStored) {
            setCount(parseInt(countStored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('count', count.toString()); 
    }, [count]);

    const alterarValor = (novoValor: number) => {
        if (novoValor >= 0 && novoValor <= 10) {
            setCount(novoValor);
            setHistorico([...historico, novoValor]);
        }
    }

    let corTexto = 'black';
    if (count >= 0 && count <= 3) {
        corTexto = 'red';
    } else if (count >= 4 && count <= 7) {
        corTexto = 'yellow';
    } else if (count >= 8 && count <= 10) {
        corTexto = 'green';
    }

    return (
        <section className="flex flex-col items-center gap-4 p-4 border rounded-xl shadow-md w-fit bg-white">
            <p className="text-2xl font-bold" style={{ color: corTexto }}>
                Contador: {count}
            </p>

            <section className="flex gap-2">
                <button 
                    className="bg-red-500 text-white p-2 rounded-2xl hover:bg-red-600"
                    onClick={() => alterarValor(count - 1)}
                >
                    Decrementar
                </button>

                <button
                    className="bg-green-500 text-white p-2 rounded-2xl hover:bg-green-600"
                    onClick={() => alterarValor(count + 1)}
                >
                    Incrementar
                </button>

                <button
                    className="bg-black text-white p-2 rounded-2xl hover:bg-gray-800"
                    onClick={() => alterarValor(0)}
                >
                    Reset
                </button>
            </section>

            <div className="w-full mt-4 bg-gray-100 p-3 rounded">
                <p className="font-bold mb-2">Histórico de valores:</p>
                <ul className="h-32 overflow-y-auto list-disc pl-6 text-sm">
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