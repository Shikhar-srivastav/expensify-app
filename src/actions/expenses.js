import { v4 as uuidv4 } from 'uuid';
import { app } from '../firebase/firebase';
import { getDatabase, ref, push, set } from 'firebase/database';

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense,
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        const database = getDatabase(app);
        const newExpenseRef = push(ref(database, 'expenses'));
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

export const editExpense = (_id, updates) => ({
    type: 'EDIT_EXPENSE',
    _id,
    updates
});