import React, { useEffect } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';

import App from './App';

const SET_CURRENT_USER = gql`
    mutation SetCurrentUser($user: user!) {
        setCurrentUser(user: $user) @client
    }
`;

const GET_CURRENT_USER = gql`
    {
        currentUser @client
    }
`;


const AppContainer = (props) => {    

    const { data } = useQuery(GET_CURRENT_USER);
    const [ setCurrentUser, { error }] = useMutation(SET_CURRENT_USER);

    if (error) {
        console.log(error);
        return <p>Error</p>
    }

    const { currentUser } = data;

    return <App currentUser={currentUser}
        setCurrentUser={user => {
            setCurrentUser({ variables: { user } })
        }}
    />
}

export default AppContainer;