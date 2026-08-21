// ========================================
// CategoryDetail.js — Выбор привычек по категории
// ========================================

function CategoryDetail({
    currentCategory,
    selectedCategories,
    selectedHabits,
    toggleHabitForCategory,
    customHabit,
    setCustomHabit,
    addCustomHabit,
    setPage,
    setCurrentCategory,
    setPlanReady
}) {
    const catKey = currentCategory;
    const cat = categoriesData[catKey];
    if (!cat) return <div>Категория не найдена</div>;

    const selected = selectedHabits[catKey] || [];
    const currentIndex = selectedCategories.indexOf(catKey);
    const isLast = currentIndex === selectedCategories.length - 1;

    return (
        <div className="screen-pad" style={{ paddingTop: '28px' }}>
            <span className="back-link" onClick={() => setPage('onboarding')}>&lsaquo; Назад</span>
            <div className="eyebrow">{cat.label}</div>
            <h2 style={{ fontSize: '19px', marginTop: '6px' }}>Выбери привычки</h2>
            <div style={{ marginTop: '16px' }}>
                {cat.habits.map(habit => (
                    <div
                        key={habit}
                        onClick={() => toggleHabitForCategory(catKey, habit)}
                        className={`habit-option ${selected.includes(habit) ? 'picked' : ''}`}
                    >
                        <div className="habit-radio"></div>
                        {habit}
                    </div>
                ))}
            </div>
            <p style={{ fontSize: '12px', color: '#6e6e6e', marginTop: '14px', marginBottom: '6px' }}>
                Или создай свою привычку
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
                <input
                    className="custom-input"
                    placeholder="Например: йога по вечерам"
                    value={customHabit}
                    onChange={(e) => setCustomHabit(e.target.value)}
                    onKeyPress={(e) => { if (e.key === 'Enter') addCustomHabit(catKey); }}
                    style={{ flex: 1, border: '1px dashed rgba(59,59,59,0.3)', borderRadius: '16px', padding: '12px 14px', fontSize: '13px', color: '#6e6e6e', fontFamily: 'Inter, sans-serif' }}
                />
                <button
                    onClick={() => addCustomHabit(catKey)}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#3b3b3b', color: 'white', border: 'none', fontSize: '18px', cursor: 'pointer' }}
                >+</button>
            </div>
            <button
                className="btn btn-primary"
                style={{ marginTop: '20px' }}
                onClick={() => {
                    const nextIndex = currentIndex + 1;
                    if (nextIndex < selectedCategories.length) {
                        setCurrentCategory(selectedCategories[nextIndex]);
                    } else {
                        setPlanReady(true);
                        setPage('planready');
                    }
                }}
            >
                {!isLast ? 'Далее' : 'Собрать мою программу'}
            </button>
        </div>
    );
}