import { createStore, combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';

const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = undefined
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

const removeExpense = (_id) => ({
    type: 'REMOVE_EXPENSE',
    _id
});

const editExpense = (_id, updates) => ({
    type: 'EDIT_EXPENSE',
    _id,
    updates
});

const expensesDefault = [];

const expensesReducer = (state = expensesDefault, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({ _id }) => (
                _id !== action._id
            ));
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense._id === action._id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
}); 

const filtersDefault = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersDefault, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

const getFilteredExpenses = () => { 
    const data = store.getState();
    const { expenses, filters } = data;
    const { startDate, endDate, sortBy, text } = filters;

    return expenses.filter((
        {
            description,
            note,
            createdAt
        }
    ) => {
        const startDateMatch = typeof startDate !== 'number' || startDate <= createdAt;
        const endDateMatch = typeof endDate !== 'number' || endDate >= createdAt;
        const textMatch = description.toLowerCase().includes((text.toLowerCase()));

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy == 'date') {
            return a.createdAt > b.createdAt ? 1 : -1;
        } else if (sortBy == 'amount') {
            return a.amount > b.amount ? 1 : -1;
        }
    });
};

const unsub = store.subscribe(() => {
    console.log(getFilteredExpenses());
});

const expense1 = store.dispatch(addExpense({ description: 'Rent', amount: 2000, createdAt: 7000 }));

const expense2 = store.dispatch(addExpense({ description: 'Coffee', amount: 50, createdAt: 10000 }));

// store.dispatch(removeExpense(expense1.expense._id));

// store.dispatch(editExpense(expense2.expense._id, { amount: 70 }));

// store.dispatch(setTextFilter('rent'));

// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());

// store.dispatch(sortByDate());

// store.dispatch(setStartDate(20000));

// store.dispatch(setEndDate(0));

// store.dispatch(setStartDate());

// store.dispatch(setEndDate());

unsub();