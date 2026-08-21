// ========================================
// storage.js — Работа с localStorage
// ========================================

const STORAGE_KEY = 'day33_data';

function loadData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch {}
    // Используем глобальную переменную defaultData
    return window.defaultData || {
        user: { name: 'Арина', startDate: '2026-07-20' },
        habits: [],
        journal: [],
        goals: [],
        wellness: { sleep: 0, water: 0, steps: 0, energy: 0 },
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
}

function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Делаем функции доступными глобально
window.loadData = loadData;
window.saveData = saveData;