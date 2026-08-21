// ========================================
// defaultData.js — Начальные данные пользователя
// ========================================

const defaultData = {
    user: {
        name: 'Арина',
        startDate: '2026-07-20'
    },
    habits: [
        { id: 'h1', name: 'Пить воду', category: 'body', completions: [] },
        { id: 'h2', name: 'Чтение 10 страниц', category: 'mind', completions: [] },
        { id: 'h3', name: 'Прогулка 30 минут', category: 'body', completions: [] },
        { id: 'h4', name: 'Дневник', category: 'self', completions: [] },
        { id: 'h5', name: 'Тренировка', category: 'body', completions: [] },
    ],
    journal: [],
    goals: [
        { id: 'g1', title: 'Прочитать 12 книг', progress: 0 },
        { id: 'g2', title: 'Утренняя йога', progress: 0 },
    ],
    wellness: {
        sleep: 0,
        water: 0,
        steps: 0,
        energy: 0
    },
    currentDay: 1,
    totalDays: 75,
    focus: '',
    mood: 'good',
    quote: 'Маленькие шаги всё равно считаются.',
    reflections: [],
    selectedCategories: [],
    selectedHabits: {},
    planReady: false
};

window.defaultData = defaultData;