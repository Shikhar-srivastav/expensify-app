import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import numeral from 'numeral';
import getFilteredExpenses from '../selectors/expenses';
import getTotalExpenses from '../selectors/total';

export const ExpensesSummary = props => (
    <div className='page-header'>
        <div className='container'>
            <p>
                Viewing <span>{props.total.count}</span> expense(s) totalling <span>Rs{numeral(props.total.amount).format('0,0.00')}</span>
            </p>
            <div>
                <Link to='/create'>
                    <button className='button'>Add Expense</button>
                </Link>
            </div>
        </div>
     </div>
);

const mapStatetoProps = (state) => ({
    total: getTotalExpenses(getFilteredExpenses(state.expenses, state.filters)),
});

export default connect(mapStatetoProps)(ExpensesSummary)