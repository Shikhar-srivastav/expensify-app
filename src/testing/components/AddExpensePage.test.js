import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let addExpenseSpy, navigateSpy, wrapper;

beforeEach(() => {
    addExpenseSpy = jest.fn();
    navigateSpy = jest.fn();
    wrapper = shallow(
        <AddExpensePage
            startAddExpense={addExpenseSpy}
            navigate={navigateSpy}
        />
    );
});

test('Render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Handle onSubmit and navigate', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(navigateSpy).toHaveBeenLastCalledWith('/');
    expect(addExpenseSpy).toHaveBeenLastCalledWith(expenses[0]);
});