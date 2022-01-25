import { v4 as uuidv4 } from 'uuid';
import { app } from '../firebase/firebase';
import { getDatabase, ref, push, set, get, child, update } from 'firebase/database';

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

export const startRemoveExpense = (_id) => {
    return (dispatch) => {
        const database = getDatabase();
        return set(
            ref(database, `expenses/${_id}`),
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
    return (dispatch) => {
        const database = getDatabase();
        const updateData = {};
        updateData['expenses/' + _id] = updates;
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
    return (dispatch) => {
        const database = getDatabase();
        const dbRef = ref(database)
        return get(child(dbRef, 'expenses')).then((snapshot) => {
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