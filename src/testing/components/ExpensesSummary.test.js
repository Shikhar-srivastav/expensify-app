import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('Render ExpensesSummary correctly', () => {
    const total = {
        count: 2,
        sum: 38478.89
    }
    const wrapper = shallow(<ExpensesSummary total={total} />);
    expect(wrapper).toMatchSnapshot();
});