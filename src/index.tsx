import './index.css';

// import '../public/lib/js/iconfont.js';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import App from './App';
import reducer from './reducers';
import * as serviceWorker from './serviceWorker';

// logger 中间件
// const logger = (store:any) => (next:any) => (action:any) => {
//     console.log('dispatching', action);
//     let result = next(action)
//     console.log('next state', store.getState());
//     return result;
// }
// error中间件
const error = (store:any) => (next:any) => (action:any) => {
    try {
        next(action)
    } catch (e){ 
        console.log(`error ${e}`);
    }
}
// 配置中间件
const store = createStore(reducer, {}, applyMiddleware(thunk, logger, error));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
