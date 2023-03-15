import React from 'react'

export const CLEAR_CART = 'CLEAR_CART'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const TOGGLE_AMOUNT = 'TOGGLE_AMOUNT'
export const GET_TOTALS = 'GET_TOTALS'
export const LOADING = 'LOADING'
export const DISPLAY_ITEMS = 'DISPLAY_ITEMS'

const reducer = (state, action) => {
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, cart: [] }

    case TOGGLE_AMOUNT:
      const id = action.payload.id
      const newCartItems = state.cart
        .map((item) => {
          if (item.id === id) {
            if (action.payload.type === 'INCREASE') {
              item.amount = item.amount + 1
            } else {
              item.amount = item.amount - 1
              if (item.amount < 0) {
                item.amount = 0
              }
            }
          }
          return item
        })
        .filter((item) => item.amount > 0)

      return { ...state, cart: newCartItems }

    case REMOVE_ITEM:
      const removeID = action.payload.id
      const newCart = state.cart.filter((item) => item.id !== removeID)
      return { ...state, cart: newCart }

    case GET_TOTALS:
      let { amount, total } = state.cart.reduce(
        (result, item) => {
          const { amount, price } = item
          result.amount = result.amount + amount
          result.total = result.total + amount * price
          return result
        },
        {
          amount: 0,
          total: 0,
        }
      )
      total = parseFloat(total.toFixed(2))
      return { ...state, amount: amount, total: total }

    case LOADING:
      return { ...state, loading: true }

    case DISPLAY_ITEMS:
      return { ...state, cart: action.payload.cartItems, loading: false }

    default:
      throw new Error('No matching operation')
  }
  return state
}

export default reducer
