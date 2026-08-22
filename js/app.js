// ========================================
// app.js — Главный файл приложения
// ========================================

// ---------- Импорт компонентов ----------
const { useState, useEffect } = React;

// ---------- Данные ----------
const STORAGE_KEY = 'day33_data';
const AUTH_KEY = 'day33_auth';
const USERS_KEY = 'day33_users';

// ---------- Утилиты ----------
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key, defaultData) {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : defaultData;
    } catch {
        return defaultData;
    }
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ---------- Авторизация ----------
const AuthSystem = {
    // Регистрация
    register(username, email, password, confirmPassword) {
        // Проверка полей
        if (!username || !email || !password || !confirmPassword) {
            return { success: false, error: 'Заполните все поля' };
        }

        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, error: 'Некорректный email' };
        }

        // Проверка пароля (мин 6 символов)
        if (password.length < 6) {
            return { success: false, error: 'Пароль должен быть не менее 6 символов' };
        }

        // Проверка совпадения паролей
        if (password !== confirmPassword) {
            return { success: false, error: 'Пароли не совпадают' };
        }

        // Получаем всех пользователей
        const users = loadData(USERS_KEY, {});
        
        // Проверка на существующий email
        const existingUser = Object.values(users).find(u => u.email === email);
        if (existingUser) {
            return { success: false, error: 'Пользователь с таким email уже существует' };
        }

        // Создаём нового пользователя
        const userId = generateId();
        const userData = {
            id: userId,
            username,
            email,
            password, // В реальном проекте нужно хешировать!
            createdAt: new Date().toISOString()
        };

        // Сохраняем пользователя
        users[userId] = userData;
        saveData(USERS_KEY, users);

        // Создаём пустые данные для пользователя
        const initialUserData = {
            habits: [],
            journal: [],
            goals: [],
            reflections: [],
            currentDay: 1,
            mood: 'good',
            user: {
                name: username,
                email: email,
                startDate: new Date().toISOString()
            }
        };
        saveData(`${STORAGE_KEY}_${userId}`, initialUserData);

        // Автоматически входим
        this.login(email, password);

        return { success: true, userId };
    },

    // Вход
    login(email, password) {
        if (!email || !password) {
            return { success: false, error: 'Заполните все поля' };
        }

        const users = loadData(USERS_KEY, {});
        const user = Object.values(users).find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, error: 'Неверный email или пароль' };
        }

        // Сохраняем сессию
        saveData(AUTH_KEY, { userId: user.id, email: user.email, username: user.username });
        return { success: true, user };
    },

    // Выход
    logout() {
        localStorage.removeItem(AUTH_KEY);
    },

    // Проверка авторизации
    getCurrentUser() {
        const auth = loadData(AUTH_KEY, null);
        if (!auth) return null;
        
        const users = loadData(USERS_KEY, {});
        const user = users[auth.userId];
        if (!user) {
            localStorage.removeItem(AUTH_KEY);
            return null;
        }
        return user;
    },

    // Получение данных пользователя
    getUserData(userId) {
        return loadData(`${STORAGE_KEY}_${userId}`, null);
    },

    // Сохранение данных пользователя
    saveUserData(userId, data) {
        saveData(`${STORAGE_KEY}_${userId}`, data);
    }
};

