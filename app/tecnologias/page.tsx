import React from 'react'
import tecnologiasJson from '@/app/data/tecnologias.json';
import Image from 'next/image'

const tecnologias = JSON.parse(JSON.stringify(tecnologiasJson))

export default function page() {
  return (
    <div>
      <h2>Tecnologias que aprendi</h2>

      {tecnologias.map((tec: any) => (
        <div key={tec.title}>
          <h3>{tec.title}</h3>

          <Image
            src={`/tecnologias/${tec.image}`} // ficheiros svg em public/tecnologias/
            alt={`Logotipo de ${tec.title}`}
            width={200}
            height={200}
          />

          <p>{tec.description}</p>
        </div>
      ))}
    </div>
  )
}
