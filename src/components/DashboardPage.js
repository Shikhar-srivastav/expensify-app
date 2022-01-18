import React from "react";
import ExpenseList from './ExpenseList';
import ExpenseFilters from './ExpenseFilters';

const DashboardPage = () => (
    <div>
        <ExpenseFilters />
        <ExpenseList />
    </div>
);

export default DashboardPage;