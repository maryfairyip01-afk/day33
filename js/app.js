// ========================================
// app.js — Главный файл приложения Day 33
// ========================================

const { useState, useEffect } = React;

// ---------- Константы ----------
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

// ---------- Система расчёта дней и недель ----------
const DayCalculator = {
    getCurrentDay(startDate) {
        if (!startDate) return 1;
        const start = new Date(startDate);
        const today = new Date();
        start.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        const diffTime = today - start;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays + 1;
    },

    getCurrentWeek(day) {
        return Math.ceil(day / 7);
    },

    isJourneyComplete(day) {
        return day >= 75;
    },

    getJourneyProgress(day) {
        return Math.min(Math.round((day / 75) * 100), 100);
    },

    formatDay(day) {
        return `Day ${day}`;
    },

    formatWeek(week) {
        return `Week ${week}`;
    }
};

// ---------- Система расчёта Success % ----------
const SuccessCalculator = {
    calculate(habits, startDate) {
        if (!habits || habits.length === 0) return 0;
        if (!startDate) return 0;

        const currentDay = DayCalculator.getCurrentDay(startDate);
        if (currentDay < 1) return 0;

        let totalPlanned = 0;
        let totalCompleted = 0;

        habits.forEach(habit => {
            const completions = habit.completions || [];
            const plannedDays = currentDay;
            const completedDays = completions.length;
            totalPlanned += plannedDays;
            totalCompleted += Math.min(completedDays, plannedDays);
        });

        if (totalPlanned === 0) return 0;
        return Math.round((totalCompleted / totalPlanned) * 100);
    }
};

// ---------- Данные для onboarding ----------
const SPHERES = [
    { id: 'mind', label: 'Mind / Мышление', icon: '🧠', habits: ['Чтение', 'Медитация', 'Digital detox', 'Концентрация', 'Обучение'] },
    { id: 'body', label: 'Body / Тело', icon: '💪', habits: ['Тренировки', 'Прогулки', 'Stretching', 'Сон', 'Движение'] },
    { id: 'nutrition', label: 'Nutrition / Питание', icon: '🥗', habits: ['Вода', 'Регулярное питание', 'Осознанное питание', 'Полезные продукты'] },
    { id: 'self', label: 'Self / Саморазвитие', icon: '🌱', habits: ['Дневник', 'Рефлексия', 'Благодарность', 'Self-awareness'] }
];

const BRAIN_GOALS = ['Focus', 'Discipline', 'Consistency', 'Calm', 'Learning', 'Self-awareness'];

