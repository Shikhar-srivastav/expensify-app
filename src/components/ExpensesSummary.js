import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import getFilteredExpenses from '../selectors/expenses';
import getTotalExpenses from '../selectors/total';

export const ExpensesSummary = props => (
    <div>
        {`Viewing ${props.total.count} expense(s) totalling Rs${numeral(props.total.amount).format('0,0.00')}`}
     </div>
);

const mapStatetoProps = (state) => ({
    total: getTotalExpenses(getFilteredExpenses(state.expenses, state.filters)),
});

export default connect(mapStatetoProps)(ExpensesSummary)