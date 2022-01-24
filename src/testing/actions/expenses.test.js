import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    startAddExpense,
    addExpense,
    editExpense,
    removeExpense
} from '../../actions/expenses';
import { getDatabase, ref, get, child } from 'firebase/database';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]); 

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
    const action = addExpense(expenses[0]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[0]
    });
});

test('Add expense to database and store', (done) => {
    const store = createMockStore({});
    const { description, note, amount, createdAt } = expenses[0];
    const expenseData = {
        description,
        note,
        amount,
        createdAt
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                _id: expect.any(String),
                ...expenseData
            }
        });
        const dbRef = ref(getDatabase());
        get(child(dbRef, `expenses/${actions[0].expense._id}`)).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
    });
});

test('Add expense with default values to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };
    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                _id: expect.any(String),
                ...expenseData
            }
        });
        const dbRef = ref(getDatabase());
        get(child(dbRef, `expenses/${actions[0].expense._id}`)).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
    });
});

// test('Set up addExpense action object default', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             _id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     });
// });