const WEEKLY_PLANS = [
    { week: 1, title: 'START', goal: 'Познакомиться с новой привычкой и сделать её максимально простой', action: 'Выполняй минимальную версию привычки' },
    { week: 2, title: 'REPEAT', goal: 'Закрепить повторение', action: 'Фокус на регулярности' },
    { week: 3, title: 'BUILD', goal: 'Постепенно увеличить устойчивость поведения', action: 'Увеличивай сложность постепенно' },
    { week: 4, title: 'STRENGTHEN', goal: 'Сделать привычку более естественной частью дня', action: 'Интегрируй в ежедневный распорядок' },
    { week: 5, title: 'INTEGRATE', goal: 'Интегрировать привычку в образ жизни', action: 'Привычка стала частью тебя' }
];// ---------- СИСТЕМА АВТОРИЗАЦИИ ----------
const AuthSystem = {
    register(username, email, password, confirmPassword) {
        if (!username || !email || !password || !confirmPassword) {
            return { success: false, error: 'Заполните все поля' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, error: 'Некорректный email' };
        }

        if (password.length < 6) {
            return { success: false, error: 'Пароль должен быть не менее 6 символов' };
        }

        if (password !== confirmPassword) {
            return { success: false, error: 'Пароли не совпадают' };
        }

        const users = loadData(USERS_KEY, {});
        const existingUser = Object.values(users).find(u => u.email === email);
        if (existingUser) {
            return { success: false, error: 'Пользователь с таким email уже существует' };
        }

        const userId = generateId();
        const userData = {
            id: userId,
            username,
            email,
            password,
            createdAt: new Date().toISOString()
        };

        users[userId] = userData;
        saveData(USERS_KEY, users);

        const initialUserData = {
            habits: [],
            journal: [],
            goals: [],
            reflections: [],
            currentDay: 1,
            week: 1,
            mood: 'good',
            user: {
                name: username,
                email: email,
                startDate: new Date().toISOString(),
                journeyStartDate: null,
                brainGoal: null,
                selectedSphere: null,
                selectedHabits: [],
                personalGoal: '',
                onboardingCompleted: false,
                conceptViewed: false,
                planCreated: false,
                journeyStarted: false
            },
            success: 0,
            journeyComplete: false
        };
        saveData(`${STORAGE_KEY}_${userId}`, initialUserData);

        this.login(email, password);
        return { success: true, userId };
    },

    login(email, password) {
        if (!email || !password) {
            return { success: false, error: 'Заполните все поля' };
        }

        const users = loadData(USERS_KEY, {});
        const user = Object.values(users).find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, error: 'Неверный email или пароль' };
        }

        saveData(AUTH_KEY, { userId: user.id, email: user.email, username: user.username });
        return { success: true, user };
    },

    logout() {
        localStorage.removeItem(AUTH_KEY);
    },

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

    getUserData(userId) {
        const data = loadData(`${STORAGE_KEY}_${userId}`, null);
        if (!data) return null;
        if (data.user && data.user.journeyStartDate) {
            const currentDay = DayCalculator.getCurrentDay(data.user.journeyStartDate);
            data.currentDay = currentDay;
            data.week = DayCalculator.getCurrentWeek(currentDay);
            data.journeyComplete = DayCalculator.isJourneyComplete(currentDay);
            data.success = SuccessCalculator.calculate(data.habits, data.user.journeyStartDate);
        }
        return data;
    },

    saveUserData(userId, data) {
        if (data.user && data.user.journeyStartDate) {
            const currentDay = DayCalculator.getCurrentDay(data.user.journeyStartDate);
            data.currentDay = currentDay;
            data.week = DayCalculator.getCurrentWeek(currentDay);
            data.journeyComplete = DayCalculator.isJourneyComplete(currentDay);
            data.success = SuccessCalculator.calculate(data.habits, data.user.journeyStartDate);
        }
        saveData(`${STORAGE_KEY}_${userId}`, data);
    }
};

// ---------- КОМПОНЕНТ AUTHSCREEN ----------
function AuthScreen({ onLogin }) {
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
        React.createElement('div', { className: 'auth-container' },
            React.createElement('div', { className: 'auth-card' },
                React.createElement('h1', { className: 'auth-title' }, 'DAY 33'),
                React.createElement('p', { className: 'auth-subtitle' },
                    isLogin ? 'Войди в свой аккаунт' : 'Создай новый аккаунт'
                ),
                React.createElement('form', { onSubmit: handleSubmit, className: 'auth-form' },
                    !isLogin && React.createElement('div', { className: 'auth-field' },
                        React.createElement('label', null, 'Имя пользователя'),
                        React.createElement('input', {
                            type: 'text',
                            value: username,
                            onChange: (e) => setUsername(e.target.value),
                            placeholder: 'Введите имя',
                            required: true
                        })
                    ),
                    React.createElement('div', { className: 'auth-field' },
                        React.createElement('label', null, 'Email'),
                        React.createElement('input', {
                            type: 'email',
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            placeholder: 'Введите email',
                            required: true
                        })
                    ),
                    React.createElement('div', { className: 'auth-field' },
                        React.createElement('label', null, 'Пароль'),
                        React.createElement('input', {
                            type: 'password',
                            value: password,
                            onChange: (e) => setPassword(e.target.value),
                            placeholder: 'Введите пароль',
                            required: true
                        }),
                        !isLogin && React.createElement('span', { className: 'auth-hint' }, 'Минимум 6 символов')
                    ),
                    !isLogin && React.createElement('div', { className: 'auth-field' },
                        React.createElement('label', null, 'Подтверждение пароля'),
                        React.createElement('input', {
                            type: 'password',
                            value: confirmPassword,
                            onChange: (e) => setConfirmPassword(e.target.value),
                            placeholder: 'Повторите пароль',
                            required: true
                        })
                    ),
                    error && React.createElement('div', { className: 'auth-error' }, error),
                    React.createElement('button', { type: 'submit', className: 'auth-btn', disabled: loading },
                        loading ? '⏳ Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')
                    )
                ),
                React.createElement('div', { className: 'auth-switch' },
                    React.createElement('span', null, isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'),
                    React.createElement('button', { onClick: switchMode, className: 'auth-switch-btn' },
                        isLogin ? 'Зарегистрироваться' : 'Войти'
                    )
                )
            )
        )
    );
}// ---------- КОМПОНЕНТЫ ONBOARDING ----------

