import React from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = expense => {
        this.props.editExpense(this.props.params._id, expense);
        this.props.navigate('/dashboard');
    }
    onClick = () => {
        this.props.removeExpense(this.props.params._id);
        this.props.navigate('/dashboard');
    }
    currentExpense = this.props.expenses.find(({ _id }) => (
        _id === this.props.params._id
    ));
    render() {
        return (
            <div>
                <div className='page-header'>
                    <div className='container'>
                        <h1 className='page-title'>Edit Expense</h1>
                    </div>
                </div>
                <div className='container'>
                    <ExpenseForm
                        expense={this.currentExpense}
                        onSubmit={this.onSubmit}
                    />
                    <button
                        className='button__secondary'
                        onClick={this.onClick}
                    >Remove Expense</button>
                </div>
            </div>
        );
    }
}



const mapDispatchToProps = (dispatch) => ({
    editExpense: (_id, expense) => {
        dispatch(startEditExpense(_id, expense));
    },
    removeExpense: (_id) => {
        dispatch(startRemoveExpense(_id));
    },
    navigate: useNavigate(),
    params: useParams()
});

const mapStateToProps = (state) => {
    return {
        expenses: state.expenses
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);