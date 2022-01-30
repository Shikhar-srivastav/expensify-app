import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? props.expense.amount : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: undefined
        }
    }
    onDescriptionChange = e => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onNoteChange = e => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onAmountChange = e => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };
    onDateChange = createdAt => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = e => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please enter valid details!' }));
        } else {
            this.setState(() => ({ error: undefined }));
            this.props.onSubmit({
                description: this.state.description,
                note: this.state.note,
                amount: parseFloat(this.state.amount, 10),
                createdAt: this.state.createdAt.valueOf()
            });
        }
    };
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className='form'>
                    {!!this.state.error && <p>{this.state.error}</p>}
                    <div className='input-group__item'>
                        <input
                            className='text-input'
                            type='text'
                            placeholder='Description'
                            autoFocus
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                        />
                    </div>
                    <div className='input-group__item'>
                        <input
                            className='text-input'
                            type='text'
                            placeholder='Amount'
                            value={this.state.amount}
                            onChange={this.onAmountChange}
                        />
                    </div>
                    <div className='input-group__item'>
                        <SingleDatePicker
                            date={this.state.createdAt}
                            onDateChange={this.onDateChange}
                            focused={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={day => false}
                        />
                    </div>
                    <div className='input-group__item'>
                        <textarea
                            className='text-area'
                            placeholder='Add a note for your expense (optional)'
                            value={this.state.note}
                            onChange={this.onNoteChange}
                        ></textarea>
                    </div>
                    <div>
                        <button className='button'>
                            Save Expense
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ExpenseForm;