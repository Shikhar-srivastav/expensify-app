import React from "react";
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';
import { useNavigate } from 'react-router-dom';

export class AddExpensePage extends React.Component {
    onSubmit = expense => {
        this.props.startAddExpense(expense);
        this.props.navigate('/dashboard');
    }
    render() {
        return (
            <div>
                <div className='page-header'>
                    <div className='container'>
                        <h1 className='page-title'>Add Expense</h1>
                    </div>
                </div>
                <div className='container'>
                    <ExpenseForm
                        onSubmit={this.onSubmit}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    navigate: useNavigate(),
    startAddExpense: expense => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);