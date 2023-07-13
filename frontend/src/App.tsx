import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Product from './pages/Product';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={ <Home />} />
          <Route path='/product' element={ <Product />} />
          <Route path='/*' element={<h1>Not Found The Page</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
