import React from 'react';
import './App.scss';
import { LoginView } from './views';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginView />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
