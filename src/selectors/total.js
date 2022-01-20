const getTotalExpenses = (expenses) => {
    const total = {
        count: expenses.length,
        amount: 0
    };
    expenses.map((expense) => {
        total.amount += expense.amount;
        return expense;
    });
    return total;
};

export default getTotalExpenses;