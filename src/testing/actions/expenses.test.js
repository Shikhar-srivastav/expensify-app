import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    startAddExpense,
    addExpense,
    editExpense,
    startEditExpense,
    removeExpense,
    startRemoveExpense,
    setExpenses,
    startSetExpenses
} from '../../actions/expenses';
import { getDatabase, ref, get, set, child } from 'firebase/database';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]); 
const uid = 'TestUser';

beforeEach((done) => {
    const data = {};
    expenses.forEach(({ _id, description, note, amount, createdAt }) => {
        data[_id] = { description, note, amount, createdAt };
    });
    set(ref(getDatabase(), `users/${uid}/expenses`), data).then(() => done());
});

test('Set up removeExpense action object', () => {
    const action = removeExpense('123abc');
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        _id: '123abc'
    });
});

test('Remove expense from database & store', (done) => {
    const store = createMockStore({ auth: { uid } });
    store.dispatch(startRemoveExpense('1')).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            _id: '1'
        });
        const dbRef = ref(getDatabase());
        return get(child(dbRef, `users/${uid}/expenses`));
    }).then((snapshot) => {
        const expensesData = [];
        snapshot.forEach(expense => {
            expensesData.push({
                _id: expense.key,
                ...expense.val()
            });;
        });
        expect(expensesData).toEqual([
            expenses[1],
            expenses[2]
        ]);
        done();
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

test('Update the given expense in database and store', (done) => {
    const store = createMockStore({ auth: { uid } });
    const updates = {
        note: 'smth'
    };
    const { description, amount, note, createdAt } = expenses[0];
    const afterUpdate = {
        description,
        amount,
        note,
        createdAt,
        ...updates
    };
    store.dispatch(startEditExpense('1', afterUpdate)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            _id: '1',
            updates: afterUpdate
        });
        const dbRef = ref(getDatabase());
        return get(child(dbRef, `users/${uid}/expenses/1`));
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(afterUpdate);
        done();
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
    const store = createMockStore({ auth: { uid } });
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
        get(child(dbRef, `users/${uid}/expenses/${actions[0].expense._id}`)).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
    });
});

test('Add expense with default values to database and store', (done) => {
    const store = createMockStore({ auth: { uid } });
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
        get(child(dbRef, `users/${uid}/expenses/${actions[0].expense._id}`)).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
    });
});

test('Setup setExpenses action object', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('Fetch expenses from database', (done) => {
    const store = createMockStore({ auth: { uid } });
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});