import React, { useContext } from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/NavBar';
import AppRouter from './components/AppRouter';
import { Context } from '.';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from './components/Loader';


const App = () => {
  const { auth } = useContext(Context);
  const loading = useAuthState(auth)[1];
  if (loading) {
    return <Loader />
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
