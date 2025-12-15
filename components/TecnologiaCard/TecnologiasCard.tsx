import Link from "next/link";

interface TecnologiaCardProps {
  title: string;
  image: string;
  index: number;
}

export default function TecnologiaCard(props: TecnologiaCardProps) {
  return (
    <Link href={`/tecnologia/${props.index}`}>
      <article 
        className="
          w-40 h-48 bg-white shadow-md rounded-xl 
          flex flex-col items-center justify-center gap-3 p-4
          hover:scale-105 transition-transform cursor-pointer
        "
      >
        <img 
          src={`/tecnologias/${props.image}`}
          alt={props.title}
          width={60}
          height={60}
        />
        <h3 className="text-center font-semibold text-sm">{props.title}</h3>
      </article>
    </Link>
  );
}
