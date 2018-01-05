import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import {BrowserRouter} from "react-router-dom";
import thunk from "redux-thunk";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import monsterReducer from "./store/reducers/monster";
import saveReducer from "./store/reducers/save";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({monster: monsterReducer, save: saveReducer});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
        <Provider store={store}>
            <BrowserRouter>    
                <App/>
            </BrowserRouter>
        </Provider>
    );

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
