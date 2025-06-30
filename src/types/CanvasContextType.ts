type CanvasContextType = {
    canvasRef: React.RefObject<HTMLCanvasElement>
    imgDataUrl: string | null,
    sendCanvas: () => Promise<number | undefined>
    clearCanvas: () => void
}

export default CanvasContextType