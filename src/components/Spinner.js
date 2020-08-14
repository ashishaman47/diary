import React, { Fragment } from 'react';
import spinner2 from './spinner2.gif';

export default () => (
  <Fragment>
    <img
      src={spinner2}
      style={{ width: '500px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
);
