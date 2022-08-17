import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {default as CollectionsOverview} from '../../components/collections-overview/collections-overview.container';
import {default as CollectionPage} from '../collection/collection.container';

const ShopPage = () => (
  <div className='shop-page'>
    <Routes>
      <Route path='/' element={<CollectionsOverview/>} />
      <Route path='/:collectionId' element={<CollectionPage/>} />
    </Routes>
  </div>
);

export default ShopPage;
