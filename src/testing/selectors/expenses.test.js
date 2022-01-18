import moment from 'moment';
import getFilteredExpenses from '../../selectors/expenses';
import dummyExpenses from '../fixtures/expenses';

test('Should filter by text value', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const output = getFilteredExpenses(dummyExpenses, filters);
    expect(output).toEqual([
        dummyExpenses[2],
        dummyExpenses[1]
    ]);
});

test('Should filter by startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(-500),
        endDate: undefined
    };
    const output = getFilteredExpenses(dummyExpenses, filters);
    expect(output).toEqual([
        dummyExpenses[2],
        dummyExpenses[0],
    ]);
});

test('Should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).subtract(2, 'days')
    };
    const output = getFilteredExpenses(dummyExpenses, filters);
    expect(output).toEqual([
        dummyExpenses[1]
    ]);
});

test('Should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const output = getFilteredExpenses(dummyExpenses, filters);
    expect(output).toEqual([
        dummyExpenses[2],
        dummyExpenses[0],
        dummyExpenses[1]
    ]);
});

test('Should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const output = getFilteredExpenses(dummyExpenses, filters);
    expect(output).toEqual([
        dummyExpenses[2],
        dummyExpenses[1],
        dummyExpenses[0]
    ]);
});