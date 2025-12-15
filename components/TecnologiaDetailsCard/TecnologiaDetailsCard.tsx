import ContadorPersonalizado from "../ContadorPersonalizado/ContadorPersonalizado"

interface TecnologiaDetailsCardProps {
    title: string
    image: string
    description: string
    rating: number
}

export default function TecnologiasDetailsCard({title,image,description,rating}: TecnologiaDetailsCardProps){
    return (
        <article className="
        bg-white shadow-lg rounded-xl p-6 
        flex flex-col items-center gap-4
        max-w-xs mx-auto
      ">
        <img
            src={`/tecnologias/${image}`}
            alt={title}
            width={120}
            height={120}
        />

        <h2 className="text-xl font-bold">{title}</h2>

        <p className="text-gray-700 text-center">{description}</p>

        <p className="text-gray-700 text-center">{rating}</p>

        <p className="text-gray-700 text-center"><ContadorPersonalizado title={title} /></p>

        
      </article>
    )
}