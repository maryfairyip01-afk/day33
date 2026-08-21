// ========================================
// Weeks.js — Подробный план по неделям
// ========================================

function Weeks({ setPage }) {
    const [openWeek, setOpenWeek] = React.useState(2);

    const toggleWeek = (weekNum) => {
        setOpenWeek(openWeek === weekNum ? null : weekNum);
    };

    return (
        <div className="screen-pad" style={{ paddingTop: '28px' }}>
            <span className="back-link" onClick={() => setPage('planinfo')}>&lsaquo; Назад</span>
            <div className="eyebrow">ТВОЙ ПУТЬ ПО НЕДЕЛЯМ</div>
            <h2 style={{ fontSize: '19px', marginTop: '8px' }}>5 этапов формирования привычки</h2>

            {weeksData.map((week, index) => {
                const weekNum = index + 1;
                const isCurrent = weekNum === 2;
                const isDone = weekNum < 2;
                const isOpen = openWeek === weekNum;

                return (
                    <div key={weekNum} className={`week-block ${isCurrent ? 'current' : ''} ${isDone ? 'done' : ''}`}>
                        <div className="week-head" onClick={() => toggleWeek(weekNum)}>
                            <div className={`week-num ${isCurrent ? 'current' : ''} ${isDone ? 'done' : ''}`}>
                                {isDone ? '✓' : weekNum}
                            </div>
                            <div>
                                <p className="week-title">Неделя {weekNum}</p>
                                <p className="week-sub">{week.title}</p>
                            </div>
                            {isDone && <span className="week-status">Пройдено</span>}
                            <span className="week-arrow" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
                        </div>
                        <div className={`week-body ${isOpen ? 'open' : ''}`}>
                            <p className="week-field-label">Цель мозга</p>
                            <p className="week-field-text">{week.goal}</p>
                            <p className="week-field-label">Критерий успеха</p>
                            <p className="week-field-text">{week.success}</p>
                        </div>
                    </div>
                );
            })}

            <button
                className="btn btn-primary"
                style={{ marginTop: '8px' }}
                onClick={() => setPage('dashboard')}
            >
                Перейти к дню 1
            </button>
        </div>
    );
}