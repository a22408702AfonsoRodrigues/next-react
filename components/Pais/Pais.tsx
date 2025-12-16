'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pais } from '@/models/interfaces'

export default function Paises(props: Pais) {

    return (
        <article>
            <h3 className="font-bold text-lg text-center line-clamp-2 h-14 overflow-hidden">
                {props.name}
            </h3>

            <p>
                {props.area}
            </p>

            <p>
                {props.population}
            </p>
        </article>
    )

}