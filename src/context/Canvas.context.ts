import { createContext } from "react"
import CanvasContextType from "../types/CanvasContextType"

const CanvasContext = createContext<CanvasContextType | undefined>(undefined)

export default CanvasContext