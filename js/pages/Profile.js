// ========================================
// Profile.js — Профиль с карточками
// ========================================

function Profile({ data, setData, onLogout, user, isDarkMode, onToggleTheme }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(data.user?.name || '');
    const [showAvatarUpload, setShowAvatarUpload] = useState(false);

    const handleSaveName = () => {
        if (tempName.trim()) {
            setData(prev => ({
                ...prev,
                user: { ...prev.user, name: tempName.trim() }
            }));
            setIsEditing(false);
        }
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const avatarData = event.target.result;
            // Сохраняем аватар
            const userId = user?.id;
            if (userId) {
                AuthSystem.saveUserAvatar(userId, avatarData);
                setData(prev => ({
                    ...prev,
                    user: { ...prev.user, avatar: avatarData }
                }));
            }
            setShowAvatarUpload(false);
        };
        reader.readAsDataURL(file);
    };

    // Данные из аккаунта
    const currentDay = data.currentDay || 1;
    const currentWeek = data.week || 1;
    const success = data.success || 0;
    const totalHabits = data.habits?.length || 0;
    const completedHabits = data.habits?.filter(h => h.completions?.length > 0).length || 0;
    const totalJournalEntries = data.journal?.length || 0;
    const isComplete = data.journeyComplete || false;
    const journeyStartDate = data.user?.journeyStartDate;
    const avatar = data.user?.avatar || null;

    const formatDate = (dateString) => {
        if (!dateString) return 'Не начат';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    };

    return React.createElement('div', { className: 'profile-container' },
        React.createElement('h2', { className: 'page-title' }, 'Profile'),

        // Карточка пользователя с аватаром
        React.createElement('div', { className: 'profile-user-card' },
            React.createElement('div', { className: 'profile-avatar-wrapper' },
                avatar 
                    ? React.createElement('img', { 
                        src: avatar, 
                        className: 'profile-avatar-img',
                        alt: 'Avatar'
                      })
                    : React.createElement('div', { className: 'profile-avatar' },
                        data.user?.name?.charAt(0) || '?'
                      ),
                React.createElement('button', { 
                    className: 'profile-avatar-change',
                    onClick: () => setShowAvatarUpload(!showAvatarUpload)
                },
                    '📷'
                ),
                showAvatarUpload && React.createElement('input', {
                    type: 'file',
                    accept: 'image/*',
                    className: 'profile-avatar-input',
                    onChange: handleAvatarUpload,
                    ref: (input) => input && input.click()
                })
            ),
            React.createElement('div', { className: 'profile-user-info' },
                isEditing ? (
                    React.createElement('div', { className: 'profile-edit' },
                        React.createElement('input', {
                            className: 'profile-name-input',
                            value: tempName,
                            onChange: (e) => setTempName(e.target.value),
                            onKeyPress: (e) => { if (e.key === 'Enter') handleSaveName(); },
                            autoFocus: true
                        }),
                        React.createElement('button', { className: 'btn-save-name', onClick: handleSaveName },
                            'Сохранить'
                        ),
                        React.createElement('button', {
                            className: 'btn-cancel-edit',
                            onClick: () => {
                                setIsEditing(false);
                                setTempName(data.user?.name || '');
                            }
                        },
                            'Отмена'
                        )
                    )
                ) : (
                    React.createElement(React.Fragment, null,
                        React.createElement('h3', { className: 'profile-name' }, data.user?.name || 'Пользователь'),
                        React.createElement('p', { className: 'profile-email' }, user?.email || ''),
                        React.createElement('p', { className: 'profile-since' },
                            `В DAY 33 с ${data.user?.startDate ? new Date(data.user.startDate).toLocaleDateString('ru-RU') : 'недавнего времени'}`
                        ),
                        React.createElement('button', { className: 'btn-edit-profile', onClick: () => setIsEditing(true) },
                            '✏️ Редактировать'
                        )
                    )
                )
            )
        ),

        // 3 основных блока (без Brain Goal)
        React.createElement('div', { className: 'profile-main-grid' },
            React.createElement('div', { className: 'profile-main-card' },
                React.createElement('span', { className: 'profile-main-icon' }, '📅'),
                React.createElement('span', { className: 'profile-main-value' }, currentDay),
                React.createElement('span', { className: 'profile-main-label' }, 'Текущий день')
            ),
            React.createElement('div', { className: 'profile-main-card' },
                React.createElement('span', { className: 'profile-main-icon' }, '📆'),
                React.createElement('span', { className: 'profile-main-value' }, currentWeek),
                React.createElement('span', { className: 'profile-main-label' }, 'Текущая неделя')
            ),
            React.createElement('div', { className: 'profile-main-card' },
                React.createElement('span', { className: 'profile-main-icon' }, '🏆'),
                React.createElement('span', { className: 'profile-main-value' }, `${success}%`),
                React.createElement('span', { className: 'profile-main-label' }, 'Успех')
            )
        ),

        // Статистика
        React.createElement('div', { className: 'profile-stats-grid' },
            React.createElement('div', { className: 'profile-stat-card' },
                React.createElement('span', { className: 'profile-stat-value' }, totalHabits),
                React.createElement('span', { className: 'profile-stat-label' }, 'Всего привычек')
            ),
            React.createElement('div', { className: 'profile-stat-card' },
                React.createElement('span', { className: 'profile-stat-value' }, completedHabits),
                React.createElement('span', { className: 'profile-stat-label' }, 'Активных привычек')
            ),
            React.createElement('div', { className: 'profile-stat-card' },
                React.createElement('span', { className: 'profile-stat-value' }, totalJournalEntries),
                React.createElement('span', { className: 'profile-stat-label' }, 'Записей в дневнике')
            ),
            React.createElement('div', { className: 'profile-stat-card' },
                React.createElement('span', { className: 'profile-stat-value' }, 
                    data.habits?.reduce((sum, h) => sum + (h.completions?.length || 0), 0) || 0
                ),
                React.createElement('span', { className: 'profile-stat-label' }, 'Всего выполнений')
            )
        ),

        // Настройки с Night Mode
        React.createElement('div', { className: 'profile-settings-card' },
            React.createElement('h3', { className: 'profile-settings-title' }, '⚙️ Настройки'),

            // Night Mode
            React.createElement('div', { className: 'profile-setting-item' },
                React.createElement('div', null,
                    React.createElement('p', { className: 'profile-setting-name' }, 
                        isDarkMode ? '🌙 Ночная тема' : '☀️ Светлая тема'
                    ),
                    React.createElement('p', { className: 'profile-setting-desc' }, 
                        isDarkMode ? 'Тёмный режим включён' : 'Светлый режим включён'
                    )
                ),
                React.createElement('button', { 
                    className: `profile-theme-toggle ${isDarkMode ? 'dark' : 'light'}`,
                    onClick: onToggleTheme
                },
                    React.createElement('span', { className: 'profile-theme-toggle-thumb' })
                )
            ),

            // Уведомления
            React.createElement('div', { className: 'profile-setting-item' },
                React.createElement('div', null,
                    React.createElement('p', { className: 'profile-setting-name' }, 'Уведомления'),
                    React.createElement('p', { className: 'profile-setting-desc' }, 'Напоминания о привычках')
                ),
                React.createElement('div', { className: 'profile-toggle active' },
                    React.createElement('div', { className: 'profile-toggle-thumb' })
                )
            ),

            // Язык
            React.createElement('div', { className: 'profile-setting-item' },
                React.createElement('div', null,
                    React.createElement('p', { className: 'profile-setting-name' }, 'Язык'),
                    React.createElement('p', { className: 'profile-setting-desc' }, 'Русский')
                ),
                React.createElement('span', { className: 'profile-setting-value' }, '🇷🇺')
            ),

            // Версия
            React.createElement('div', { className: 'profile-setting-item' },
                React.createElement('div', null,
                    React.createElement('p', { className: 'profile-setting-name' }, 'Версия'),
                    React.createElement('p', { className: 'profile-setting-desc' }, 'DAY 33 v2.0')
                ),
                React.createElement('span', { className: 'profile-setting-value' }, '2.0.0')
            ),

            // Выход
            React.createElement('div', { className: 'profile-setting-item', style: { borderTop: '1px solid rgba(236,202,203,0.3)', paddingTop: '1rem', marginTop: '0.5rem' } },
                React.createElement('div', null,
                    React.createElement('p', { className: 'profile-setting-name', style: { color: '#e74c3c' } }, 'Выйти из аккаунта'),
                    React.createElement('p', { className: 'profile-setting-desc' }, 'Выйти и вернуться на экран входа')
                ),
                React.createElement('button', { className: 'btn-logout', onClick: onLogout },
                    'Выйти'
                )
            )
        ),

        // Опасная зона
        React.createElement('div', { className: 'profile-danger-card' },
            React.createElement('h3', { className: 'profile-danger-title' }, '⚠️ Опасная зона'),
            React.createElement('p', { className: 'profile-danger-desc' },
                'Сброс всего прогресса удалит все ваши привычки и записи. Это действие нельзя отменить.'
            ),
            React.createElement('button', {
                className: 'btn-reset-progress',
                onClick: () => {
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
                }
            },
                'Сбросить весь прогресс'
            )
        )
    );
}