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
          <Routes>
            <Route path='/login' element={<LoginView />} />
            <Route path='/reset-pwd' element={<SendCodeView />} />
            <Route path='/change-pwd/:id/:code' element={<ChangePwdView />} />
            <Route path='/' element={<Main />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </SettingsContextProvider>

  )
}

export default App;
