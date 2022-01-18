import { v4 as uuidv4 } from 'uuid';

export const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        _id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
});

export const removeExpense = (_id) => ({
    type: 'REMOVE_EXPENSE',
    _id
});

export const editExpense = (_id, updates) => ({
    type: 'EDIT_EXPENSE',
    _id,
    updates
});