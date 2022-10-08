import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAusehZ947NlDFcba6dr83eUWg_ImN4xT0",
  authDomain: "cart-3921c.firebaseapp.com",
  projectId: "cart-3921c",
  storageBucket: "cart-3921c.appspot.com",
  messagingSenderId: "401419139446",
  appId: "1:401419139446:web:314af85ff71ae3e7cca257"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

