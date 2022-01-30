import React from "react";
import ExpenseList from './ExpenseList';
import ExpenseFilters from './ExpenseFilters';
import ExpensesSummary from './ExpensesSummary';

const DashboardPage = () => (
    <div>
        <ExpensesSummary />
        <ExpenseFilters />
        <ExpenseList />
    </div>
);

export default DashboardPage;