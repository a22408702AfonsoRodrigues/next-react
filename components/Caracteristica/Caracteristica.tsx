interface CaracteristicaProps {
    caracteristica: string
}

export default function Caracteristica(props: CaracteristicaProps) {
    return (
        <div className="p-4 bg-black border mb-2 rounded hover:bg-white">
            <p>{props.caracteristica}</p>
        </div>
    )
}