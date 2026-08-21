// ========================================
// app.js — Главный компонент приложения
// ========================================

function App() {
    const [data, setData] = React.useState(() => loadData());
    const [page, setPage] = React.useState('landing');
    const [currentCategory, setCurrentCategory] = React.useState(null);
    const [selectedCategories, setSelectedCategories] = React.useState([]);
    const [selectedHabits, setSelectedHabits] = React.useState({});
    const [customHabit, setCustomHabit] = React.useState('');
    const [planReady, setPlanReady] = React.useState(false);

    React.useEffect(() => {
        saveData(data);
    }, [data]);

    const today = getToday();

    const toggleHabit = (id) => {
        setData(prev => ({
            ...prev,
            habits: prev.habits.map(h => {
                if (h.id !== id) return h;
                const completions = h.completions || [];
                const idx = completions.indexOf(today);
                const updated = idx >= 0 ? completions.filter((_, i) => i !== idx) : [...completions, today];
                return { ...h, completions: updated };
            })
        }));
    };

    const addJournal = (entry) => {
        setData(prev => ({
            ...prev,
            journal: [{ id: Date.now().toString(), date: today, ...entry }, ...prev.journal]
        }));
    };

    const setMood = (m) => {
        setData(prev => ({ ...prev, mood: m }));
    };

    const setFocus = (f) => {
        setData(prev => ({ ...prev, focus: f }));
    };

    const toggleCategory = (catKey) => {
        setSelectedCategories(prev =>
            prev.includes(catKey) ? prev.filter(c => c !== catKey) : [...prev, catKey]
        );
    };

    const toggleHabitForCategory = (catKey, habit) => {
        setSelectedHabits(prev => {
            const current = prev[catKey] || [];
            const updated = current.includes(habit) ? current.filter(h => h !== habit) : [...current, habit];
            return { ...prev, [catKey]: updated };
        });
    };

    const addCustomHabit = (catKey) => {
        if (customHabit.trim()) {
            setSelectedHabits(prev => {
                const current = prev[catKey] || [];
                if (!current.includes(customHabit.trim())) {
                    return { ...prev, [catKey]: [...current, customHabit.trim()] };
                }
                return prev;
            });
            setCustomHabit('');
        }
    };

    const todayHabits = data.habits || [];
    const completedToday = todayHabits.filter(h => h.completions?.includes(today)).length;
    const completionPercent = todayHabits.length ? Math.round((completedToday / todayHabits.length) * 100) : 0;
    const longestStreak = todayHabits.reduce((max, h) => Math.max(max, getStreak(h.completions || [])), 0);
    const journalCount = data.journal?.length || 0;

    const renderPage = () => {
        switch (page) {
            case 'landing':
                return <Landing setPage={setPage} />;
            case 'onboarding':
                return (
                    <Onboarding
                        selectedCategories={selectedCategories}
                        toggleCategory={toggleCategory}
                        setPage={setPage}
                        setCurrentCategory={setCurrentCategory}
                    />
                );
            case 'cat-detail':
                return (
                    <CategoryDetail
                        currentCategory={currentCategory}
                        selectedCategories={selectedCategories}
                        selectedHabits={selectedHabits}
                        toggleHabitForCategory={toggleHabitForCategory}
                        customHabit={customHabit}
                        setCustomHabit={setCustomHabit}
                        addCustomHabit={addCustomHabit}
                        setPage={setPage}
                        setCurrentCategory={setCurrentCategory}
                        setPlanReady={setPlanReady}
                    />
                );
            case 'planready':
                return (
                    <PlanReady
                        selectedHabits={selectedHabits}
                        setPage={setPage}
                    />
                );
            case 'planinfo':
                return <PlanInfo setPage={setPage} />;
            case 'weeks':
                return <Weeks setPage={setPage} />;
            case 'dashboard':
                return (
                    <Dashboard
                        data={data}
                        setData={setData}
                        today={today}
                        toggleHabit={toggleHabit}
                        addJournal={addJournal}
                        setMood={setMood}
                        setFocus={setFocus}
                        todayHabits={todayHabits}
                        completedToday={completedToday}
                        completionPercent={completionPercent}
                        longestStreak={longestStreak}
                        journalCount={journalCount}
                    />
                );
            case 'habits':
                return (
                    <Habits
                        todayHabits={todayHabits}
                        today={today}
                        toggleHabit={toggleHabit}
                        setData={setData}
                    />
                );
            case 'journal':
                return (
                    <Journal
                        data={data}
                        addJournal={addJournal}
                        setMood={setMood}
                    />
                );
            case 'progress':
                return (
                    <Progress
                        data={data}
                        completionPercent={completionPercent}
                        journalCount={journalCount}
                        longestStreak={longestStreak}
                    />
                );
            case 'discover':
                return <Discover />;
            case 'profile':
                return <Profile data={data} setData={setData} />;
            default:
                return <Landing setPage={setPage} />;
        }
    };

    return (
        <div className="page">
            <div className="flex flex-col md:flex-row gap-8">
                <Sidebar page={page} setPage={setPage} />
                <div className="flex-1 min-w-0">
                    {renderPage()}
                </div>
            </div>
            <Navbar page={page} setPage={setPage} />
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);