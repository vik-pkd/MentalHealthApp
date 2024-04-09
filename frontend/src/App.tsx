import React, { useEffect } from 'react';
import { Router } from './routes/Router';
import { AppwriteProvider } from './appwrite/AppwriteContext';
import axios from 'axios';
import LoginProvider from './context/LoginProvider';
import { Provider } from 'react-redux';
import store from './store';



const App = () => {

  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <Provider store={store}>
        <LoginProvider>
          <Router />
        </LoginProvider>
      </Provider>
    </>
  );
};

export default App;