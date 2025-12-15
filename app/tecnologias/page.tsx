import TecnologiasJson from "@/app/data/tecnologias.json";
import TecnologiaCard from "@/components/TecnologiaCard/TecnologiasCard";

export default function PageTecnologias() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Tecnologias</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {TecnologiasJson.map((tec: any, index: number) => (
          <TecnologiaCard 
            key={tec.title}
            title={tec.title}
            image={tec.image}
            index={index}
          />
        ))}
      </div>
    </main>
  );
}
