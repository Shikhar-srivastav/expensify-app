import getTotalExpenses from '../../selectors/total';
import expenses from '../fixtures/expenses';

test('Return 0 with no expenses', () => {
    const total = getTotalExpenses([]);
    expect(total).toEqual({
        count: 0,
        amount: 0
    });
});

test('Calculation with 1 expense', () => {
    const total = getTotalExpenses([expenses[0]]);
    expect(total).toEqual({
        count: 1,
        amount: expenses[0].amount
    });
});

test('Count sum for all expenses', () => {
    const sumAmount = expenses => {
        let sum = 0;
        expenses.forEach(expense => {
            sum += expense.amount;
        });
        return sum;
    };
    const total = getTotalExpenses(expenses);
    expect(total).toEqual({
        count: expenses.length,
        amount: sumAmount(expenses)
    });
});

