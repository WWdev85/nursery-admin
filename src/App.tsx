import React from 'react';
import './App.scss';
import { LoginView } from './views';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SettingsContextProvider } from './contexts';

function App() {

  return (
    <SettingsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginView />} />

        </Routes>
      </BrowserRouter>
    </SettingsContextProvider>

  )
}

export default App;
