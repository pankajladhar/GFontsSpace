import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import Reducers from './Containers/Reducers';

import registerServiceWorker from './registerServiceWorker';


const logger = createLogger();

const preloadedState = window.__PRELOADED_STATE__ || {
    butiltWithReact: { welcomeMessage: 'Welcome to Built With React - Initial' }
}

const store = compose(
    applyMiddleware(thunk, logger),
)(createStore)(Reducers, preloadedState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);

registerServiceWorker();
