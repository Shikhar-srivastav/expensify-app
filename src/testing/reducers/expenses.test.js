import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import dummyExpenses from '../fixtures/expenses';

test('Set expenses default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('Remove expense by id', () => {
    const state = expensesReducer(dummyExpenses, {
        type: 'REMOVE_EXPENSE',
        _id: '1'
    });
    expect(state).toEqual([
        dummyExpenses[1],
        dummyExpenses[2]
    ]);
});

test('Remove expense by invalid id', () => {
    const state = expensesReducer(dummyExpenses, {
        type: 'REMOVE_EXPENSE',
        _id: ''
    });
    expect(state).toEqual(dummyExpenses);
});

test('Add new expense', () => {
    const expense = {
        description: 'Jan Rent',
        note: '',
        amount: 5000,
        createdAt: moment().valueOf()
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(dummyExpenses, action);
    expect(state).toEqual([
        ...dummyExpenses,
        expense
    ]);
});

test('Edit an expense by id', () => {
    const updates = {
        description: 'Jan Rent',
        note: '',
        amount: 5000,
        createdAt: moment().valueOf()
    };
    const action = {
        type: 'EDIT_EXPENSE',
        _id: '3',
        updates
    }
    const state = expensesReducer(dummyExpenses, action);
    expect(state[2]).toEqual({
        _id: '3',
        ...updates
    });
});

test('Edit an expense by invalid id', () => {
    const updates = {
        description: 'Jan Rent',
        note: '',
        amount: 5000,
        createdAt: moment().valueOf()
    };
    const action = {
        type: 'EDIT_EXPENSE',
        _id: '',
        updates
    }
    const state = expensesReducer(dummyExpenses, action);
    expect(state).toEqual(dummyExpenses);
});