import { CartContext } from "@/context/CartContext"
import { useContext } from "react"

/**
 * Custom hook that provides access to the cart context and cart-related functions.
 * @returns An object containing the cart context and the `inCart` function.
 * @throws {Error} If used outside of a CartProvider.
 */
export const useCart = () => {
  const context = useContext(CartContext)

  if (context == undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }

  const { cart } = context

  /**
   * Checks if a product with the specified ID is in the cart.
   * @param id - The ID of the product to check.
   * @returns `true` if the product is in the cart, `false` otherwise.
   */
  function inCart(id: number) {
    return cart.some((item) => item.id === id)
  }

  return { ...context, inCart }
}
