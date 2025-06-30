import { useContext, useEffect, useRef, useState } from "react";
import SquareProps from "../types/Square.props";
import CanvasContext from "../context/Canvas.context";

function SquareComponent(props: SquareProps) {
    const context = useContext(CanvasContext)
    if (!context) { throw new Error("Context not found") }

    const { bgColor, borderColor } = props
    const style = {}

    const { canvasRef } = context;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [drawing, setDrawing] = useState(false);

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        const wrapper = wrapperRef.current;
        if (canvas && wrapper) {
            const size = Math.min(wrapper.offsetWidth, wrapper.offsetHeight);
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, size, size);
                ctx.lineWidth = 20;
            }
        }
    };

    useEffect(() => {
        resizeCanvas();
        const ro = new window.ResizeObserver(resizeCanvas);
        if (wrapperRef.current) {
            ro.observe(wrapperRef.current);
        }
        return () => {
            ro.disconnect();
        };
    }, [bgColor, borderColor]);

    const getPos = (
        e: React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>
    ) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        let x, y;
        if ("touches" in e) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
        return { x, y };
    };

    const startDraw = (
        e: React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>
    ) => {
        e.preventDefault();
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
            const { x, y } = getPos(e);
            ctx.beginPath();
            ctx.moveTo(x, y);
            setDrawing(true);
        }
    };

    const draw = (
        e: React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>
    ) => {
        if (!drawing) return;
        e.preventDefault();
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
            const { x, y } = getPos(e);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    };

    const endDraw = () => {
        setDrawing(false);
    };

    return (
        <div
            ref={wrapperRef}
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
                ...style,
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    touchAction: "none",
                    background: bgColor,
                    border: "none",
                }}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
                onTouchCancel={endDraw}
            />
        </div>
    );
}

export default SquareComponent