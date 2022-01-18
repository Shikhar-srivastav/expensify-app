import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('Set up removeExpense action object', () => {
    const action = removeExpense('123abc');
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        _id: '123abc'
    });
});

test('Set up editExpense action object', () => {
    const action = editExpense('123abc', {
        description: 'Rent',
        amount: 5000
    });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        _id: '123abc',
        updates: {
            description: 'Rent',
            amount: 5000
        }
    });
});

test('Set up addExpense action object', () => {
    const data = {
        description: 'Rent',
        amount: 5000,
        note: 'note',
        createdAt: 1000
    };
    const action = addExpense(data);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            _id: expect.any(String),
            ...data
        }
    });
});

test('Set up addExpense action object default', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            _id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    });
});