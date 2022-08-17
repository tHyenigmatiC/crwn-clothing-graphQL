import React from 'react';
import { gql, useQuery } from '@apollo/client';

import Header from './header.component';


// here @client directive tells the apollo that it is on the client side i.e. local cache
const GET_HEADER_DATA = gql`
    {
        cartHidden @client
        currentUser @client 
    }
`;

const HeaderContainer = () => {
    const { data: { cartHidden, currentUser } } = useQuery(GET_HEADER_DATA);
    return <Header hidden={cartHidden} currentUser={currentUser}/>
}

export default HeaderContainer;