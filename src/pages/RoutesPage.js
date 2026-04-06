//import { useState } from 'react';
//import { ROUTES_DATA, CAT_LABELS, DIFFICULTY_COLOR } from '../data';
//import Badge from '../components/ui/Badge';
//import SectionHeader from '../components/ui/SectionHeader';

//const RouteDetail = ({ route, onBack }) => (
//    <div className="overlay">
//        <div className="overlay-inner">
//            <button className="back-btn" onClick={onBack}>← Назад до маршрутів</button>
//            <div className="ov-emoji">{route.img}</div>
//            <h1 className="ov-title">{route.name}</h1>
//            <div className="route-meta" style={{ marginBottom: '1.5rem' }}>
//                <Badge className="badge-diff" color={DIFFICULTY_COLOR[route.difficulty]}>
//                    {route.difficulty}
//                </Badge>
//                <Badge className="badge-km">📍 {route.km} км</Badge>
//                <Badge className="badge-hr">⏱ {route.hours} год</Badge>
//            </div>
//            <div className="ov-body">
//                <p>{route.desc}</p>
//                <p>
//                    Маршрут підходить для людей з відповідним рівнем підготовки.
//                    Рекомендовано взяти трекінгові палиці, воду (≥ 2 л) та перекус.
//                </p>
//                <p>
//                    Найкращий час — травень–вересень. В інші сезони потрібне
//                    спеціальне спорядження та досвід гірського туризму.
//                </p>
//            </div>
//            <button className="btn-primary" style={{ marginTop: '2rem' }}>
//                Записатись на маршрут
//            </button>
//        </div>
//    </div>
//);

//const RoutesPage = ({ initCat }) => {
//    const [cat, setCat] = useState(initCat || 'carpathians');
//    const [detail, setDetail] = useState(null);

//    if (detail) return <RouteDetail route={detail} onBack={() => setDetail(null)} />;

//    return (
//        <div className="page-wrapper">
//            <section className="page-section">
//                <SectionHeader
//                    tag="Каталог"
//                    title="Маршрути"
//                    sub="Знайди ідеальний трек — від легких прогулянок до складних сходжень."
//                />

//                <div className="cat-tabs">
//                    {Object.entries(CAT_LABELS).map(([k, v]) => (
//                        <button
//                            key={k}
//                            className={`cat-tab ${cat === k ? 'active' : ''}`}
//                            onClick={() => setCat(k)}
//                        >
//                            {v}
//                        </button>
//                    ))}
//                </div>

//                <div className="routes-grid">
//                    {(ROUTES_DATA[cat] || []).map((r) => (
//                        <div key={r.id} className="route-card" onClick={() => setDetail(r)}>
//                            <div className="route-emoji">{r.img}</div>
//                            <div className="route-name">{r.name}</div>
//                            <div className="route-desc">{r.desc}</div>
//                            <div className="route-meta">
//                                <Badge className="badge-diff" color={DIFFICULTY_COLOR[r.difficulty]}>
//                                    {r.difficulty}
//                                </Badge>
//                                <Badge className="badge-km">📍 {r.km} км</Badge>
//                                <Badge className="badge-hr">⏱ {r.hours} год</Badge>
//                            </div>
//                        </div>
//                    ))}
//                </div>
//            </section>
//        </div>
//    );
//};

//export default RoutesPage;

import { useState } from 'react';
import { ROUTES_DATA, CAT_LABELS, DIFFICULTY_COLOR } from '../data';
import Badge from '../components/ui/Badge';
import SectionHeader from '../components/ui/SectionHeader';

