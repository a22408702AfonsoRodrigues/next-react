'use client'
import React, { useState, useEffect } from 'react'

interface ContadorProps {
    title: string;
}

export default function ContadorPersonalizado({ title }: ContadorProps) {
    
    const chaveStorage = `likes-${title}`;

    const [likes, setLikes] = useState(() => {
        if (typeof window === 'undefined') return 0;

        const valorGuardado = localStorage.getItem(chaveStorage);
        const valorConvertido = valorGuardado ? parseInt(valorGuardado) : 0;
        
        return isNaN(valorConvertido) ? 0 : valorConvertido;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(chaveStorage, likes.toString());
        }
    }, [likes, chaveStorage]); 

    return (
        <button 
            onClick={() => setLikes(likes + 1)}
            className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-200 transition font-bold"
        >
            <span>👍</span>
            <span>{likes} Likes</span>
        </button>
    )
}