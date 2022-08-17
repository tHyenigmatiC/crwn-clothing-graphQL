import { gql } from "@apollo/client"

// here @client directive tells the apollo that it is on the client side i.e. local cache
export const INTIALIZE_LOCAL_STATE = gql`
    {
      currentUser @client
      cartHidden @client
      cartItems @client
      itemCount @client
      totalPrice @client
    }
`;

export const INTIAL_DATA = {
    currentUser: null,
    cartHidden: true,
    cartItems: [],
    itemCount: 0,
    totalPrice: 0
  }