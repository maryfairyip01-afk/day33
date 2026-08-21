// ========================================
// PlanInfo.js — Как устроена программа
// ========================================

function PlanInfo({ setPage }) {
    return (
        <div className="screen-pad" style={{ paddingTop: '28px' }}>
            <span className="back-link" onClick={() => setPage('planready')}>&lsaquo; Назад</span>
            <div className="eyebrow">КАК УСТРОЕНА ПРОГРАММА</div>
            <h2 style={{ fontSize: '20px', marginTop: '8px', lineHeight: '1.3' }}>
                План внедрения новой привычки за 5 недель
            </h2>
            <p style={{ fontSize: '13px', color: '#6e6e6e', marginTop: '12px', lineHeight: '1.6' }}>
                Мозг формирует привычку не через силу воли, а через цикл:
            </p>
            <div className="sparkle-plate" style={{ marginTop: '12px' }}>
                <div className="sparkle-dot" style={{ top: '15%', left: '10%' }}></div>
                <div className="sparkle-dot" style={{ top: '70%', left: '20%', animationDelay: '.5s' }}></div>
                <div className="sparkle-dot" style={{ top: '20%', left: '85%', animationDelay: '.3s' }}></div>
                <div className="sparkle-dot" style={{ top: '75%', left: '80%', animationDelay: '.8s' }}></div>
                <span className="txt">сигнал → действие → награда → повторение</span>
            </div>
            <p style={{ fontSize: '13px', color: '#6e6e6e', marginTop: '12px', lineHeight: '1.6' }}>
                Задача пяти недель — постепенно передать выполнение привычки из режима сознательного контроля в режим более автоматического поведения.
            </p>
            <button
                className="btn btn-primary"
                style={{ marginTop: '16px' }}
                onClick={() => setPage('weeks')}
            >
                Смотреть подробный план
            </button>
        </div>
    );
}