// ── Форма запису на маршрут ───────────────────────────────────────
const BookingForm = ({ route, onClose }) => {
    const [form, setForm] = useState({
        name: '', phone: '', email: '', date: '', people: '1', level: '', comment: '',
    });
    const [errors, setErrors] = useState({});
    const [done, setDone] = useState(false);

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Введіть ім'я";
        if (!form.phone.trim()) e.phone = 'Введіть телефон';
        else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone)) e.phone = 'Невірний формат';
        if (!form.email.trim()) e.email = 'Введіть email';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Невірний формат';
        if (!form.date) e.date = 'Оберіть дату';
        else if (new Date(form.date) < new Date()) e.date = 'Дата не може бути в минулому';
        if (!form.level) e.level = 'Оберіть рівень підготовки';
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const e2 = validate();
        if (Object.keys(e2).length > 0) { setErrors(e2); return; }
        setDone(true);
    };

    // Мінімальна дата — сьогодні
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="booking-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="booking-modal">

                {done ? (
                    // ── Успіх ──
                    <div className="booking-success">
                        <div className="booking-success-emoji">🎉</div>
                        <h3>Заявку прийнято!</h3>
                        <p>
                            Дякуємо, <strong>{form.name}</strong>! Ми зв'яжемось з вами
                            на <strong>{form.email}</strong> протягом 24 годин для підтвердження.
                        </p>
                        <div className="booking-summary">
                            <div className="bs-row"><span>Маршрут</span><strong>{route.name}</strong></div>
                            <div className="bs-row"><span>Дата</span><strong>{new Date(form.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></div>
                            <div className="bs-row"><span>Учасників</span><strong>{form.people}</strong></div>
                        </div>
                        <button className="btn-primary" style={{ width: '100%' }} onClick={onClose}>
                            Чудово!
                        </button>
                    </div>
                ) : (
                    <>
                        {/* ── Шапка ── */}
                        <div className="booking-header">
                            <div>
                                <div className="booking-header-tag">Запис на маршрут</div>
                                <h3 className="booking-title">{route.name}</h3>
                                <div className="route-meta" style={{ marginTop: '.5rem' }}>
                                    <Badge className="badge-diff" color={DIFFICULTY_COLOR[route.difficulty]}>
                                        {route.difficulty}
                                    </Badge>
                                    <Badge className="badge-km">📍 {route.km} км</Badge>
                                    <Badge className="badge-hr">⏱ {route.hours} год</Badge>
                                </div>
                            </div>
                            <button className="booking-close" onClick={onClose}>✕</button>
                        </div>

                        {/* ── Форма ── */}
                        <form className="booking-form" onSubmit={handleSubmit} noValidate>

                            {/* Ім'я + Телефон */}
                            <div className="bf-row">
                                <div className="bf-field">
                                    <label>Ім'я та прізвище {errors.name && <span className="bf-err">{errors.name}</span>}</label>
                                    <input
                                        type="text" placeholder="Іван Франко"
                                        value={form.name} className={errors.name ? 'bf-input-err' : ''}
                                        onChange={(e) => { set('name', e.target.value); setErrors((er) => ({ ...er, name: '' })); }}
                                    />
                                </div>
                                <div className="bf-field">
                                    <label>Телефон {errors.phone && <span className="bf-err">{errors.phone}</span>}</label>
                                    <input
                                        type="tel" placeholder="+38 (067) 123-45-67"
                                        value={form.phone} className={errors.phone ? 'bf-input-err' : ''}
                                        onChange={(e) => { set('phone', e.target.value); setErrors((er) => ({ ...er, phone: '' })); }}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="bf-field">
                                <label>Email {errors.email && <span className="bf-err">{errors.email}</span>}</label>
                                <input
                                    type="email" placeholder="ivan@example.com"
                                    value={form.email} className={errors.email ? 'bf-input-err' : ''}
                                    onChange={(e) => { set('email', e.target.value); setErrors((er) => ({ ...er, email: '' })); }}
                                />
                            </div>

                            {/* Дата + Кількість людей */}
                            <div className="bf-row">
                                <div className="bf-field">
                                    <label>Бажана дата {errors.date && <span className="bf-err">{errors.date}</span>}</label>
                                    <input
                                        type="date" min={today}
                                        value={form.date} className={errors.date ? 'bf-input-err' : ''}
                                        onChange={(e) => { set('date', e.target.value); setErrors((er) => ({ ...er, date: '' })); }}
                                    />
                                </div>
                                <div className="bf-field">
                                    <label>Кількість учасників</label>
                                    <select value={form.people} onChange={(e) => set('people', e.target.value)}>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                            <option key={n} value={n}>{n} {n === 1 ? 'особа' : n < 5 ? 'особи' : 'осіб'}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Рівень підготовки */}
                            <div className="bf-field">
                                <label>Рівень фізичної підготовки {errors.level && <span className="bf-err">{errors.level}</span>}</label>
                                <select
                                    value={form.level} className={errors.level ? 'bf-input-err' : ''}
                                    onChange={(e) => { set('level', e.target.value); setErrors((er) => ({ ...er, level: '' })); }}
                                >
                                    <option value="">Оберіть рівень</option>
                                    <option value="beginner">🟢 Початківець — перший похід</option>
                                    <option value="basic">🟡 Базовий — кілька походів</option>
                                    <option value="intermediate">🟠 Середній — регулярні походи</option>
                                    <option value="advanced">🔴 Досвідчений — складні маршрути</option>
                                </select>
                            </div>

                            {/* Коментар */}
                            <div className="bf-field">
                                <label>Коментар <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(необов'язково)</span></label>
                                <textarea
                                    rows={3}
                                    placeholder="Особливі побажання, питання, інформація про групу..."
                                    value={form.comment}
                                    onChange={(e) => set('comment', e.target.value)}
                                />
                            </div>

                            <button type="submit" className="booking-submit">
                                Надіслати заявку →
                            </button>

                            <p className="booking-note">
                                🔒 Ваші дані захищені. Після отримання заявки наш менеджер
                                зв'яжеться з вами протягом 24 годин.
                            </p>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

// ── Детальна сторінка маршруту ────────────────────────────────────
const RouteDetail = ({ route, onBack }) => {
    const [showBooking, setShowBooking] = useState(false);

    return (
        <div className="overlay">
            <div className="overlay-inner">
                <button className="back-btn" onClick={onBack}>← Назад до маршрутів</button>
                <div className="ov-emoji">{route.img}</div>
                <h1 className="ov-title">{route.name}</h1>
                <div className="route-meta" style={{ marginBottom: '1.5rem' }}>
                    <Badge className="badge-diff" color={DIFFICULTY_COLOR[route.difficulty]}>
                        {route.difficulty}
                    </Badge>
                    <Badge className="badge-km">📍 {route.km} км</Badge>
                    <Badge className="badge-hr">⏱ {route.hours} год</Badge>
                </div>
                <div className="ov-body">
                    <p>{route.desc}</p>
                    <p>
                        Маршрут підходить для людей з відповідним рівнем підготовки.
                        Рекомендовано взяти трекінгові палиці, воду (≥ 2 л) та перекус.
                    </p>
                    <p>
                        Найкращий час — травень–вересень. В інші сезони потрібне
                        спеціальне спорядження та досвід гірського туризму.
                    </p>
                </div>

                <button
                    className="btn-primary"
                    style={{ marginTop: '2rem' }}
                    onClick={() => setShowBooking(true)}
                >
                    Записатись на маршрут
                </button>

                {/* Модальна форма запису */}
                {showBooking && (
                    <BookingForm route={route} onClose={() => setShowBooking(false)} />
                )}
            </div>
        </div>
    );
};

// ── Список маршрутів ──────────────────────────────────────────────
const RoutesPage = ({ initCat }) => {
    const [cat, setCat] = useState(initCat || 'carpathians');
    const [detail, setDetail] = useState(null);

    if (detail) return <RouteDetail route={detail} onBack={() => setDetail(null)} />;

    return (
        <div className="page-wrapper">
            <section className="page-section">
                <SectionHeader
                    tag="Каталог"
                    title="Маршрути"
                    sub="Знайди ідеальний трек — від легких прогулянок до складних сходжень."
                />
                <div className="cat-tabs">
                    {Object.entries(CAT_LABELS).map(([k, v]) => (
                        <button
                            key={k}
                            className={`cat-tab ${cat === k ? 'active' : ''}`}
                            onClick={() => setCat(k)}
                        >
                            {v}
                        </button>
                    ))}
                </div>
                <div className="routes-grid">
                    {(ROUTES_DATA[cat] || []).map((r) => (
                        <div key={r.id} className="route-card" onClick={() => setDetail(r)}>
                            <div className="route-emoji">{r.img}</div>
                            <div className="route-name">{r.name}</div>
                            <div className="route-desc">{r.desc}</div>
                            <div className="route-meta">
                                <Badge className="badge-diff" color={DIFFICULTY_COLOR[r.difficulty]}>
                                    {r.difficulty}
                                </Badge>
                                <Badge className="badge-km">📍 {r.km} км</Badge>
                                <Badge className="badge-hr">⏱ {r.hours} год</Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default RoutesPage;