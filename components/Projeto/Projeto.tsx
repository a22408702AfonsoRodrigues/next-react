
interface ProjetoProps {nome: string, url:string }

export default function Projeto(props: ProjetoProps) {
  return (
    <>
        <a href={props.url} target="_blank">{props.nome}</a>
    </>
  )
}
