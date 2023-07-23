import React, { useEffect, useState } from 'react'
import {FakeStoreApi} from "../../Services/fack-store-api"
import Item from "../../componants/item/Item"
import { useSearchParams } from 'react-router-dom'
import {useCart} from "../../Context/Context"

const Products = () => {
  const [loading, setLoading]= useState(true)
  const [products, setProducts]= useState([]) 
  const [query, setQuery] = useSearchParams()
  const {addToCart}= useCart()
  const searchQuery= query.get('q')

  useEffect(()=>{
    const fetchProduct= async ()=> {
      setLoading(true)
      const products=searchQuery ? await  FakeStoreApi.fetchProsuctsBysearchQuery(searchQuery):await FakeStoreApi.fetchAllProsucts()
      setProducts(products)
      setLoading(false)
    }
    fetchProduct().catch(console.log("erroe"))
  },[searchQuery])
  if(!loading && searchQuery && !products.length){
    return (
      <div className="container">
        <div className="product py-2">
          <div className="details p-3">
            No products found matching you are query
          </div>

        </div>
      </div>
    )
  }
  return (
    <>
     <div className="container">
      <div className="products my-5">
        <div className="grid">
          {
            loading?(
              <div className="loader"/>
            ):(products.map((product)=>{
             return  <Item key={product.id} data={product}  addToCart={()=>addToCart(product)}/>
            }))
          }
        </div>
      </div>
     </div>
    </>
  )
}

export default Products
