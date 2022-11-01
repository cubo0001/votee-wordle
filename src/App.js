import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Wordle, NotFound } from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/play" />} />
                <Route path="/play" element={<Wordle />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
