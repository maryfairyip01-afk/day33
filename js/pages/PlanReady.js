// ========================================
// PlanReady.js — Программа готова
// ========================================

function PlanReady({ selectedHabits, setPage }) {
    const habitsList = [];
    Object.entries(selectedHabits).forEach(([cat, habits]) => {
        habits.forEach(h => {
            const catLabel = categoriesData[cat]?.label || cat;
            habitsList.push({ category: catLabel, habit: h });
        });
    });

    return (
        <div className="screen-pad" style={{ paddingTop: '50px', textAlign: 'center' }}>
            <div className="script" style={{ fontSize: '40px', color: '#3b3b3b' }}>готово</div>
            <h2 style={{ fontSize: '19px', marginTop: '10px' }}>Твоя программа собрана</h2>
            <p style={{ color: '#6e6e6e', fontSize: '13px', marginTop: '8px', maxWidth: '280px', marginLeft: 'auto', marginRight: 'auto' }}>
                35 дней с твоими собственными привычками
            </p>
            <div style={{ textAlign: 'left', marginTop: '24px' }}>
                {habitsList.map((item, idx) => (
                    <div key={idx} className="plan-item">
                        <div className="num">{idx + 1}</div>
                        <span>{item.habit}</span>
                        <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#6e6e6e', opacity: 0.6 }}>{item.category}</span>
                    </div>
                ))}
                {habitsList.length === 0 && (
                    <p style={{ color: '#6e6e6e', textAlign: 'center' }}>Выбери хотя бы одну привычку</p>
                )}
            </div>
            <button
                className="btn btn-primary"
                style={{ marginTop: '22px' }}
                onClick={() => setPage('planinfo')}
            >
                Как это работает
            </button>
        </div>
    );
}