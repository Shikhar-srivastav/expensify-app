import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import getFilteredExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                props.expenses.map(expense => (
                    <ExpenseListItem
                        key={expense._id}
                        {...expense}
                    />
                ))
            )
        }
    </div>
);

const ConnectedExpenseList = connect(state => {
    return {
        expenses: getFilteredExpenses(state.expenses, state.filters)
    };
})(ExpenseList);

export default ConnectedExpenseList;