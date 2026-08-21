// ========================================
// helpers.js — Вспомогательные функции
// ========================================

function getToday() {
    return new Date().toISOString().split('T')[0];
}

function getStreak(completions) {
    if (!completions || !completions.length) return 0;
    const sorted = [...completions].sort().reverse();
    let streak = 0;
    let date = new Date();
    for (let i = 0; i < sorted.length; i++) {
        const d = new Date(sorted[i]);
        if (d.toDateString() === date.toDateString()) {
            streak++;
            date.setDate(date.getDate() - 1);
        } else break;
    }
    return streak;
}

function getSelectedHabitsList(selectedHabits) {
    const list = [];
    Object.entries(selectedHabits).forEach(([cat, habits]) => {
        habits.forEach(h => {
            const catLabel = window.categoriesData && window.categoriesData[cat]
                ? window.categoriesData[cat].label
                : cat;
            list.push({ category: catLabel, habit: h });
        });
    });
    return list;
}

// Получить текущий день пользователя
function getCurrentDay() {
    const saved = localStorage.getItem('day33_currentDay');
    return saved ? parseInt(saved) : 1;
}

// Получить текущую неделю
function getCurrentWeek(day) {
    return Math.ceil(day / 7);
}

// Получить прогресс недели
function getWeekProgress(day) {
    const week = getCurrentWeek(day);
    const daysInWeek = Math.min(day - (week - 1) * 7, 7);
    return Math.round((daysInWeek / 7) * 100);
}

// Получить аффирмацию по дню
function getAffirmationForDay(day, affirmations) {
    if (!affirmations || !affirmations.length) return 'Small steps still count.';
    const index = (day - 1) % affirmations.length;
    return affirmations[index];
}

// Делаем функции доступными глобально
window.getToday = getToday;
window.getStreak = getStreak;
window.getSelectedHabitsList = getSelectedHabitsList;
window.getCurrentDay = getCurrentDay;
window.getCurrentWeek = getCurrentWeek;
window.getWeekProgress = getWeekProgress;
window.getAffirmationForDay = getAffirmationForDay;