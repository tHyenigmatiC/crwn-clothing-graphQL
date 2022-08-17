import React from 'react';


import {default as CollectionItem} from '../collection-item/collection-item.container';

import withRouter from '../with-router/withRouter.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items, navigate, location }) => {
  return (
    <div className='collection-preview'>
      <h1
        className='title'
        onClick={() => navigate(`${location.pathname}/${title.toLowerCase()}`)}
      >
        {title.toUpperCase()}
      </h1>
      <div className='preview'>
        {items
          .filter((item, idx) => idx < 4)
          .map(item => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}

export default withRouter(CollectionPreview);
