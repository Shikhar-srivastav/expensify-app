import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('Setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('Set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('Set sortBy to date', () => {
    const filterState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const state = filtersReducer(filterState, { type: 'SORT_BY_DATE' });
    expect(state.sortBy).toBe('date');
});

test('Set the value of text in filter', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_TEXT_FILTER',
        text: 'rent'
    });
    expect(state.text).toBe('rent');
});

test('Set the value of startDate in filter', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_START_DATE',
        startDate: undefined
    });
    expect(state.startDate).toBe(undefined);
});

test('Set the value of endDate in filter', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_END_DATE',
        endDate: undefined
    });
    expect(state.endDate).toBe(undefined);
});