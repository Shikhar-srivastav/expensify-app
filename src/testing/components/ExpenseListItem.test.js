import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test('Should render ExpenseList Item', () => {
    const expense = expenses[0];
    const wrapper = shallow(
        <ExpenseListItem
            key={expense._id}
            {...expense}
        />
    );
    expect(wrapper).toMatchSnapshot();
});