// 1. Concept Screen
function ConceptScreen({ onComplete }) {
    const [step, setStep] = useState(0);
    
    const slides = [
        { title: 'Добро пожаловать в DAY 33', content: 'DAY 33 помогает постепенно внедрять новые привычки, лучше понимать себя и создавать устойчивые изменения.' },
        { title: 'Маленькие действия → Большие изменения', content: 'Привычки формируются через повторение. Мозгу легче выполнять небольшие действия, чем большие задачи.' },
        { title: 'Consistency > Perfection', content: 'Главная цель — постоянство, а не идеальность. Пропуск одного дня не означает провал.' },
        { title: 'Как формируется привычка', content: 'Триггер → Действие → Вознаграждение. Понимание этого цикла помогает создать устойчивую привычку.' },
        { title: 'Готовы начать?', content: 'Сейчас мы пройдём небольшой onboarding, который поможет выбрать цель и привычки для вашего пути.' }
    ];

    return (
        React.createElement('div', { className: 'concept-container' },
            React.createElement('div', { className: 'concept-card' },
                React.createElement('div', { className: 'concept-step-indicator' },
                    slides.map((_, i) => 
                        React.createElement('div', { key: i, className: `concept-dot ${i === step ? 'active' : ''}` })
                    )
                ),
                React.createElement('h2', { className: 'concept-title' }, slides[step].title),
                React.createElement('p', { className: 'concept-content' }, slides[step].content),
                React.createElement('button', { className: 'concept-btn', onClick: () => step < slides.length - 1 ? setStep(step + 1) : onComplete() },
                    step < slides.length - 1 ? 'Далее →' : 'Выбрать сферу →'
                )
            )
        )
    );
}

// 2. Choose Sphere
function ChooseSphere({ onSelect }) {
    const [selected, setSelected] = useState(null);

    return (
        React.createElement('div', { className: 'onboarding-container' },
            React.createElement('div', { className: 'onboarding-card' },
                React.createElement('h2', { className: 'onboarding-title' }, 'Что ты хочешь изменить?'),
                React.createElement('p', { className: 'onboarding-subtitle' }, 'Выбери сферу, в которой хочешь развиваться'),
                React.createElement('div', { className: 'sphere-grid' },
                    SPHERES.map(sphere =>
                        React.createElement('button', {
                            key: sphere.id,
                            className: `sphere-card ${selected === sphere.id ? 'selected' : ''}`,
                            onClick: () => setSelected(sphere.id)
                        },
                            React.createElement('span', { className: 'sphere-icon' }, sphere.icon),
                            React.createElement('span', { className: 'sphere-label' }, sphere.label)
                        )
                    )
                ),
                React.createElement('button', { className: 'onboarding-btn', onClick: () => selected && onSelect(selected), disabled: !selected },
                    'Далее →'
                )
            )
        )
    );
}

