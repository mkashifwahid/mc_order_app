import { createContext, useReducer } from 'react';
//import { json } from 'react-router-dom';

export const Store = createContext();

const initalState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  cart: {
    customer: localStorage.getItem('customerInfo')
      ? JSON.parse(localStorage.getItem('customerInfo'))
      : {},

    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.Id === newItem.Id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.Id === existItem.Id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.Id !== action.payload.Id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };

    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          customerInfo: {},
        },
      };

    case 'SAVE_CUSTOMER':
      return {
        ...state,
        cart: {
          ...state.cart,
          customerInfo: action.payload,
        },
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initalState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
