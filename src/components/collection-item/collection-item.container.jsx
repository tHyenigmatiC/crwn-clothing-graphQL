import React from 'react';
import { useMutation, gql } from '@apollo/client';

import CollectionItem from './collection-item.component';

const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item: item){
        addItemToCart(item: $item) @client
    }
`;


const CollectionItemContainer = (props) => {
    const [ addItemToCart, { error }] = useMutation(ADD_ITEM_TO_CART);

    if (error) console.log(error); 

    return <CollectionItem 
        addItem={item => addItemToCart({ variables: { item }})} 
        {...props} 
    />;

}

export default CollectionItemContainer;

