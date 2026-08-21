// ========================================
// Profile.js — Профиль и настройки
// ========================================

function Profile({ data, setData }) {
    const [isEditing, setIsEditing] = React.useState(false);
    const [tempName, setTempName] = React.useState(data.user?.name || '');

    const handleSaveName = () => {
        if (tempName.trim()) {
            setData(prev => ({
                ...prev,
                user: { ...prev.user, name: tempName.trim() }
            }));
            setIsEditing(false);
        }
    };

    const handleResetProgress = () => {
        if (confirm('Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя отменить.')) {
            setData(prev => ({
                ...prev,
                habits: prev.habits.map(h => ({ ...h, completions: [] })),
                journal: [],
                currentDay: 1,
                goals: prev.goals.map(g => ({ ...g, progress: 0 })),
                reflections: []
            }));
        }
    };

    const totalHabits = data.habits?.length || 0;
    const completedHabits = data.habits?.filter(h => h.completions?.length > 0).length || 0;
    const totalJournalEntries = data.journal?.length || 0;
    const currentStreak = data.habits?.reduce((max, h) => {
        const streak = getStreak(h.completions || []);
        return Math.max(max, streak);
    }, 0) || 0;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-serif font-medium text-[#3b3b3b]">Profile</h2>

            <div className="card p-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#eccacb] flex items-center justify-center text-2xl font-serif text-[#3b3b3b]">
                        {data.user?.name?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1">
                        {isEditing ? (
                            <div className="flex gap-2">
                                <input
                                    className="input-soft py-1 px-3 text-sm flex-1"
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                    onKeyPress={(e) => { if (e.key === 'Enter') handleSaveName(); }}
                                    autoFocus
                                />
                                <button className="btn btn-primary text-sm" onClick={handleSaveName}>
                                    Сохранить
                                </button>
                                <button
                                    className="btn btn-outline text-sm"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setTempName(data.user?.name || '');
                                    }}
                                >
                                    Отмена
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <h3 className="text-xl font-serif text-[#3b3b3b]">{data.user?.name || 'Пользователь'}</h3>
                                <button
                                    className="text-xs text-[#6e6e6e] hover:text-[#3b3b3b] transition"
                                    onClick={() => setIsEditing(true)}
                                >
                                    ✏️ Редактировать
                                </button>
                            </div>
                        )}
                        <p className="text-sm text-[#6e6e6e]">
                            В DAY 33 с {data.user?.startDate ? new Date(data.user.startDate).toLocaleDateString('ru-RU') : 'недавнего времени'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card p-4 text-center">
                    <div className="text-2xl font-serif text-[#3b3b3b]">{data.currentDay || 1}</div>
                    <div className="text-xs text-[#6e6e6e]">Текущий день</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-2xl font-serif text-[#3b3b3b]">{totalHabits}</div>
                    <div className="text-xs text-[#6e6e6e]">Всего привычек</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-2xl font-serif text-[#3b3b3b]">{completedHabits}</div>
                    <div className="text-xs text-[#6e6e6e]">Активных привычек</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-2xl font-serif text-[#3b3b3b]">{totalJournalEntries}</div>
                    <div className="text-xs text-[#6e6e6e]">Записей в дневнике</div>
                </div>
            </div>

            <div className="card p-6">
                <h3 className="font-serif text-lg mb-4 text-[#3b3b3b]">Настройки</h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-[#ececec]">
                        <div>
                            <p className="text-sm font-medium text-[#3b3b3b]">Тёмная тема</p>
                            <p className="text-xs text-[#6e6e6e]">Скоро будет доступно</p>
                        </div>
                        <div className="w-10 h-5 rounded-full bg-[#ececec] relative">
                            <div className="w-4 h-4 rounded-full bg-[#3b3b3b] absolute top-0.5 left-0.5"></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-[#ececec]">
                        <div>
                            <p className="text-sm font-medium text-[#3b3b3b]">Уведомления</p>
                            <p className="text-xs text-[#6e6e6e]">Напоминания о привычках</p>
                        </div>
                        <div className="w-10 h-5 rounded-full bg-[#eccacb] relative">
                            <div className="w-4 h-4 rounded-full bg-[#3b3b3b] absolute top-0.5 right-0.5"></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-[#ececec]">
                        <div>
                            <p className="text-sm font-medium text-[#3b3b3b]">Язык</p>
                            <p className="text-xs text-[#6e6e6e]">Русский</p>
                        </div>
                        <span className="text-sm text-[#6e6e6e]">🇷🇺</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <div>
                            <p className="text-sm font-medium text-[#3b3b3b]">Версия</p>
                            <p className="text-xs text-[#6e6e6e]">DAY 33 v1.0</p>
                        </div>
                        <span className="text-xs text-[#6e6e6e]">1.0.0</span>
                    </div>
                </div>
            </div>

            <div className="card p-6 border border-red-200">
                <h3 className="font-serif text-lg mb-4 text-red-600">Опасная зона</h3>
                <p className="text-sm text-[#6e6e6e] mb-4">
                    Сброс всего прогресса удалит все ваши привычки, записи в дневнике и обнулит прогресс. Это действие нельзя отменить.
                </p>
                <button
                    className="btn btn-primary text-sm"
                    style={{ background: '#dc2626', borderColor: '#dc2626', color: 'white' }}
                    onClick={handleResetProgress}
                >
                    Сбросить весь прогресс
                </button>
            </div>
        </div>
    );
}