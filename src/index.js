import React from "react";
import ReactDom from "react-dom";
import { applyMiddleware, createStore } from "redux";
import createHistory from "history/createBrowserHistory"
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Route, Switch } from "react-router";
import App from "./components/App";
import LoginForm from "./components/LoginForm";
import reducer from "./reducer";
import thunkMiddleWare from "redux-thunk";
import { tokenMiddleware } from "./tokenMiddleware";

const store = createStore(reducer,
    applyMiddleware(thunkMiddleWare, tokenMiddleware));


const history = createHistory();
ReactDom.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>

            <Route path="/" component={App} />

        </ConnectedRouter>
    </Provider>
), document.getElementById("root"))