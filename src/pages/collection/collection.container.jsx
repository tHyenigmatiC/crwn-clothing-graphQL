import React from 'react';
import { useQuery, gql } from '@apollo/client';

import CollectionPage from './collection.component';
import Spinner from '../../components/spinner/spinner.component';

import withRouter from '../../components/with-router/withRouter.component';

const GET_COLLECTION = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
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

const CollectionPageContainer = ({ params }) => {

    const { loading, error, data } = useQuery(GET_COLLECTION, {
        variables: { title: params.collectionId }
    });

    if (loading) return <Spinner />;

    if (error) {
        console.log(error);
        return <p>Error</p>;
    }

    const { getCollectionsByTitle } = data;
    return <CollectionPage collection={getCollectionsByTitle} />;
}

export default withRouter(CollectionPageContainer);