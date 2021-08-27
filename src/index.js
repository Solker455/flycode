import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const defaultState = {
  token: undefined
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
      case "ADD_TOKEN":
        return {...state, token: action.load}
      case "DELETE_TOKEN":
        return {...state, token: undefined}
    default:
      return state
  }
}
const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);