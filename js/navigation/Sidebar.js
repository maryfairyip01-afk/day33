// ========================================
// Sidebar.js — Боковое меню (десктоп)
// ========================================

function Sidebar({ page, setPage }) {
    return (
        <div className="sidebar min-w-[180px]">
            {navItems.map(item => (
                <button
                    key={item.id}
                    className={`sidebar-item ${page === item.id ? 'active' : ''}`}
                    onClick={() => setPage(item.id)}
                >
                    {item.icon} {item.label}
                </button>
            ))}
        </div>
    );
}