// 3. Choose Habits
function ChooseHabits({ sphereId, onSelect }) {
    const [selected, setSelected] = useState([]);
    const sphere = SPHERES.find(s => s.id === sphereId);
    const habits = sphere ? sphere.habits : [];

    const toggleHabit = (habit) => {
        setSelected(prev => 
            prev.includes(habit) 
                ? prev.filter(h => h !== habit)
                : [...prev, habit]
        );
    };

    return (
        React.createElement('div', { className: 'onboarding-container' },
            React.createElement('div', { className: 'onboarding-card' },
                React.createElement('h2', { className: 'onboarding-title' }, 'Выбери привычки'),
                React.createElement('p', { className: 'onboarding-subtitle' }, `Выбери привычки, которые хочешь внедрить в сфере ${sphere?.label || ''}`),
                React.createElement('div', { className: 'habits-grid-onboarding' },
                    habits.map(habit =>
                        React.createElement('button', {
                            key: habit,
                            className: `habit-option ${selected.includes(habit) ? 'selected' : ''}`,
                            onClick: () => toggleHabit(habit)
                        },
                            React.createElement('span', { className: 'habit-check' }, selected.includes(habit) ? '✓' : '○'),
                            React.createElement('span', null, habit)
                        )
                    )
                ),
                React.createElement('button', { className: 'onboarding-btn', onClick: () => selected.length > 0 && onSelect(selected), disabled: selected.length === 0 },
                    'Далее →'
                )
            )
        )
    );
}

// 4. Personal Goal
function PersonalGoal({ onSelect }) {
    const [goal, setGoal] = useState('');

    return (
        React.createElement('div', { className: 'onboarding-container' },
            React.createElement('div', { className: 'onboarding-card' },
                React.createElement('h2', { className: 'onboarding-title' }, 'Почему ты хочешь это изменить?'),
                React.createElement('p', { className: 'onboarding-subtitle' }, 'Сформулируй свою личную цель'),
                React.createElement('textarea', {
                    className: 'onboarding-textarea',
                    placeholder: 'Например: Хочу чувствовать себя энергичнее, стать более дисциплинированной...',
                    value: goal,
                    onChange: (e) => setGoal(e.target.value),
                    rows: 4
                }),
                React.createElement('button', { className: 'onboarding-btn', onClick: () => goal.trim() && onSelect(goal.trim()), disabled: !goal.trim() },
                    'Далее →'
                )
            )
        )
    );
}

// 5. Brain Goal
function ChooseBrainGoal({ onSelect }) {
    const [selected, setSelected] = useState(null);

    return (
        React.createElement('div', { className: 'onboarding-container' },
            React.createElement('div', { className: 'onboarding-card' },
                React.createElement('h2', { className: 'onboarding-title' }, 'Выбери цель мозга'),
                React.createElement('p', { className: 'onboarding-subtitle' }, 'Что ты хочешь развить в себе?'),
                React.createElement('div', { className: 'brain-goal-grid' },
                    BRAIN_GOALS.map(goal =>
                        React.createElement('button', {
                            key: goal,
                            className: `brain-goal-card ${selected === goal ? 'selected' : ''}`,
                            onClick: () => setSelected(goal)
                        },
                            goal
                        )
                    )
                ),
                React.createElement('button', { className: 'onboarding-btn', onClick: () => selected && onSelect(selected), disabled: !selected },
                    'Создать план →'
                )
            )
        )
    );
}

