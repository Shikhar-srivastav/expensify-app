import { v4 as uuidv4 } from 'uuid';
import { app } from '../firebase/firebase';
import { getDatabase, ref, push, set, get, child, update } from 'firebase/database';

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense,
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        const database = getDatabase(app);
        const path = `users/${uid}/expenses`;
        const newExpenseRef = push(ref(database, path));
        const expense = {
            description,
            note,
            amount,
            createdAt
        };
        return set(newExpenseRef, expense).then(() => {
            dispatch(addExpense({
                _id: newExpenseRef.key,
                ...expense
            }));
        });
    };
};

export const removeExpense = (_id) => ({
    type: 'REMOVE_EXPENSE',
    _id
});

export const startRemoveExpense = (_id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const database = getDatabase();
        const path = `users/${uid}/expenses/${_id}`
        return set(
            ref(database, path),
            null
        ).then(() => {
            dispatch(removeExpense(_id));
        });
    };
};

export const editExpense = (_id, updates) => ({
    type: 'EDIT_EXPENSE',
    _id,
    updates
});

export const startEditExpense = (_id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const database = getDatabase();
        const path = `users/${uid}/expenses/${_id}`;
        const updateData = {};
        updateData[path] = updates;
        return update(ref(database), updateData).then(() => {
            dispatch(editExpense(_id, updates));
        });
    };  
};

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
})

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const database = getDatabase();
        const dbRef = ref(database);
        const path = `users/${uid}/expenses`
        return get(child(dbRef, path)).then((snapshot) => {
            const expenses = [];
            snapshot.forEach(expense => {
                expenses.push({
                    _id: expense.key,
                    ...expense.val()
                });
            });
            dispatch(setExpenses(expenses));
        });
    };
};