import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import { CustomRouter } from './CustomRouter';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../components/LoginPage';
import DashboardPage from "../components/DashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";

export const history = createBrowserHistory();

const AppRouter = () => (
    <CustomRouter history={history}>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard"
                element={<PrivateRoute component={DashboardPage} />}
            />
            <Route path="/create"
                element={<PrivateRoute component={AddExpensePage} />} />
            <Route path="/edit">
                <Route path=":_id"
                    element={<PrivateRoute component={EditExpensePage} />}
                />
            </Route>
            <Route path="/help" element={<HelpPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </CustomRouter>
);

export default AppRouter;