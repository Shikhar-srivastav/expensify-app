import React from "react";
import ReactDOM from "react-dom";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { Provider } from 'react-redux';
import AppRouter from "./routers/AppRouter";
import configureStore from './store/configureStore';
import "normalize-css/normalize.css";
import "./styles/styles.scss";
import { addExpense } from './actions/expenses';

const store = configureStore();

store.dispatch(addExpense({ description: 'Water Bill', amount: 5000 }));
store.dispatch(addExpense({ description: 'Gas Bill', createdAt: 1000 }));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
); 

ReactDOM.render(
    jsx,
    document.getElementById("app")
);