// Генерация уникального ID
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Форматирование даты в читаемый вид
export function formatDate(date) {
    return new Date(date).toLocaleString('ru-RU');
}

// Получение первых 4 слов (Шаг 4)
export function getShortDescription(text) {
    const words = text.split(/\s+/); // Разбиваем по пробелам
    if (words.length <= 4) return text;
    return words.slice(0, 4).join(' ') + '...';
}