// import { useContext, createContext, useState } from "react"
// const initialState = {
//     cart: [],
//     addToCart: () => null,
//     cartitemCount: () => 0,
//     removeFromCart: () => null,
//     increaseQuntity: () => null,
//     decreaseQuntity: () => null,

// }


// const cartContext = createContext(initialState)
// const useCart = () => useContext(cartContext)

// const CartProvaider = ({ children }) => {
//     const [cart, setCart] = useState(initialState.cart)

//     const cartItemCount = () => {
//         // return cart.reduce((acc, item) =>  acc + item.quantity , 0)
//         return cart.reduce((acc, item) => acc + item.quantity, 0)
//     }
//     const addToCart = (product) => {
//         const productIdx = cart.findIndex((item) => { return item.product.id === product.id })
//         if (productIdx !== -1) {
//             increaseQuntity(product.id)
//         }
//         else {
//             setCart(...cart, { product, quantity: 1 })
//         }
//     }

//     const removeFromCart = (product) => {
//         setCart(cart.filter((item) =>  item.product.id !== product.id ))
//     }
//     const increaseQuntity = (productID) => {
//         const copy = cart.slice()
//         const productIdx = cart.findIndex((item) => { return item.product.id === productID })
//         if (productIdx !== -1) {
//             copy[productIdx].quantity += 1
//             setCart(copy)
//         }
//     }
//     const decreaseQuntity = (productID) => {
//         const copy = cart.slice()
//         const productIdx = cart.findIndex((item) => { return item.product.id === productID })
//         if (productIdx !== -1 && copy[productIdx].quantity > 0) {
//             copy[productIdx].quantity -= 1
//             setCart(copy)
//         }

//     }
//     return <cartContext.Provider value={{ cart, removeFromCart, decreaseQuntity, increaseQuntity, addToCart, cartItemCount }
//     }>
//         {children}
//     </cartContext.Provider>
// }



// export { useCart, CartProvaider }


import { createContext, useContext, useState } from "react"

const initialState = {
    cart: [],
    cartItemCount: () => 0,
    addToCart: () => null,
    removeFromCart: () => null,
    increaseQuantity: () => null,
    decreaseQuantity: () => null,
}

const CartContext = createContext(initialState)

const useCart = () => useContext(CartContext)

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(initialState.cart)

    const cartItemCount = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0)
    }

    const addToCart = (product) => {
        const productIdx = cart.findIndex((item) => item.product.id === product.id)
        if (productIdx !== -1) {
            increaseQuantity(product.id)
        } else {
            setCart([...cart, { product, quantity: 1 }])
        }
    }

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.product.id !== productId))
    }

    const increaseQuantity = (productId) => {
        const copy = cart.slice()
        const productIdx = copy.findIndex((item) => item.product.id === productId)
        if (productIdx !== -1) {
            copy[productIdx].quantity += 1
            setCart(copy)
        }
    }

    const decreaseQuantity = (productId) => {
        const copy = cart.slice()
        const productIdx = copy.findIndex((item) => item.product.id === productId)
        if (productIdx !== -1 && copy[productIdx].quantity > 1) {
            copy[productIdx].quantity -= 1
            setCart(copy)
        }
    }

    return (
        <CartContext.Provider
            value={{ cart, cartItemCount, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}
        >
            {children}
        </CartContext.Provider>
    )
}

export { useCart, CartProvider }