import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import getFilteredExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div className='container'>
        <div className='list-header'>
            <div className='show-for-mobile'>Expenses</div>
            <div className='show-for-desktop'>Expense</div>
            <div className='show-for-desktop'>Amount</div>
        </div>
        {
            props.expenses.length === 0 ? (
                <p className='message'>NO EXPENSES</p>
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