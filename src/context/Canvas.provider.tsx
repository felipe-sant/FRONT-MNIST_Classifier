import { useRef, useState } from "react";
import ProviderPropsType from "../types/ProviderProps.type";
import CanvasContext from "./Canvas.context";
import CanvasContextType from "../types/CanvasContextType";
import canvasToFormData from "../utils/canvasToFormdata";
import uploadFile from "../services/UploadImage";

function CanvasProvider({ children }: ProviderPropsType) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [imgDataUrl, setImgDataUrl] = useState<string | null>(null)

    function clearCanvas() {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        setImgDataUrl(null)
    }

    async function sendCanvas(): Promise<number | undefined> {
        try {
            seeImage()
            const formData = await canvasToFormData(canvasRef)
            const predict = await uploadFile(formData)
            if (predict) {
                return predict
            }
        } catch (error) {
            alert("Erro ao gerar imagem")
        }
    }

    async function seeImage() {
        const canvas = canvasRef.current
        if (canvas) {
            const url = canvas.toDataURL("image/png")
            setImgDataUrl(url)
        }
    }

    const value: CanvasContextType = {
        canvasRef,
        imgDataUrl,
        sendCanvas,
        clearCanvas
    }

    return (
        <CanvasContext.Provider value={value} >
            {children}
        </CanvasContext.Provider>
    )
}

export default CanvasProvider