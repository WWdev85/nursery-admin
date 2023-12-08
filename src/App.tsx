import React from 'react';
import './App.scss';
import { ChangePwdView, LoginView, Main, SendCodeView } from './views';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
