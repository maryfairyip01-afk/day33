// ========================================
// Navbar.js — Нижняя навигация (мобильная)
// ========================================

function Navbar({ page, setPage }) {
    return (
        <div className="bottom-nav">
            {navItems.map(item => (
                <button
                    key={item.id}
                    className={`nav-item ${page === item.id ? 'active' : ''}`}
                    onClick={() => setPage(item.id)}
                >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
    );
}