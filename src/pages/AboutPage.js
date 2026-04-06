import SectionHeader from '../components/ui/SectionHeader';

const FEATURES = [
    ['🛡️', 'Безпека перш за все', 'Кожен маршрут перевірений командою та сертифікованими гідами.'],
    ['🌱', 'Сталий туризм', 'Дбаємо про природу та підтримуємо місцеві спільноти.'],
    ['📱', 'Зручна навігація', 'Офлайн-карти та GPS-треки для кожного маршруту.'],
    ['👥', 'Спільнота', '8 000+ мандрівників, які діляться досвідом та допомагають одне одному.'],
    ['🏆', 'Досвід з 2022 року', 'Понад 3 роки організовуємо безпечні походи для тисяч мандрівників.'],
];

const AboutPage = () => (
    <div className="page-wrapper">
        <section className="page-section">
            <div className="about-grid">
                <div>
                    <SectionHeader tag="Про нас" title="Ми — ваші провідники в природу" />
                    <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
                        TrailQuest заснований у 2022 році командою ентузіастів і досвідчених гідів.
                        Наша місія — зробити пішохідний туризм доступним та безпечним для кожного.
                    </p>
                    <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
                        Ми ретельно відбираємо кожен маршрут, співпрацюємо з місцевими громадами
                        та підтримуємо принципи сталого туризму.
                    </p>
                    <div className="about-features">
                        {FEATURES.map(([icon, title, desc]) => (
                            <div className="feat-item" key={title}>
                                <div className="feat-icon">{icon}</div>
                                <div>
                                    <div className="feat-title">{title}</div>
                                    <div className="feat-desc">{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="about-visual">🏕️</div>
            </div>
        </section>
    </div>
);

export default AboutPage;