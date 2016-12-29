import React from 'react';

import preHeaderStyles from './styles/preheader.css'

const PreHeader = () => (
  <div className={preHeaderStyles.block}>
    <p className={preHeaderStyles.para}>Make an account to favorite movies!</p>
    <button className='btn btn-secondary'>Sign up</button>
  </div>
)

export default PreHeader;
