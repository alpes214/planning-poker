import { Divider, Slide } from '@material-ui/core';
import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer>
      <Slide in={true} direction='up' timeout={3000}>
        <div className='FooterSection'>
          <Divider variant='middle'></Divider>
            <Divider orientation='vertical' flexItem></Divider>
            <Divider orientation='vertical' flexItem></Divider>
        </div>
      </Slide>
    </footer>
  );
};