// 6. Plan Ready
function PlanReady({ data, onStart }) {
    const sphere = SPHERES.find(s => s.id === data.user?.selectedSphere);
    const habits = data.user?.selectedHabits || [];
    const goal = data.user?.personalGoal || '';
    const brainGoal = data.user?.brainGoal || '';

    return (
        React.createElement('div', { className: 'plan-ready-container' },
            React.createElement('div', { className: 'plan-ready-card' },
                React.createElement('div', { className: 'plan-ready-icon' }, '🎯'),
                React.createElement('h2', { className: 'plan-ready-title' }, 'План готов!'),
                React.createElement('p', { className: 'plan-ready-subtitle' }, 'Ты не должен менять всё сразу. Мы будем внедрять привычки шаг за шагом.'),
                React.createElement('div', { className: 'plan-ready-summary' },
                    React.createElement('div', { className: 'plan-ready-item' },
                        React.createElement('span', { className: 'plan-ready-label' }, 'Сфера'),
                        React.createElement('span', { className: 'plan-ready-value' }, sphere?.label || 'Не выбрана')
                    ),
                    React.createElement('div', { className: 'plan-ready-item' },
                        React.createElement('span', { className: 'plan-ready-label' }, 'Привычки'),
                        React.createElement('span', { className: 'plan-ready-value' }, habits.join(', ') || 'Не выбраны')
                    ),
                    React.createElement('div', { className: 'plan-ready-item' },
                        React.createElement('span', { className: 'plan-ready-label' }, 'Цель'),
                        React.createElement('span', { className: 'plan-ready-value' }, goal || 'Не указана')
                    ),
                    React.createElement('div', { className: 'plan-ready-item' },
                        React.createElement('span', { className: 'plan-ready-label' }, 'Цель мозга'),
                        React.createElement('span', { className: 'plan-ready-value' }, brainGoal || 'Не выбрана')
                    )
                ),
                React.createElement('button', { className: 'plan-ready-btn', onClick: onStart },
                    'Посмотреть план по неделям →'
                )
            )
        )
    );
}

// 7. Weeks Plan
function WeeksPlan({ onStart }) {
    return (
        React.createElement('div', { className: 'weeks-plan-container' },
            React.createElement('div', { className: 'weeks-plan-card' },
                React.createElement('h2', { className: 'weeks-plan-title' }, '📅 Твой план по неделям'),
                React.createElement('p', { className: 'weeks-plan-subtitle' }, 'Каждая неделя — это шаг к твоей цели'),
                WEEKLY_PLANS.map((week) =>
                    React.createElement('div', { key: week.week, className: 'week-plan-item' },
                        React.createElement('div', { className: 'week-plan-header' },
                            React.createElement('span', { className: 'week-plan-number' }, `Week ${week.week}`),
                            React.createElement('span', { className: 'week-plan-title-badge' }, week.title)
                        ),
                        React.createElement('p', { className: 'week-plan-goal' }, week.goal),
                        React.createElement('p', { className: 'week-plan-action' }, `→ ${week.action}`)
                    )
                ),
                React.createElement('button', { className: 'weeks-plan-btn', onClick: onStart },
                    'Начать путь 🚀'
                )
            )
        )
    );
}// ---------- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ----------
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

