'use client'
import React, { useState, useEffect } from 'react'

export default function Relogio() {
    const [hora, setHora] = useState<string>(); 

    useEffect(() => {
        const id = setInterval(() => {
            setHora(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(id);
    }, []);

    return (
        <div className="text-sm font-mono">
            {hora || "Carregando..."}
        </div>
    )
}