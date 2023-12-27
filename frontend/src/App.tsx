import React from 'react';
import { Router } from './routes/Router';
import { AppwriteProvider } from './appwrite/AppwriteContext';
import axios from 'axios';
import LoginProvider from './context/LoginProvider';

const App = () => {


  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <LoginProvider>
        <Router />
      </LoginProvider>
    </>
  );
};

export default App;