import React, { useEffect, useState } from 'react'
import "./product.css"
import { useParams, Link } from 'react-router-dom'
import { FakeStoreApi } from "../../Services/fack-store-api"
import { useCart } from '../../Context/Context'


const Product = () => {

  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState()
  const {productId} = useParams()
  const {addToCart} = useCart()
  useEffect(() => {
    const fatchproduct = async () => {
      setLoading(true)
      const product = await FakeStoreApi.fetchProductById(productId)
      setProduct(product)
      setLoading(false)

    }
    fatchproduct().catch(console.error)
  }, [productId])

  if (!loading && !product) {
    return (
      <div className="container">
        <div className="product py-2">
          <div className="details p-3">
            Product not found, pleace visit{" "}
            <Link to="/" replace>HOME
            </Link>{" "}
          </div>

        </div>
      </div>
    )
  }
  return (
    <>
      <div className="container">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="product py-2">
            <div className="details grid p-3">
              <div className="product-image">
                <img src={product.image} alt="" />
              </div>
              <div className="info">
                <div className="description">
                  <h3>{product.title}</h3>
                  <p className='my-2'>{product.description}</p>
                </div>
                <div className="flex">
                  <span className='price'>${product.price}</span>
                  <span className='cart' onClick={() => {addToCart(product) }}><img src="/cart.svg" alt="" /></span>
                </div>
              </div>
            </div>
          </div>

        )}
      </div>
    </>
  )
}

export default Product
