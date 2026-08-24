// ========================================
// Profile.js — Профиль с карточками
// ========================================

function Profile({ data, setData, onLogout, user }) {
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

    // Данные из аккаунта
    const currentDay = data.currentDay || 1;
    const currentWeek = data.week || 1;
    const brainGoal = data.user?.brainGoal || 'Не выбрана';
    const success = data.success || 0;
    const totalHabits = data.habits?.length || 0;
    const completedHabits = data.habits?.filter(h => h.completions?.length > 0).length || 0;
    const totalJournalEntries = data.journal?.length || 0;
    const isComplete = data.journeyComplete || false;
    const journeyStartDate = data.user?.journeyStartDate;

    // Форматирование даты
    const formatDate = (dateString) => {
        if (!dateString) return 'Не начат';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    };

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
                            <p className="profile-email">{user?.email || ''}</p>
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

            {/* 4 ОСНОВНЫХ БЛОКА: Day, Week, Brain Goal, Success */}
            <div className="profile-main-grid">
                <div className="profile-main-card">
                    <span className="profile-main-icon">📅</span>
                    <span className="profile-main-value">{currentDay}</span>
                    <span className="profile-main-label">Текущий день</span>
                </div>
                <div className="profile-main-card">
                    <span className="profile-main-icon">📆</span>
                    <span className="profile-main-value">{currentWeek}</span>
                    <span className="profile-main-label">Текущая неделя</span>
                </div>
                <div className="profile-main-card">
                    <span className="profile-main-icon">🧠</span>
                    <span className="profile-main-value">{brainGoal}</span>
                    <span className="profile-main-label">Цель мозга</span>
                </div>
                <div className="profile-main-card">
                    <span className="profile-main-icon">🏆</span>
                    <span className="profile-main-value">{success}%</span>
                    <span className="profile-main-label">Успех</span>
                </div>
            </div>

            {/* Дополнительная информация о путешествии */}
            <div className="profile-journey-card">
                <h3 className="profile-journey-title">🗺️ Ваш путь</h3>
                <div className="profile-journey-info">
                    <div className="profile-journey-row">
                        <span className="profile-journey-label">Дата начала</span>
                        <span className="profile-journey-value">{formatDate(journeyStartDate)}</span>
                    </div>
                    <div className="profile-journey-row">
                        <span className="profile-journey-label">Прогресс пути</span>
                        <span className="profile-journey-value">
                            {isComplete ? '🎉 Завершён!' : `${Math.min(Math.round((currentDay / 75) * 100), 100)}%`}
                        </span>
                    </div>
                    <div className="profile-journey-progress">
                        <div className="profile-journey-bar">
                            <div 
                                className="profile-journey-fill"
                                style={{ width: `${Math.min(Math.round((currentDay / 75) * 100), 100)}%` }}
                            />
                        </div>
                        <div className="profile-journey-days">
                            <span>День 1</span>
                            <span>День {Math.min(currentDay, 75)}</span>
                            <span>День 75</span>
                        </div>
                    </div>
                    {isComplete && (
                        <div className="profile-journey-complete">
                            🎉 Поздравляем! Вы завершили 75-дневный путь!
                        </div>
                    )}
                </div>
            </div>            {/* Статистика привычек и дневника */}
            <div className="profile-stats-grid">
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
                <div className="profile-stat-card">
                    <span className="profile-stat-value">{data.habits?.reduce((sum, h) => sum + (h.completions?.length || 0), 0) || 0}</span>
                    <span className="profile-stat-label">Всего выполнений</span>
                </div>
            </div>

            {/* Настройки */}
            <div className="profile-settings-card">
                <h3 className="profile-settings-title">⚙️ Настройки</h3>

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
                        <p className="profile-setting-desc">DAY 33 v2.0</p>
                    </div>
                    <span className="profile-setting-value">2.0.0</span>
                </div>

                {/* Кнопка выхода */}
                <div className="profile-setting-item" style={{ borderTop: '1px solid rgba(236,202,203,0.3)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                    <div>
                        <p className="profile-setting-name" style={{ color: '#e74c3c' }}>Выйти из аккаунта</p>
                        <p className="profile-setting-desc">Выйти и вернуться на экран входа</p>
                    </div>
                    <button className="btn-logout" onClick={onLogout}>
                        <i className="fas fa-sign-out-alt"></i> Выйти
                    </button>
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
                        if (confirm('Вы уверены? Это удалит весь ваш прогресс!')) {
                            setData(prev => ({
                                ...prev,
                                habits: prev.habits.map(h => ({ ...h, completions: [] })),
                                journal: [],
                                currentDay: 1,
                                week: 1,
                                goals: prev.goals.map(g => ({ ...g, progress: 0 })),
                                reflections: [],
                                success: 0,
                                journeyComplete: false,
                                user: {
                                    ...prev.user,
                                    journeyStartDate: new Date().toISOString()
                                }
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