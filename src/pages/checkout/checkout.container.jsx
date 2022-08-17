import React from 'react';
import { useQuery, gql } from '@apollo/client';

import CheckoutPage from './checkout.component';


const GET_TOTAL_PRICE_WITH_ITEMS = gql`
    {
        cartItems @client
        totalPrice @client
    }
`;

const CheckoutPageContainer = () => {
    const { data: { cartItems, totalPrice }} = useQuery(GET_TOTAL_PRICE_WITH_ITEMS);
    
    return <CheckoutPage cartItems={cartItems} total={totalPrice}/>;
}

export default CheckoutPageContainer;