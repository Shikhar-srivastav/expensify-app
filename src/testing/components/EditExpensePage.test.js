import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpenseSpy, removeExpenseSpy, navigateSpy, wrapper;

beforeEach(() => {
    editExpenseSpy = jest.fn();
    removeExpenseSpy = jest.fn();
    navigateSpy = jest.fn();
    wrapper = shallow(
        <EditExpensePage
            expenses={expenses}
            editExpense={editExpenseSpy}
            removeExpense={removeExpenseSpy}
            navigate={navigateSpy}
            params={{ _id: expenses[0]._id }}
        />
    );
});

test('Render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Handle editExpense and navigate', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(editExpenseSpy).toHaveBeenLastCalledWith(
        expenses[0]._id,
        expenses[0]
    );
    expect(navigateSpy).toHaveBeenLastCalledWith('/dashboard');
});

test('Handle removeExpense and navigate', () => {
    wrapper.find('button').simulate('click');
    expect(removeExpenseSpy).toHaveBeenLastCalledWith(
        expenses[0]._id
    );
    expect(navigateSpy).toHaveBeenLastCalledWith('/dashboard');
});