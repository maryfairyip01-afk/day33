// ========================================
// Landing.js — Главный экран
// ========================================

function Landing({ setPage }) {
    const [currentDay, setCurrentDay] = React.useState(() => {
        const saved = localStorage.getItem('day33_currentDay');
        return saved ? parseInt(saved) : 1;
    });

    const [todayAffirmation, setTodayAffirmation] = React.useState('');

    // Массив аффирмаций
    const affirmations = [
        "I am becoming the person I want to be.",
        "Every day I grow stronger and wiser.",
        "I am worthy of my dreams.",
        "Small steps lead to big changes.",
        "I choose progress over perfection.",
        "I am capable of amazing things.",
        "Today I am closer to my goals.",
        "I trust my journey.",
        "I am enough, just as I am.",
        "My potential is limitless.",
        "I embrace change with an open heart.",
        "I am proud of who I am becoming.",
        "Every day is a new beginning.",
        "I have the power to create my life.",
        "I am resilient and strong.",
        "My future is bright and full of possibilities.",
        "I believe in myself.",
        "I am constantly evolving.",
        "I deserve happiness and success.",
        "I am in charge of my own happiness."
    ];

    // Выбор аффирмации по дню
    React.useEffect(() => {
        const today = new Date().toDateString();
        const savedDate = localStorage.getItem('day33_affirmation_date');
        const savedAffirmation = localStorage.getItem('day33_affirmation');

        if (savedDate === today && savedAffirmation) {
            setTodayAffirmation(savedAffirmation);
        } else {
            const dayIndex = (currentDay - 1) % affirmations.length;
            const affirmation = affirmations[dayIndex];
            setTodayAffirmation(affirmation);
            localStorage.setItem('day33_affirmation', affirmation);
            localStorage.setItem('day33_affirmation_date', today);
        }
    }, [currentDay]);

    // Сохраняем день при изменении
    React.useEffect(() => {
        localStorage.setItem('day33_currentDay', currentDay);
    }, [currentDay]);

    const handleStartDay = () => {
        setPage('dashboard');
    };

    return (
        <div className="landing-container">
            <div className="landing-content">
                {/* Главный заголовок DAY 33 */}
                <h1 className="landing-title">DAY 33</h1>

                {/* Кнопка + индикатор дня */}
                <div className="landing-actions">
                    <button className="btn-start-day" onClick={handleStartDay}>
                        Начать день
                    </button>
                    <div className="day-indicator">
                        <span className="day-label">DAY</span>
                        <span className="day-number">{currentDay}</span>
                    </div>
                </div>

                {/* Аффирмация дня */}
                <div className="affirmation-block">
                    <p className="affirmation-label">Аффирмация дня</p>
                    <p className="affirmation-text">“{todayAffirmation}”</p>
                </div>
            </div>
        </div>
    );
}