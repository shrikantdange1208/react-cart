import React, { createContext, useEffect, useReducer, useState } from 'react'
import { useContext } from 'react'
import cartItems from '../src/data'
import reducer, { DISPLAY_ITEMS } from './reducer'
import {
  CLEAR_CART,
  REMOVE_ITEM,
  GET_TOTALS,
  LOADING,
  TOGGLE_AMOUNT,
} from './reducer'
const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}
const AppContext = createContext()

const AppProvider = ({ children }) => {
  // const [cart, setCart] = useState(cartItems)
  const [state, dispatch] = useReducer(reducer, initialState)

  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }

  const toggleAmount = (id, type) => {
    dispatch({ type: TOGGLE_AMOUNT, payload: { type: type, id: id } })
  }

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id: id } })
  }

  const fetchData = async () => {
    dispatch({ type: LOADING })
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({ type: DISPLAY_ITEMS, payload: { cartItems: cart } })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    dispatch({ type: GET_TOTALS })
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }
