import React from 'react'
import { Link } from 'react-router-dom'


const Item = ({data, addToCart}) => {

    const {id, image, title,price }= data
    
  return (
    <div className='card'>
      <div className="grid">
        <div className="image">
            <img src={image} alt="" />
        </div>
        <div className="titel">
            <Link to={`/product/${id}`} className='link titleLink'>
                {title}
            </Link>
        </div>
        <div className="flex">
            <span className='price' style={{ marginRight: 15.}}>
                ${price}
            </span>
            <div className="cart" onClick={addToCart}>
                <img src="/cart.svg" alt="" className='cartImg' />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Item
