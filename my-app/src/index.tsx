import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';


import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const auth = firebase.auth();
const firestore = firebase.firestore();
interface IContext {
  firestore: typeof firestore,
  auth: typeof auth,
  firebase: typeof firebase,
}
const context = {
  firestore,
  auth,
  firebase
}
export const Context = createContext<IContext>(context)
ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={context}>

    </Context.Provider>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
