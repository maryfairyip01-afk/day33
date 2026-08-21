// ========================================
// Sidebar.js — Боковое меню (десктоп)
// ========================================

function Sidebar({ page, setPage }) {
    return (
        <div className="sidebar">
            {navItems.map(item => (
                <button
                    key={item.id}
                    className={`sidebar-item ${page === item.id ? 'active' : ''}`}
                    onClick={() => setPage(item.id)}
                >
                    <span className="sidebar-icon">{item.icon}</span>
                    <span className="sidebar-label">{item.label}</span>
                </button>
            ))}
        </div>
    );
}