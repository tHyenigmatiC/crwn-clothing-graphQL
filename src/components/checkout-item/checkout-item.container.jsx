import React from 'react';
import { useMutation, gql } from '@apollo/client';

import CheckOutItem from './checkout-item.component';

const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item: item){
        addItemToCart(item: $item) @client
    }
`;

const REMOVE_ITEM_FROM_CART = gql`
    mutation RemoveItemFromCart($item: item){
        removeItemFromCart(item: $item) @client
    }
`;

const CLEAR_ITEM_FROM_CART = gql`
    mutation ClearItemFromCart($item: item){
        clearItemFromCart(item: $item) @client
    }
`;


const CheckoutItemContainer = (props) => {
    const [ addItemToCart, { errAdd } ] = useMutation(ADD_ITEM_TO_CART);
    const [ removeItemFromCart, { errRemove } ] = useMutation(REMOVE_ITEM_FROM_CART);
    const [ clearItemFromCart, { errClear } ] = useMutation(CLEAR_ITEM_FROM_CART);

    if (errAdd) console.log(errAdd);
    if (errRemove) console.log(errRemove);
    if (errClear) console.log(errClear);

    return <CheckOutItem 
        addItem={item => addItemToCart({ variables: { item }})}
        removeItem={item => removeItemFromCart({ variables: { item }})}
        clearItem={item => clearItemFromCart({ variables: { item }})}
        {...props} 
    />;

}

export default CheckoutItemContainer;