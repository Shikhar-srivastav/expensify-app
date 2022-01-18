import moment from 'moment';

const dummyExpenses = [{
    _id: '1',
    description: 'Gum',
    note: '',
    amount: 10,
    createdAt: 0
}, {
    _id: '2',
    description: 'Credit Card',
    note: '',
    amount: 3000,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    _id: '3',
    description: 'Rent',
    note: '',
    amount: 10500,
    createdAt: moment(0).add(4, 'days').valueOf()
}];

export default dummyExpenses;