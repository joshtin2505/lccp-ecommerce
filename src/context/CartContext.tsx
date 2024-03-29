/**
 * @file CartContext.tsx
 * @desc Provides a context for managing the cart state and related actions.
 */

import React, { createContext, useState } from "react"
import type { Cart, Product } from "@/types/types"
import useCartReducer from "@/hooks/useCartReducer"

/**
 * @interface ContextValues
 * @desc Represents the values provided by the CartContext.
 * @property {Cart} cart - The current cart state.
 * @property {(product: Product) => void} addToCart - Function to add a product to the cart.
 * @property {() => void} clearCart - Function to clear the cart.
 * @property {(product: Product) => void} removeFromCart - Function to remove a product from the cart.
 * @property {(product: Product) => void} decreaseQuantity - Function to decrease the quantity of a product in the cart.
 * @property {boolean} openCart - Flag indicating whether the cart is open or not.
 * @property {(open: boolean) => void} setOpenCart - Function to set the open state of the cart.
 */
interface ContextValues {
  cart: Cart
  addToCart: (product: Product) => void
  clearCart: () => void
  removeFromCart: (product: Product) => void
  decreaseQuantity: (product: Product) => void
  openCart: boolean
  setOpenCart: (open: boolean) => void
}

/**
 * @constant CartContext
 * @desc The context object for managing the cart state and related actions.
 */
export const CartContext = createContext<ContextValues | undefined>(undefined)

/**
 * @function CartContextProvider
 * @desc The provider component for the CartContext.
 * @param {React.ReactNode} children - The child components to be wrapped by the provider.
 * @returns {React.ReactNode} The wrapped child components.
 */
function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [openCart, setOpenCart] = useState(false)

  const { state, addToCart, removeFromCart, clearCart, decreaseQuantity } =
    useCartReducer()

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        clearCart,
        removeFromCart,
        decreaseQuantity,
        openCart,
        setOpenCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
