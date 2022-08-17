import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';


import { store, persistor } from './redux/store';

import { resolvers, typeDefs } from './graphql/resolvers';
import { INTIALIZE_LOCAL_STATE, INTIAL_DATA } from './graphql/intial.data';

import './index.css';
import {default as App} from './App/App.container';

// used for caching graphql data

const apolloClient = new ApolloClient({
  uri: 'https://crwn-clothing.com',
  cache: new InMemoryCache(),
  typeDefs,
  resolvers
});



apolloClient.writeQuery({
  query: INTIALIZE_LOCAL_STATE,
  data: INTIAL_DATA
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);
