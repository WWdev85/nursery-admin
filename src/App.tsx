import React from 'react';
import './App.scss';
import { Main } from './views';
import { BrowserRouter } from 'react-router-dom';
import { SettingsContextProvider, AuthContextProvider } from './contexts';

function App() {

  return (
    <SettingsContextProvider>
      <BrowserRouter>
        <AuthContextProvider>
          <Main />
        </AuthContextProvider>
      </BrowserRouter>
    </SettingsContextProvider>

  )
}

export default App;
