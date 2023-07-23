import React from 'react'
import Navbar from './componants/navbar/Navbar'
import { Route,Routes,useNavigate,createSearchParams}  from 'react-router-dom'
import Cart from"./pages/cart/cart"
import NotFound from "./pages/not-found/note-found"
import Product  from "./pages/product/product"
import  Products  from "./pages/products/products"
import {useCart} from "./Context/Context.js"
const App = () => {
  const navigate =useNavigate();
  const {cartItemCount} =useCart()
  const onSearch =(searchQuery)=>
  {navigate(`/?${createSearchParams({q:searchQuery})}`)

  }
  return (
    <>
     <Navbar onSearch={onSearch} cartItemCount={(cartItemCount())} />
     <Routes>
      <Route path='/'element={<Products/>}/>
      <Route path='/product/:productId'element={<Product/>}/>
      <Route path='/cart'element={<Cart/>}/>
      <Route path='*'element={<NotFound/>}/>
      </Routes> 
    </>
  )
}

export default App
