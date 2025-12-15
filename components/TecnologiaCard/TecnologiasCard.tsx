import Link from "next/link";
import ContadorPersonalizado from "../ContadorPersonalizado/ContadorPersonalizado";

interface TecnologiaCardProps {
  title: string;
  image: string;
  index: number;
}

export default function TecnologiaCard(props: TecnologiaCardProps) {
  return (
      <article 
        className="
          w-40 h-56 bg-white shadow-md rounded-xl 
          flex flex-col items-center justify-between gap-3 p-4
          hover:scale-105 transition-transform
        "
      >
        <Link href={`/tecnologia/${props.index}`} className="flex flex-col items-center gap-2 cursor-pointer">
            <img 
              src={`/tecnologias/${props.image}`}
              alt={props.title}
              width={60}
              height={60}
            />
            <h3 className="text-center font-semibold text-sm">{props.title}</h3>
        </Link>

        <ContadorPersonalizado title={props.title} />
        
      </article>
  );
}