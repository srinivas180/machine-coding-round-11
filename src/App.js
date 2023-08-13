import { Route, Routes } from "react-router";

import { Home } from "./pages/Home";
import "./App.css";

function App() {
    return (
        <div className="App">
            <h1>Hello World</h1>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