// ---------- ОСНОВНОЕ ПРИЛОЖЕНИЕ ----------
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [data, setData] = useState(null);
    const [page, setPage] = useState('landing');
    const [onboardingStep, setOnboardingStep] = useState('concept');

    useEffect(() => {
        const user = AuthSystem.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            const userData = AuthSystem.getUserData(user.id);
            if (userData) {
                setData(userData);
                if (!userData.user?.conceptViewed) {
                    setOnboardingStep('concept');
                } else if (!userData.user?.selectedSphere) {
                    setOnboardingStep('sphere');
                } else if (!userData.user?.selectedHabits || userData.user.selectedHabits.length === 0) {
                    setOnboardingStep('habits');
                } else if (!userData.user?.personalGoal) {
                    setOnboardingStep('goal');
                } else if (!userData.user?.brainGoal) {
                    setOnboardingStep('braingoal');
                } else if (!userData.user?.planCreated) {
                    setOnboardingStep('planready');
                } else if (!userData.user?.journeyStarted) {
                    setOnboardingStep('weeks');
                } else {
                    setOnboardingStep('complete');
                }
            }
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated && currentUser && data) {
            AuthSystem.saveUserData(currentUser.id, data);
        }
    }, [data, isAuthenticated, currentUser]);

    const handleLogin = () => {
        const user = AuthSystem.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            const userData = AuthSystem.getUserData(user.id);
            if (userData) {
                setData(userData);
            }
            setIsAuthenticated(true);
        }
    };

    const handleLogout = () => {
        AuthSystem.logout();
        setIsAuthenticated(false);
        setCurrentUser(null);
        setData(null);
        setOnboardingStep('concept');
        setPage('landing');
    };

    const handleConceptComplete = () => {
        setData(prev => ({
            ...prev,
            user: { ...prev.user, conceptViewed: true }
        }));
        setOnboardingStep('sphere');
    };

    const handleSphereSelect = (sphereId) => {
        setData(prev => ({
            ...prev,
            user: { ...prev.user, selectedSphere: sphereId }
        }));
        setOnboardingStep('habits');
    };

    const handleHabitsSelect = (habits) => {
        setData(prev => ({
            ...prev,
            user: { ...prev.user, selectedHabits: habits },
            habits: habits.map(h => ({
                id: generateId(),
                name: h,
                category: prev.user?.selectedSphere || 'self',
                completions: []
            }))
        }));
        setOnboardingStep('goal');
    };

    const handleGoalSelect = (goal) => {
        setData(prev => ({
            ...prev,
            user: { ...prev.user, personalGoal: goal }
        }));
        setOnboardingStep('braingoal');
    };

    const handleBrainGoalSelect = (brainGoal) => {
        setData(prev => ({
            ...prev,
            user: { ...prev.user, brainGoal: brainGoal }
        }));
        setOnboardingStep('planready');
    };

    const handlePlanReady = () => {
        setData(prev => ({
            ...prev,
            user: { ...prev.user, planCreated: true }
        }));
        setOnboardingStep('weeks');
    };

    const handleStartJourney = () => {
        const startDate = new Date().toISOString();
        setData(prev => ({
            ...prev,
            user: {
                ...prev.user,
                journeyStartDate: startDate,
                journeyStarted: true,
                onboardingCompleted: true
            },
            currentDay: 1,
            week: 1
        }));
        setOnboardingStep('complete');
        setPage('landing');
    };

    if (!isAuthenticated) {
        return React.createElement(AuthScreen, { onLogin: handleLogin });
    }

    if (!data) {
        return React.createElement('div', { className: 'loading-screen' }, 'Загрузка...');
    }

    if (!data.user?.onboardingCompleted) {
        switch (onboardingStep) {
            case 'concept':
                return React.createElement(ConceptScreen, { onComplete: handleConceptComplete });
            case 'sphere':
                return React.createElement(ChooseSphere, { onSelect: handleSphereSelect });
            case 'habits':
                return React.createElement(ChooseHabits, { sphereId: data.user?.selectedSphere, onSelect: handleHabitsSelect });
            case 'goal':
                return React.createElement(PersonalGoal, { onSelect: handleGoalSelect });
            case 'braingoal':
                return React.createElement(ChooseBrainGoal, { onSelect: handleBrainGoalSelect });
            case 'planready':
                return React.createElement(PlanReady, { data: data, onStart: handlePlanReady });
            case 'weeks':
                return React.createElement(WeeksPlan, { onStart: handleStartJourney });
            default:
                return React.createElement('div', null, 'Loading...');
        }
    }

    const renderPage = () => {
        const pageProps = {
            data,
            setData,
            page,
            setPage,
            onLogout: handleLogout,
            user: currentUser
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

    return React.createElement('div', { className: 'app-container' },
        React.createElement('div', { className: 'app-content' }, renderPage()),
        React.createElement(Navbar, { page: page, setPage: setPage })
    );
}

// ---------- ЗАПУСК ----------
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));