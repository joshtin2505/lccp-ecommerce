import { cartReducer, initialState } from "@/reducers/cartReducer"
import { CART_ACTIONS, type Product } from "@/types/types.d"
import { useReducer } from "react"

/**
 * Custom hook that provides a cart reducer and actions for manipulating the cart state.
 *
 * @returns An object containing the current cart state and functions for adding, removing, clearing, and decreasing the quantity of items in the cart.
 */
function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  /**
   * Adds a product to the cart.
   *
   * @param product - The product to be added to the cart.
   */
  const addToCart = (product: Product) =>
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: product,
    })

  /**
   * Removes a product from the cart.
   *
   * @param product - The product to be removed from the cart.
   */
  const removeFromCart = (product: Product) =>
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: product,
    })

  /**
   * Clears the cart.
   */
  const clearCart = () => dispatch({ type: CART_ACTIONS.CLEAR_CART })

  /**
   * Decreases the quantity of a product in the cart.
   *
   * @param product - The product whose quantity needs to be decreased.
   */
  const decreaseQuantity = (product: Product) =>
    dispatch({
      type: CART_ACTIONS.DECREASE_QUANTITY,
      payload: product,
    })

  return { state, addToCart, removeFromCart, clearCart, decreaseQuantity }
}

export default useCartReducer
