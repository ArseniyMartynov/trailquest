import { useState } from 'react';

// ── Password strength calculator ──────────────────────────────────
const calcStrength = (pw) => {
    if (!pw) return { score: 0, label: '', color: 'var(--bg3)' };
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    const levels = [
        { label: 'Дуже слабкий', color: '#f87171' },
        { label: 'Слабкий', color: '#fb923c' },
        { label: 'Середній', color: '#fbbf24' },
        { label: 'Надійний', color: '#4ade80' },
        { label: 'Відмінний', color: '#7cc552' },
    ];
    return { score: s, ...levels[s] };
};

// ── Form validation ───────────────────────────────────────────────
const validate = (f) => {
    const e = {};
    if (!f.firstName.trim() || f.firstName.trim().length < 2)
        e.firstName = f.firstName ? 'Мін. 2 символи' : 'Обов\'язкове поле';
    if (!f.lastName.trim() || f.lastName.trim().length < 2)
        e.lastName = f.lastName ? 'Мін. 2 символи' : 'Обов\'язкове поле';
    if (!f.email.trim())
        e.email = 'Обов\'язкове поле';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
        e.email = 'Невірний формат';
    if (!f.password)
        e.password = 'Обов\'язкове поле';
    else if (f.password.length < 8)
        e.password = 'Мінімум 8 символів';
    if (!f.confirm)
        e.confirm = 'Обов\'язкове поле';
    else if (f.confirm !== f.password)
        e.confirm = 'Паролі не збігаються';
    if (!f.terms)
        e.terms = 'Необхідно прийняти';
    return e;
};

// ── Promo perks list ──────────────────────────────────────────────
const PERKS = [
    ['🗺️', <><strong>120+ маршрутів</strong> з GPS-треками</>],
    ['📴', <><strong>Офлайн-режим</strong> без інтернету</>],
    ['👥', <><strong>Спільнота</strong> 8 000+ учасників</>],
    ['🛡️', <><strong>SOS-режим</strong> та сповіщення</>],
];

