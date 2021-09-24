import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';

const defaultToken = {
  token: undefined
};

const tokenReducer = (state = defaultToken, action) => {
  switch (action.type) {
      case "ADD_TOKEN":
        return {...state, token: action.token}
      case "DELETE_TOKEN":
        return {...state, token: undefined}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  tokenReducer
})

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);