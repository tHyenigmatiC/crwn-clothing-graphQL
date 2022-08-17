import React from 'react';
import { useQuery, gql } from '@apollo/client';


import CollectionsOverview from './collections-overview.component';
import Spinner from '../spinner/spinner.component';


const GET_COLLECTIONS = gql`
    {
        collections {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`;

const GET_CURRENT_USER = gql`
    {
        currentUser @client
    }
`;

const CollectionsOverviewContainer = () => {
    const { loading, error, data } = useQuery(GET_COLLECTIONS);
    
    if (loading) return <Spinner />;
    
    if (error) return <p>Error</p>;
    
    const { collections } = data;
    return <CollectionsOverview collections={collections} />;
}

export default CollectionsOverviewContainer;