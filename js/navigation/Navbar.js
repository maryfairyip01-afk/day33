// ========================================
// Navbar.js — Нижняя навигация (мобильная)
// ========================================

function Navbar({ page, setPage }) {
    return (
        <div className="navbar-bottom">
            {navItems.map(item => (
                <button
                    key={item.id}
                    className={`nav-item-bottom ${page === item.id ? 'active' : ''}`}
                    onClick={() => setPage(item.id)}
                >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                </button>
            ))}
        </div>
    );
}