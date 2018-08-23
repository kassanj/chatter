import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducers from './reducers'
import middleware from './middleware'

const persistConfig = {
  key: 'root',
  storage,
}

const pReducer = persistReducer(persistConfig, reducers)
const store = createStore(pReducer, middleware)
const persistor = persistStore(store)


// Redux applications have a single store.
// We have to pass the Root Reducer to our
// createStore() function in order for the
// store to know what pieces of state it
// should have. The point of creating a store
// is to allow components to be able to access
// it without having to pass the data down
// through multiple components.

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
         <App />
       </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// The Provider component (which comes from the
// react-redux package) makes it possible for all
// components to access the store via the
// connect() function.
