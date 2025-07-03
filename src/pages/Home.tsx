import { useContext, useState } from "react"
import css from "../styles/pages/home.module.css"
import SquareComponent from "../components/Square.component"
import CanvasContext from "../context/Canvas.context"

function Home() {
    const context = useContext(CanvasContext)
    if (!context) { throw new Error("Context not found") }

    const { imgDataUrl, clearCanvas, sendCanvas } = context

    const [numeroProvavel, setNumeroProvavel] = useState<string>("0")

    async function handleButton(): Promise<void> {
        const predict = await sendCanvas()
        if (predict) setNumeroProvavel(predict.toString())
    }

    return (
        <main className={css.main}>
            <div className={css.title}>
                <h1>Classificador - MNIST</h1>
                <h2>O que é?</h2>
                <p>Esta aplicação permite ao usuário desenhar um número na tela, e utiliza Inteligência Artificial para tentar adivinhar qual foi o número de 0 a 9 está desenhado. Após o desenho, o sistema processa a imagem e informa ao usuário qual número acredita ter sido escrito.</p>
            </div>
            <div className={css.image}>
                <SquareComponent bgColor="#fff" borderColor="#000" />
            </div>
            <div className={css.input}>
                <button onClick={clearCanvas}>Limpar desenho</button>
            </div>
            <div className={css.footer}>
                <p>Número provavel: <strong>{numeroProvavel}</strong></p>
                {imgDataUrl && (
                    <a href={imgDataUrl} download="meudesenho.png">Baixar imagem</a>
                )}
                <button onClick={handleButton}>Adivinhar</button>
            </div>
        </main>
    )
}

export default Home