// ========================================
// Onboarding.js — Выбор сфер
// ========================================

function Onboarding({ selectedCategories, toggleCategory, setPage, setCurrentCategory }) {
    return (
        <div className="screen-pad" style={{ paddingTop: '28px' }}>
            <h2 style={{ fontSize: '19px' }}>Что ты хочешь изменить?</h2>
            <p style={{ color: '#6e6e6e', fontSize: '12px', marginTop: '4px' }}>Можно выбрать несколько</p>
            <div className="category-grid" style={{ marginTop: '16px' }}>
                {Object.entries(categoriesData).map(([key, cat]) => (
                    <div
                        key={key}
                        onClick={() => toggleCategory(key)}
                        className={`goal-chip ${selectedCategories.includes(key) ? 'picked' : ''}`}
                        style={{ cursor: 'pointer', padding: '12px 16px', textAlign: 'center' }}
                    >
                        {cat.label}
                    </div>
                ))}
            </div>
            <button
                className="btn btn-primary"
                style={{ marginTop: '20px' }}
                onClick={() => {
                    if (selectedCategories.length > 0) {
                        setCurrentCategory(selectedCategories[0]);
                        setPage('cat-detail');
                    }
                }}
                disabled={selectedCategories.length === 0}
            >
                Далее: выбери привычки
            </button>
        </div>
    );
}