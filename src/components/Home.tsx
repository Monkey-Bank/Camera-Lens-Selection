import React from 'react';
import View from './View';
import SetFavorite from './SetFavorite';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  return (
    <div>
      <View />
      <ToastContainer />
    </div>
  );
};

export default Home;
