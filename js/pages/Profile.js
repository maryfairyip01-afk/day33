// ========================================
// Profile.js — Профиль с карточками
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

    const totalHabits = data.habits?.length || 0;
    const completedHabits = data.habits?.filter(h => h.completions?.length > 0).length || 0;
    const totalJournalEntries = data.journal?.length || 0;
    const currentDay = data.currentDay || 1;

    return (
        <div className="profile-container">
            <h2 className="page-title">Profile</h2>

            {/* Карточка пользователя */}
            <div className="profile-user-card">
                <div className="profile-avatar">
                    {data.user?.name?.charAt(0) || '?'}
                </div>
                <div className="profile-user-info">
                    {isEditing ? (
                        <div className="profile-edit">
                            <input
                                className="profile-name-input"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                onKeyPress={(e) => { if (e.key === 'Enter') handleSaveName(); }}
                                autoFocus
                            />
                            <button className="btn-save-name" onClick={handleSaveName}>
                                Сохранить
                            </button>
                            <button
                                className="btn-cancel-edit"
                                onClick={() => {
                                    setIsEditing(false);
                                    setTempName(data.user?.name || '');
                                }}
                            >
                                Отмена
                            </button>
                        </div>
                    ) : (
                        <>
                            <h3 className="profile-name">{data.user?.name || 'Пользователь'}</h3>
                            <p className="profile-since">
                                В DAY 33 с {data.user?.startDate ? new Date(data.user.startDate).toLocaleDateString('ru-RU') : 'недавнего времени'}
                            </p>
                            <button className="btn-edit-profile" onClick={() => setIsEditing(true)}>
                                ✏️ Редактировать
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* 4 информационных блока - ГОРИЗОНТАЛЬНО */}
            <div className="profile-stats-grid">
                <div className="profile-stat-card">
                    <span className="profile-stat-value">{currentDay}</span>
                    <span className="profile-stat-label">Текущий день</span>
                </div>
                <div className="profile-stat-card">
                    <span className="profile-stat-value">{totalHabits}</span>
                    <span className="profile-stat-label">Всего привычек</span>
                </div>
                <div className="profile-stat-card">
                    <span className="profile-stat-value">{completedHabits}</span>
                    <span className="profile-stat-label">Активных привычек</span>
                </div>
                <div className="profile-stat-card">
                    <span className="profile-stat-value">{totalJournalEntries}</span>
                    <span className="profile-stat-label">Записей в дневнике</span>
                </div>
            </div>

            {/* Настройки */}
            <div className="profile-settings-card">
                <h3 className="profile-settings-title">Настройки</h3>

                <div className="profile-setting-item">
                    <div>
                        <p className="profile-setting-name">Тёмная тема</p>
                        <p className="profile-setting-desc">Скоро будет доступно</p>
                    </div>
                    <div className="profile-toggle disabled">
                        <div className="profile-toggle-thumb"></div>
                    </div>
                </div>

                <div className="profile-setting-item">
                    <div>
                        <p className="profile-setting-name">Уведомления</p>
                        <p className="profile-setting-desc">Напоминания о привычках</p>
                    </div>
                    <div className="profile-toggle active">
                        <div className="profile-toggle-thumb"></div>
                    </div>
                </div>

                <div className="profile-setting-item">
                    <div>
                        <p className="profile-setting-name">Язык</p>
                        <p className="profile-setting-desc">Русский</p>
                    </div>
                    <span className="profile-setting-value">🇷🇺</span>
                </div>

                <div className="profile-setting-item">
                    <div>
                        <p className="profile-setting-name">Версия</p>
                        <p className="profile-setting-desc">DAY 33 v1.0</p>
                    </div>
                    <span className="profile-setting-value">1.0.0</span>
                </div>
            </div>

            {/* Опасная зона */}
            <div className="profile-danger-card">
                <h3 className="profile-danger-title">⚠️ Опасная зона</h3>
                <p className="profile-danger-desc">
                    Сброс всего прогресса удалит все ваши привычки и записи. Это действие нельзя отменить.
                </p>
                <button
                    className="btn-reset-progress"
                    onClick={() => {
                        if (confirm('Вы уверены?')) {
                            setData(prev => ({
                                ...prev,
                                habits: prev.habits.map(h => ({ ...h, completions: [] })),
                                journal: [],
                                currentDay: 1,
                                goals: prev.goals.map(g => ({ ...g, progress: 0 })),
                                reflections: []
                            }));
                        }
                    }}
                >
                    Сбросить весь прогресс
                </button>
            </div>
        </div>
    );
}