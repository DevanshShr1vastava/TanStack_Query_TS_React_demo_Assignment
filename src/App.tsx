import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ProductListCategory from './components/ProductListCategory';


const NotFound = ()=>{
  return (<h2>Not Found</h2>);
}

function App() {
  return (
    <Router>
      <nav>
        <Link to='/'>Home</Link> | { " " }
        <Link to='/prodByCategory'>By Category</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path = "/products/:id" element = {<ProductDetails />} />
        <Route path = "/prodByCategory" element = {<ProductListCategory />} />
        <Route path = "*" element={<NotFound />} />
      </Routes>
    </Router>

  )
}

export default App
