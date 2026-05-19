import { formatDate, getShortDescription } from './utils.js';
import { transactions } from './transactions.js';

const tableBody = document.getElementById('table-body');
const totalAmountSpan = document.getElementById('total-amount');
const detailsBlock = document.getElementById('details-block');
const detailsContent = document.getElementById('details-content');

// Отрисовка одной транзакции в таблице
export function renderTransactionRow(transaction) {
    const row = document.createElement('tr');
    
    // Сохраняем ID транзакции в дата-атрибут строки (пригодится для удаления и показа деталей)
    row.dataset.id = transaction.id;

    // . Проверка знака суммы для окрашивания строки
    if (transaction.amount > 0) {
        row.classList.add('row-income');
    } else {
        row.classList.add('row-expense');
    }

    row.innerHTML = `
        <td>${formatDate(transaction.date)}</td>
        <td>${transaction.category}</td>
        <td>${getShortDescription(transaction.description)}</td>
        <td>
            <!-- Шаг 5. Кнопка удаления -->
            <button class="delete-btn" data-id="${transaction.id}">Удалить</button>
        </td>
    `;

    tableBody.appendChild(row);
}

// Обновление отображения баланса (Шаг 6)
export function updateBalanceUI(total) {
    totalAmountSpan.textContent = total;
}

// Отображение полного описания
export function showTransactionDetails(id) {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;

    detailsBlock.classList.remove('details-hidden');
    detailsContent.innerHTML = `
        <strong>Дата:</strong> ${formatDate(transaction.date)} <br>
        <strong>Категория:</strong> ${transaction.category} <br>
        <strong>Сумма:</strong> ${transaction.amount} ₽ <br>
        <strong>Полное описание:</strong> ${transaction.description}
    `;
}

// Скрыть блок деталей (если удалили активную транзакцию)
export function hideTransactionDetails() {
    detailsBlock.classList.add('details-hidden');
}