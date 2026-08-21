// ========================================
// Progress.js — Прогресс с графиком
// ========================================

function Progress({ data, completionPercent, journalCount, longestStreak }) {
    const [chartData, setChartData] = React.useState([]);

    React.useEffect(() => {
        // Генерируем данные для графика из выполненных привычек
        const habits = data.habits || [];
        const allDates = [];
        
        habits.forEach(habit => {
            (habit.completions || []).forEach(date => {
                if (!allDates.includes(date)) {
                    allDates.push(date);
                }
            });
        });

        allDates.sort();

        const chartPoints = allDates.map((date, index) => {
            const dayNumber = index + 1;
            // Считаем процент выполненных привычек в этот день
            const totalHabits = habits.length;
            const completedOnDay = habits.filter(h => 
                (h.completions || []).includes(date)
            ).length;
            const percent = totalHabits > 0 ? Math.round((completedOnDay / totalHabits) * 100) : 0;
            return { day: dayNumber, date, percent, label: `День ${dayNumber}` };
        });

        setChartData(chartPoints);
    }, [data]);

    const hasData = chartData.length > 0;

    return (
        <div className="progress-container">
            <h2 className="page-title">Progress</h2>

            {/* Карточка статистики */}
            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-value">{data.currentDay || 1}</span>
                    <span className="stat-label">Дней</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{completionPercent}%</span>
                    <span className="stat-label">Выполнено</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{journalCount}</span>
                    <span className="stat-label">Записей</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{longestStreak}</span>
                    <span className="stat-label">Дней подряд</span>
                </div>
            </div>

            {/* График прогресса */}
            <div className="chart-card">
                <h3 className="chart-title">Прогресс по дням</h3>
                
                {hasData ? (
                    <div className="chart-container">
                        <svg className="chart-svg" viewBox="0 0 100 60" preserveAspectRatio="none">
                            {/* Оси */}
                            <line x1="5" y1="55" x2="95" y2="55" stroke="#ececec" strokeWidth="1" />
                            <line x1="5" y1="5" x2="5" y2="55" stroke="#ececec" strokeWidth="1" />

                            {/* Линия графика */}
                            <polyline
                                points={chartData.map((p, i) => {
                                    const x = 5 + (i / (chartData.length - 1 || 1)) * 90;
                                    const y = 55 - (p.percent / 100) * 45;
                                    return `${x},${y}`;
                                }).join(' ')}
                                fill="none"
                                stroke="#eccacb"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Точки */}
                            {chartData.map((p, i) => {
                                const x = 5 + (i / (chartData.length - 1 || 1)) * 90;
                                const y = 55 - (p.percent / 100) * 45;
                                const isLast = i === chartData.length - 1;
                                return (
                                    <circle
                                        key={i}
                                        cx={x}
                                        cy={y}
                                        r={isLast ? 3 : 2}
                                        fill={isLast ? '#eccacb' : '#3b3b3b'}
                                        stroke="#fff"
                                        strokeWidth="1"
                                    />
                                );
                            })}

                            {/* Подписи на оси X */}
                            {chartData.filter((_, i) => i % Math.max(1, Math.floor(chartData.length / 6)) === 0).map((p, i) => {
                                const x = 5 + (i / (chartData.length - 1 || 1)) * 90;
                                return (
                                    <text key={i} x={x} y="60" fontSize="3" fill="#6e6e6e" textAnchor="middle">
                                        {p.label}
                                    </text>
                                );
                            })}
                        </svg>
                    </div>
                ) : (
                    <div className="chart-empty">
                        <p>Начни выполнять привычки, чтобы здесь появился твой прогресс</p>
                    </div>
                )}
            </div>

            {/* 75-дневный путь */}
            <div className="journey-card">
                <h3 className="journey-title">75-дневный путь</h3>
                <div className="journey-grid">
                    {Array.from({ length: 75 }, (_, i) => {
                        const day = i + 1;
                        const isCurrent = day === (data.currentDay || 1);
                        const isCompleted = day <= (data.currentDay || 1);
                        return (
                            <div
                                key={i}
                                className={`journey-dot ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                                title={`День ${day}`}
                            ></div>
                        );
                    })}
                </div>
                <p className="journey-text">День {data.currentDay || 1} из 75</p>
            </div>

            {/* Цели */}
            <div className="goals-card">
                <h3 className="goals-title">Цели</h3>
                {(data.goals || []).map(g => (
                    <div key={g.id} className="goal-item">
                        <span className="goal-name">{g.title}</span>
                        <div className="goal-progress">
                            <div className="goal-progress-bar">
                                <div className="goal-progress-fill" style={{ width: `${g.progress || 0}%` }}></div>
                            </div>
                            <span className="goal-percent">{g.progress || 0}%</span>
                        </div>
                    </div>
                ))}
                {(!data.goals || data.goals.length === 0) && (
                    <p className="no-goals">Нет целей. Добавь первую!</p>
                )}
            </div>
        </div>
    );
}