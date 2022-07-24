import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.min.css';
import App from './App';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';

// const authReducer = (state = {}, action) => {
//   switch(action.type){
//     case 'LOGGED_IN_USER':
//       return {...state, ...action.payload};
//     case 'LOGOUT':
//       return action.payload;
//     default: 
//       return state;
//   }
// }

// const rootReducer = combineReducers({
//   user: authReducer
// });

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
