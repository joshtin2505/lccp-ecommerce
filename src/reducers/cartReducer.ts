import { CART_ACTIONS, Cart, type Product } from "@/types/types.d"

/**
 * Retrieves the cart from local storage or initializes an empty cart.
 */
const savedCartString =
  typeof window !== "undefined" ? localStorage.getItem("cart") ?? "[]" : "[]"
const savedCart: Cart = JSON.parse(savedCartString)

/**
 * The initial state of the cart.
 */
export const initialState: Cart = savedCart

/**
 * Updates the cart in local storage.
 * @param cart - The updated cart.
 */
export const updateLocalStorage = (cart: Cart) => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

/**
 * The possible action types for the cart reducer.
 */
type ActionTypes =
  | {
      type:
        | CART_ACTIONS.ADD_TO_CART
        | CART_ACTIONS.DECREASE_QUANTITY
        | CART_ACTIONS.REMOVE_FROM_CART
      payload: Product
    }
  | {
      type: CART_ACTIONS.CLEAR_CART
    }

/**
 * The cart reducer function.
 * @param state - The current state of the cart.
 * @param action - The action to be performed on the cart.
 * @returns The updated state of the cart.
 */
export function cartReducer(state: Cart, action: ActionTypes): Cart {
  if (action.type === CART_ACTIONS.CLEAR_CART) {
    updateLocalStorage([])
    return []
  }

  const { id } = action.payload
  const productInCartIndex = state.findIndex((item) => item.id === id)

  if (action.type === CART_ACTIONS.ADD_TO_CART) {
    if (productInCartIndex >= 0) {
      const newState = structuredClone(state) as Cart
      ;(newState[productInCartIndex].quantity as number)++
      updateLocalStorage(newState)
      console.log("render")
      return newState
    }
    const newState = [...state, { ...action.payload, quantity: 1 }]
    updateLocalStorage(newState)
    return newState
  } else if (action.type === CART_ACTIONS.REMOVE_FROM_CART) {
    const newState = state.filter((item) => item.id !== id)
    updateLocalStorage(newState)
    return newState
  } else if (action.type === CART_ACTIONS.DECREASE_QUANTITY) {
    if (productInCartIndex >= 0) {
      const newState = structuredClone(state) as Cart
      if ((newState[productInCartIndex].quantity as number) > 1) {
        ;(newState[productInCartIndex].quantity as number)--
      }
      updateLocalStorage(newState)
      return newState
    }
  }

  return state
}
