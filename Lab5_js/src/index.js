import { generateId } from './utils.js';
import { addTransactionToArray, deleteTransactionFromArray, calculateTotal } from './transactions.js';
import { renderTransactionRow, updateBalanceUI, showTransactionDetails, hideTransactionDetails } from './ui.js';

const form = document.getElementById('transaction-form');
const formError = document.getElementById('form-error');
const table = document.getElementById('transactions-table');



// Добавление транзакции и валидация формы
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Отменяем перезагрузку страницы

    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const descriptionInput = document.getElementById('description');

    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value.trim();
    const description = descriptionInput.value.trim();

    // Валидация
    if (isNaN(amount) || amount === 0) {
        formError.textContent = 'Ошибка: Сумма не должна быть равна нулю!';
        return;
    }
    if (!category || !description) {
        formError.textContent = 'Ошибка: Заполните все поля!';
        return;
    }

    formError.textContent = ''; // Очищаем ошибку, если всё ок

    //Создание объекта транзакции
    const newTransaction = {
        id: generateId(),
        date: new Date(),
        amount: amount,
        category: category,
        description: description
    };

    // Вызовы функций
    addTransactionToArray(newTransaction);
    renderTransactionRow(newTransaction);
    
    // Шаг 6. Пересчет суммы
    const total = calculateTotal();
    updateBalanceUI(total);

    form.reset(); // Очищаем поля формы
});

// Делегирование событий на таблицу <table>
table.addEventListener('click', (e) => {
    // 1. Проверяем, нажали ли на кнопку удаления (Шаг 5)
    if (e.target.classList.contains('delete-btn')) {
        e.stopPropagation(); // Чтобы клик не засчитался как клик по строке для Шага 7
        
        const idToDelete = e.target.dataset.id;
        
        // Удаляем из массива и из DOM
        deleteTransactionFromArray(idToDelete);
        const row = e.target.closest('tr');
        row.remove();

        // Пересчитываем баланс
        updateBalanceUI(calculateTotal());
        hideTransactionDetails();
        return;
    }

    //  Проверяем, нажали ли на саму строку (Шаг 7), исключая заголовки th
    const clickedRow = e.target.closest('tr');
    if (clickedRow && clickedRow.closest('tbody')) {
        const transactionId = clickedRow.dataset.id;
        showTransactionDetails(transactionId);
    }
});