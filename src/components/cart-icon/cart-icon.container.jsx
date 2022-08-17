import React from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';

import CartIcon from './cart-icon.component';


// querying to apollo's local cache to get the toggleHidden functionality
const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden{
        toggleCartHidden @client
    }
`;

const GET_TOTAL_ITEMS_COUNT = gql`
    {
        itemCount @client
    }
`;


const CartIconContainer = () => {
    const [ toggleCartHidden , { error }] = useMutation(TOGGLE_CART_HIDDEN);
    const { data } = useQuery(GET_TOTAL_ITEMS_COUNT);

    if (error) console.log(error);

    const { itemCount } = data;

    return <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount}/>;

}

export default CartIconContainer;