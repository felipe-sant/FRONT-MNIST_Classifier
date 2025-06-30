import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import CanvasProvider from "../context/Canvas.provider";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={
          <CanvasProvider>
            <Home />
          </CanvasProvider>
        } />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </BrowserRouter>
  );
}