import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseFilters } from '../../components/ExpenseFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilterSpy, sortByDateSpy, sortByAmountSpy, setStartDateSpy, setEndDateSpy, wrapper;

beforeEach(() => {
    setTextFilterSpy = jest.fn();
    sortByDateSpy = jest.fn();
    sortByAmountSpy = jest.fn();
    setStartDateSpy = jest.fn();
    setEndDateSpy = jest.fn();
    wrapper = shallow(
        <ExpenseFilters
            filters={filters}
            setTextFilter={setTextFilterSpy}
            sortByDate={sortByDateSpy}
            sortByAmount={sortByAmountSpy}
            setStartDate={setStartDateSpy}
            setEndDate={setEndDateSpy}
        />
    );
});

test('Render ExpenseFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Render ExpenseFilters with alt data', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('Handle setTextFilter', () => {
    wrapper.find('input').simulate('change', {
        target: { value: 'rent' }
    });
    expect(setTextFilterSpy).toHaveBeenLastCalledWith('rent'); 
});

test('Handle sortBy with both options', () => {
    wrapper.find('select').simulate('change', {
        target: { value: 'amount' }
    });
    expect(sortByAmountSpy).toHaveBeenCalled();
    wrapper.find('select').simulate('change', {
        target: { value: 'date' }
    });
    expect(sortByDateSpy).toHaveBeenCalled();
});

test('Handle date change', () => {
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({
        startDate: altFilters.startDate,
        endDate: altFilters.endDate
    });
    expect(setStartDateSpy).toHaveBeenLastCalledWith(altFilters.startDate);
    expect(setEndDateSpy).toHaveBeenLastCalledWith(altFilters.endDate);
});

test('Handle focus change method', () => {
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')('startDate');
    expect(wrapper.state('calendarFocused')).toBe('startDate');
});