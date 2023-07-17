import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/*" element={<h1 className="text-center">Not Found The Page</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
