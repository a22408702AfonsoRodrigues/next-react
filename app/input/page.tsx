'use client' 
import React, { useState } from 'react'

export default function InputPage() {
    
    const [texto, setTexto] = useState("")

    const [tecnologia, setTecnologia] = useState("React")

    const [tarefas, setTarefas] = useState<string[]>([])
    const [novaTarefa, setNovaTarefa] = useState("")

    function adicionarTarefa() {
        if (novaTarefa.trim() !== "") {
            setTarefas([...tarefas, novaTarefa])
            setNovaTarefa("") 
        }
    }

    function apagarTarefa(index: number) {
        const novasTarefas = [...tarefas]; 
        novasTarefas.splice(index, 1);     
        setTarefas(novasTarefas);          
    }

    function editarTarefa(index: number) {
        const novoTexto = prompt("Edite a tarefa:", tarefas[index]);
        
        if (novoTexto !== null && novoTexto.trim() !== "") {
            const novasTarefas = [...tarefas]; 
            novasTarefas[index] = novoTexto;
            setTarefas(novasTarefas);
        }
    }

    return (
        <div className="flex flex-col items-center gap-10 p-10 min-h-screen bg-gray-50">
            <h1 className="text-blue-600 text-3xl font-bold">Laboratório de Inputs</h1>

            
            <section className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-blue-600 text-xl font-bold mb-4">1. Eco do Input</h2>
                <input 
                    className="text-blue-600 border p-2 w-full mb-2"
                    type="text" 
                    placeholder="Escreva algo..." 
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />
                <p className="text-blue-600 font-semibold">Texto digitado: {texto}</p>
            </section>

            <section className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-blue-600 text-xl font-bold mb-4">2. Seletor de Tecnologia</h2>
                <select 
                    className="text-blue-600 border p-2 w-full mb-2"
                    value={tecnologia} 
                    onChange={(e) => setTecnologia(e.target.value)}
                >
                    <option value="React">React</option>
                    <option value="Next.js">Next.js</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="TypeScript">TypeScript</option>
                </select>
                <p className="text-blue-600">Tecnologia escolhida: <strong>{tecnologia}</strong></p>
            </section>

            <section className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-blue-600 text-xl font-bold mb-4">3. Lista de Tarefas</h2>
                
                <div className="text-blue-600 flex gap-2 mb-4">
                    <input 
                        className="text-blue-600 border p-2 flex-1"
                        type="text"
                        placeholder="Nova tarefa..."
                        value={novaTarefa}
                        onChange={(e) => setNovaTarefa(e.target.value)}
                    />
                    <button 
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={adicionarTarefa}
                    >
                        Inserir
                    </button>
                </div>

                <ul className="space-y-2">
                    {tarefas.map((tarefa, index) => (
                        <li key={index} className="text-blue-600 flex justify-between items-center bg-gray-100 p-2 rounded">
                            <span>{tarefa}</span>
                            
                            <div className="flex gap-2">
                                <button 
                                    className="text-yellow-600 font-bold text-sm"
                                    onClick={() => editarTarefa(index)}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="text-red-600 font-bold text-sm"
                                    onClick={() => apagarTarefa(index)}
                                >
                                    X
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

        </div>
    )
}