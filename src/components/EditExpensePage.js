import React from "react";
import { connect } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import ExpenseForm from '../components/ExpenseForm'
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = expense => {
        this.props.editExpense(this.props.params._id, expense);
        this.props.navigate('/');
    }
    onClick = () => {
        this.props.removeExpense(this.props.params._id);
        this.props.navigate('/');
    }
    currentExpense = this.props.expenses.find(({ _id }) => (
        _id === this.props.params._id
    ));
    render() {
        return (
            <div>
                <h1>Edit Expense</h1>
                <ExpenseForm
                    expense={this.currentExpense}
                    onSubmit={this.onSubmit}
                />
                <button
                    onClick={this.onClick}
                >Remove</button>
            </div>
        );
    }
}



const mapDispatchToProps = (dispatch) => ({
    editExpense: (_id, expense) => {
        dispatch(editExpense(_id, expense));
    },
    removeExpense: (_id) => {
        dispatch(removeExpense(_id));
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