// ---------- Компонент авторизации ----------
function AuthScreen({ onLogin, onSwitchToRegister }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            let result;
            if (isLogin) {
                result = AuthSystem.login(email, password);
            } else {
                result = AuthSystem.register(username, email, password, confirmPassword);
            }

            if (result.success) {
                onLogin();
            } else {
                setError(result.error || 'Что-то пошло не так');
            }
            setLoading(false);
        }, 300);
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">DAY 33</h1>
                <p className="auth-subtitle">
                    {isLogin ? 'Войди в свой аккаунт' : 'Создай новый аккаунт'}
                </p>

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <div className="auth-field">
                            <label>Имя пользователя</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Введите имя"
                                required
                            />
                        </div>
                    )}

                    <div className="auth-field">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Введите email"
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label>Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Введите пароль"
                            required
                        />
                        {!isLogin && (
                            <span className="auth-hint">Минимум 6 символов</span>
                        )}
                    </div>

                    {!isLogin && (
                        <div className="auth-field">
                            <label>Подтверждение пароля</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Повторите пароль"
                                required
                            />
                        </div>
                    )}

                    {error && <div className="auth-error">{error}</div>}

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? '⏳ Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
                    </button>
                </form>

                <div className="auth-switch">
                    <span>
                        {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                    </span>
                    <button onClick={switchMode} className="auth-switch-btn">
                        {isLogin ? 'Зарегистрироваться' : 'Войти'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ---------- Основное приложение ----------
function App() {
    // Состояние
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [data, setData] = useState(null);
    const [page, setPage] = useState('landing');

    // Проверка авторизации при загрузке
    useEffect(() => {
        const user = AuthSystem.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            const userData = AuthSystem.getUserData(user.id);
            if (userData) {
                setData(userData);
            } else {
                // Создаём начальные данные если их нет
                const initialData = {
                    habits: [],
                    journal: [],
                    goals: [],
                    reflections: [],
                    currentDay: 1,
                    mood: 'good',
                    user: {
                        name: user.username,
                        email: user.email,
                        startDate: new Date().toISOString()
                    }
                };
                AuthSystem.saveUserData(user.id, initialData);
                setData(initialData);
            }
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            setCurrentUser(null);
            setData(null);
        }
    }, []);

    // Сохранение данных при изменении
    useEffect(() => {
        if (isAuthenticated && currentUser && data) {
            AuthSystem.saveUserData(currentUser.id, data);
        }
    }, [data, isAuthenticated, currentUser]);

    // Обработчик входа
    const handleLogin = () => {
        const user = AuthSystem.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            const userData = AuthSystem.getUserData(user.id);
            if (userData) {
                setData(userData);
            } else {
                const initialData = {
                    habits: [],
                    journal: [],
                    goals: [],
                    reflections: [],
                    currentDay: 1,
                    mood: 'good',
                    user: {
                        name: user.username,
                        email: user.email,
                        startDate: new Date().toISOString()
                    }
                };
                AuthSystem.saveUserData(user.id, initialData);
                setData(initialData);
            }
            setIsAuthenticated(true);
            setPage('landing');
        }
    };

    // Обработчик выхода
    const handleLogout = () => {
        AuthSystem.logout();
        setIsAuthenticated(false);
        setCurrentUser(null);
        setData(null);
        setPage('landing');
    };

    // Если не авторизован — показываем экран авторизации
    if (!isAuthenticated) {
        return <AuthScreen onLogin={handleLogin} />;
    }

    // Если данные ещё не загружены
    if (!data) {
        return <div className="loading-screen">Загрузка...</div>;
    }

    // Обёртка для страниц с данными пользователя
    const renderPage = () => {
        const pageProps = {
            data,
            setData,
            page,
            setPage
        };

        switch (page) {
            case 'landing':
                return React.createElement(Landing, {
                    ...pageProps,
                    completionPercent: getCompletionPercent(data),
                    journalCount: data.journal?.length || 0,
                    longestStreak: getLongestStreak(data)
                });
            case 'habits':
                return React.createElement(Habits, {
                    ...pageProps,
                    todayHabits: data.habits || [],
                    today: new Date().toISOString().split('T')[0],
                    toggleHabit: (habitId) => {
                        const today = new Date().toISOString().split('T')[0];
                        setData(prev => {
                            const newHabits = prev.habits.map(h => {
                                if (h.id === habitId) {
                                    const completions = h.completions || [];
                                    const index = completions.indexOf(today);
                                    if (index > -1) {
                                        return { ...h, completions: completions.filter(d => d !== today) };
                                    } else {
                                        return { ...h, completions: [...completions, today] };
                                    }
                                }
                                return h;
                            });
                            return { ...prev, habits: newHabits };
                        });
                    }
                });
            case 'journal':
                return React.createElement(Journal, {
                    ...pageProps,
                    addJournal: (entry) => {
                        setData(prev => ({
                            ...prev,
                            journal: [...(prev.journal || []), {
                                id: Date.now().toString(),
                                ...entry,
                                date: new Date().toISOString().split('T')[0]
                            }]
                        }));
                    },
                    setMood: (mood) => {
                        setData(prev => ({ ...prev, mood }));
                    }
                });
            case 'progress':
                return React.createElement(Progress, {
                    ...pageProps,
                    completionPercent: getCompletionPercent(data),
                    journalCount: data.journal?.length || 0,
                    longestStreak: getLongestStreak(data)
                });
            case 'profile':
                return React.createElement(Profile, {
                    ...pageProps,
                    onLogout: handleLogout,
                    user: currentUser
                });
            default:
                return React.createElement(Landing, {
                    ...pageProps,
                    completionPercent: getCompletionPercent(data),
                    journalCount: data.journal?.length || 0,
                    longestStreak: getLongestStreak(data)
                });
        }
    };

    return (
        <div className="app-container">
            <div className="app-content">
                {renderPage()}
            </div>
            <Navbar page={page} setPage={setPage} />
        </div>
    );
}

// ---------- Вспомогательные функции ----------
function getCompletionPercent(data) {
    const habits = data.habits || [];
    if (habits.length === 0) return 0;
    const today = new Date().toISOString().split('T')[0];
    const completed = habits.filter(h => (h.completions || []).includes(today)).length;
    return Math.round((completed / habits.length) * 100);
}

function getLongestStreak(data) {
    const habits = data.habits || [];
    let maxStreak = 0;
    habits.forEach(h => {
        const completions = (h.completions || []).sort();
        let streak = 0;
        let currentStreak = 0;
        for (let i = 0; i < completions.length; i++) {
            const date = new Date(completions[i]);
            const prevDate = i > 0 ? new Date(completions[i-1]) : null;
            if (prevDate) {
                const diff = (date - prevDate) / (1000 * 60 * 60 * 24);
                if (diff === 1) {
                    currentStreak++;
                } else {
                    currentStreak = 1;
                }
            } else {
                currentStreak = 1;
            }
            streak = Math.max(streak, currentStreak);
        }
        maxStreak = Math.max(maxStreak, streak);
    });
    return maxStreak;
}

// ---------- Запуск приложения ----------
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));