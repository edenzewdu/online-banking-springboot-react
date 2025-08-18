import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './Components/Context/UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <React.StrictMode>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </React.StrictMode>
    </>
  </BrowserRouter>
);
