import { useState } from 'react';
import SectionHeader from '../components/ui/SectionHeader';

const CONTACT_INFO = [
    ['📍', 'Адреса', 'вул. Туристична 12, Львів'],
    ['📞', 'Телефон', '+38 (067) 123-45-67'],
    ['✉️', 'Email', 'hello@trailquest.ua'],
    ['💬', 'Telegram', '@trailquest_ua'],
];

const TOPICS = ['Запис на маршрут', 'Груповий похід', 'Спорядження', 'Інше'];

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', topic: '', msg: '' });
    const [sent, setSent] = useState(false);

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setForm({ name: '', email: '', topic: '', msg: '' });
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <div className="page-wrapper">
            <section className="page-section">
                <SectionHeader
                    tag="Контакти"
                    title="Зв'яжіться з нами"
                    sub="Маєш питання або хочеш організувати груповий похід? Ми завжди раді допомогти."
                />

                <div className="contact-wrap">
                    {/* Info column */}
                    <div>
                        <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                            Офіс відкритий у будні з 9:00 до 18:00. Для термінових питань —
                            телефонуйте або пишіть у Telegram.
                        </p>
                        {CONTACT_INFO.map(([icon, lbl, val]) => (
                            <div className="info-item" key={lbl}>
                                <div className="info-icon">{icon}</div>
                                <div>
                                    <div className="info-lbl">{lbl}</div>
                                    <div className="info-val">{val}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <div className="contact-box">
                        <div className="contact-title">Написати нам</div>
                        <form onSubmit={handleSubmit}>
                            <div className="fgroup">
                                <label>Ваше ім'я</label>
                                <input
                                    required type="text" placeholder="Іван Франко"
                                    value={form.name} onChange={(e) => set('name', e.target.value)}
                                />
                            </div>
                            <div className="fgroup">
                                <label>Email</label>
                                <input
                                    required type="email" placeholder="ivan@example.com"
                                    value={form.email} onChange={(e) => set('email', e.target.value)}
                                />
                            </div>
                            <div className="fgroup">
                                <label>Тема</label>
                                <select value={form.topic} onChange={(e) => set('topic', e.target.value)}>
                                    <option value="">Оберіть тему</option>
                                    {TOPICS.map((t) => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                            <div className="fgroup">
                                <label>Повідомлення</label>
                                <textarea
                                    rows={4} required placeholder="Ваше питання…"
                                    value={form.msg} onChange={(e) => set('msg', e.target.value)}
                                />
                            </div>
                            <button type="submit" className="submit-btn">Надіслати →</button>
                            {sent && (
                                <div className="success-banner">✅ Дякуємо! Відповімо найближчим часом.</div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;