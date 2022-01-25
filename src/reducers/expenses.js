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
            return state.map(expense => {
                if (expense._id === action._id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                }
            });
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
};

export default expensesReducer;