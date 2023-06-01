import React from 'react';
import ReactLoading from 'react-loading';
import classes from '../../styles/loading.module.css';

function Loading({ color }) {
  return (
    <div className={classes.loading}>
      <ReactLoading
        type="bars"
        color={color || '#000000'}
        height={100}
        width={100}
      />
    </div>
  );
}

export default Loading;