// ── Component ─────────────────────────────────────────────────────
const RegisterPage = ({ onClose }) => {
    const EMPTY = { firstName: '', lastName: '', email: '', password: '', confirm: '', terms: false };
    const [form, setForm] = useState(EMPTY);
    const [touched, setTouch] = useState({});
    const [showPw, setShowPw] = useState(false);
    const [showCf, setShowCf] = useState(false);
    const [done, setDone] = useState(false);

    const errors = validate(form);
    const isValid = Object.keys(errors).length === 0;
    const strength = calcStrength(form.password);

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    const touch = (k) => setTouch((t) => ({ ...t, [k]: true }));
    const cls = (k) => !touched[k] ? '' : errors[k] ? 'ferr-input' : 'fok-input';

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouch({ firstName: 1, lastName: 1, email: 1, password: 1, confirm: 1, terms: 1 });
        if (isValid) setDone(true);
    };

    return (
        <div className="reg-page">
            <div className="reg-bg" />
            <div className="reg-grid" />

            <div
                className="reg-container"
                style={done ? { gridTemplateColumns: '1fr', maxWidth: 520 } : {}}
            >
                {/* ── Promo panel ── */}
                {!done && (
                    <div className="reg-promo">
                        <div>
                            <div className="reg-promo-tag">🌿 Приєднуйся безкоштовно</div>
                            <h2>
                                Стань частиною<br />
                                <em>спільноти</em><br />
                                мандрівників
                            </h2>
                            <p>
                                Реєструйся та отримай доступ до 120+ верифікованих маршрутів,
                                офлайн-карт та персональних рекомендацій.
                            </p>
                            <div className="reg-perks">
                                {PERKS.map(([icon, text], i) => (
                                    <div className="reg-perk" key={i}>
                                        <div className="reg-perk-icon">{icon}</div>
                                        <span>{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            className="btn-outline"
                            style={{ marginTop: '2rem', fontSize: '.85rem', padding: '.6rem 1.2rem' }}
                            onClick={onClose}
                        >
                            ← Повернутись
                        </button>
                    </div>
                )}

                {/* ── Form panel ── */}
                <div className="reg-panel">
                    {done ? (
                        // Success screen
                        <div className="reg-success">
                            <div className="s-emoji">🎉</div>
                            <h3>Ласкаво просимо,<br />{form.firstName}!</h3>
                            <p>
                                Акаунт успішно створено. Ти тепер частина спільноти TrailQuest —
                                понад 8 000 трекерів по всій Україні.
                            </p>
                            <button className="btn-primary" onClick={onClose}>
                                Перейти до маршрутів →
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="reg-panel-title">Створити акаунт</div>
                            <div className="reg-panel-sub">
                                Вже є акаунт? <a onClick={onClose}>Увійти</a>
                            </div>

                            <form onSubmit={handleSubmit} noValidate>

                                {/* First name + Last name */}
                                <div className="reg-row">
                                    {[
                                        { k: 'firstName', label: "Ім'я", ph: 'Іван' },
                                        { k: 'lastName', label: 'Прізвище', ph: 'Франко' },
                                    ].map(({ k, label, ph }) => (
                                        <div className="reg-field" key={k}>
                                            <label>
                                                {label}
                                                {touched[k] && errors[k] && <span className="ferr">{errors[k]}</span>}
                                            </label>
                                            <input
                                                type="text" placeholder={ph}
                                                value={form[k]} className={cls(k)}
                                                onChange={(e) => set(k, e.target.value)}
                                                onBlur={() => touch(k)}
                                            />
                                            {touched[k] && !errors[k] && <span className="fcheck">✅</span>}
                                        </div>
                                    ))}
                                </div>

                                {/* Email */}
                                <div className="reg-field">
                                    <label>
                                        Електронна пошта
                                        {touched.email && errors.email && <span className="ferr">{errors.email}</span>}
                                    </label>
                                    <input
                                        type="email" placeholder="ivan@example.com"
                                        value={form.email} className={cls('email')}
                                        onChange={(e) => set('email', e.target.value)}
                                        onBlur={() => touch('email')}
                                    />
                                    {touched.email && !errors.email && <span className="fcheck">✅</span>}
                                </div>

                                {/* Password */}
                                <div className="reg-field">
                                    <label>
                                        Пароль
                                        {touched.password && errors.password && <span className="ferr">{errors.password}</span>}
                                    </label>
                                    <input
                                        type={showPw ? 'text' : 'password'} placeholder="Мінімум 8 символів"
                                        value={form.password} className={cls('password')}
                                        style={{ paddingRight: '2.8rem' }}
                                        onChange={(e) => set('password', e.target.value)}
                                        onBlur={() => touch('password')}
                                    />
                                    <button type="button" className="pw-eye" onClick={() => setShowPw(!showPw)}>
                                        {showPw ? '🙈' : '👁️'}
                                    </button>
                                    {form.password && (
                                        <div className="pw-strength">
                                            {[0, 1, 2, 3].map((i) => (
                                                <div
                                                    key={i} className="pw-bar"
                                                    style={{ background: i < strength.score ? strength.color : undefined }}
                                                />
                                            ))}
                                            <span className="pw-lbl" style={{ color: strength.color }}>
                                                {strength.label}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm password */}
                                <div className="reg-field">
                                    <label>
                                        Підтвердження пароля
                                        {touched.confirm && errors.confirm && <span className="ferr">{errors.confirm}</span>}
                                    </label>
                                    <input
                                        type={showCf ? 'text' : 'password'} placeholder="Повторіть пароль"
                                        value={form.confirm} className={cls('confirm')}
                                        style={{ paddingRight: '2.8rem' }}
                                        onChange={(e) => set('confirm', e.target.value)}
                                        onBlur={() => touch('confirm')}
                                    />
                                    <button type="button" className="pw-eye" onClick={() => setShowCf(!showCf)}>
                                        {showCf ? '🙈' : '👁️'}
                                    </button>
                                </div>

                                {/* Terms */}
                                <div className="terms-row">
                                    <input
                                        type="checkbox" id="terms"
                                        checked={form.terms}
                                        onChange={(e) => set('terms', e.target.checked)}
                                        onBlur={() => touch('terms')}
                                    />
                                    <label htmlFor="terms">
                                        Я погоджуюсь з <a>Умовами використання</a> та{' '}
                                        <a>Політикою конфіденційності</a>
                                        {touched.terms && errors.terms && (
                                            <span style={{ display: 'block', color: 'var(--danger)', fontSize: '.72rem', marginTop: '.2rem' }}>
                                                {errors.terms}
                                            </span>
                                        )}
                                    </label>
                                </div>

                                <button type="submit" className="reg-submit">
                                    <span>Зареєструватись</span><span>→</span>
                                </button>

                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;