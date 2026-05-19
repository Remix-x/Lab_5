// Массив транзакций
export let transactions = [];

export function addTransactionToArray(transaction) {
    transactions.push(transaction);
}

export function deleteTransactionFromArray(id) {
    transactions = transactions.filter(t => t.id !== id);
}

// Шаг 6. Подсчет общей суммы транзакций
export function calculateTotal() {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
}