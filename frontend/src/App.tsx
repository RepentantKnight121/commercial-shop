import { BrowserRouter, Route, Routes } from "react-router-dom"

import Admin from "./pages/Admin"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/admin" element={ <Admin /> } />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={ <Register />} />
          <Route path="/*" element={<h1 className="text-center">Not Found The Page</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
