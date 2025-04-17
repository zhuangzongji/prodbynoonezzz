import { BrowserRouter, Routes, Route } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from "react-redux"

import './App.css'
import Home from './pages/Home'
import Product from './pages/Product'
import store from './redux/store'

function App() {

  return (
    <Provider store={store}>
      <HelmetProvider context={{}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products">
              <Route path="category/:categoryName" element={<Home />} />
              <Route path="id/:productId" element={<Product />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>

  )
}

export default App
