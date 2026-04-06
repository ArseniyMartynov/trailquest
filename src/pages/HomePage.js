const STATS = [
    ['120+', 'Маршрутів'],
    ['8 000', 'Учасників'],
    ['24', 'Регіони'],
    ['98%', 'Задоволені'],
];

const HomePage = ({ onNavigate, onRegister }) => (
    <div className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />

        <div className="hero-content">
            <div className="hero-tag">🌿 Відкрий Україну з нами</div>
            <h1>
                Твоя наступна<br />
                <em>пригода</em><br />
                починається тут
            </h1>
            <p className="hero-lead">
                TrailQuest — платформа для відкриття та планування пішохідних маршрутів
                по найкрасивіших куточках України. Від Карпат до Подільських каньйонів.
            </p>
            <div className="hero-btns">
                <button className="btn-primary" onClick={() => onNavigate('routes')}>
                    Дивитись маршрути →
                </button>
                <button className="btn-outline" onClick={onRegister}>
                    Зареєструватись
                </button>
            </div>
        </div>

        <div className="hero-stats">
            {STATS.map(([num, label]) => (
                <div key={label}>
                    <div className="stat-num">{num}</div>
                    <div className="stat-lbl">{label}</div>
                </div>
            ))}
        </div>
    </div>
);

export default HomePage;