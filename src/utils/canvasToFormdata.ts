import React from "react";

/**
 * Gera um FormData contendo a imagem do canvas
 * @param canvasRef Ref do canvas (HTMLCanvasElement)
 * @param fileName Nome do arquivo (ex: "desenho.png")
 * @returns Promise<FormData>
 */
function canvasToFormData(canvasRef: React.RefObject<HTMLCanvasElement>, fileName: string = "desenho.png"): Promise<FormData> {
    return new Promise((resolve, reject) => {
        const canvas = canvasRef.current;
        if (!canvas) {
            reject(new Error("Canvas não encontrado"));
            return;
        }

        canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error("Falha ao converter canvas em blob"));
                return;
            }
            const formData = new FormData();
            formData.append("file", blob, fileName);
            resolve(formData);
        }, "image/png");
    });
}

export default canvasToFormData