import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

import CartDropdown from './cart-dropdown.component';


const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden{
        toggleCartHidden @client
    }
`;

const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`;

const CartDropdownContainer = () => {
    const { data } = useQuery(GET_CART_ITEMS);
    const [ toggleCartHidden, { error }] = useMutation(TOGGLE_CART_HIDDEN);

    if (error) console.log(error);

    const { cartItems } = data;

    console.log(cartItems);

    return <CartDropdown cartItems={cartItems} toggleCartHidden={toggleCartHidden}/>;

}

export default CartDropdownContainer;