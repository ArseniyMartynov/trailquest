import { useState } from 'react';
import { FAQ_DATA } from '../data';
import SectionHeader from '../components/ui/SectionHeader';

const FaqPage = () => {
    const [activeCat, setActiveCat] = useState(null);
    const [openKey, setOpenKey] = useState(null);
    const [search, setSearch] = useState('');

    // Filter groups based on active category and search query
    const filtered = FAQ_DATA
        .map((group) => ({
            ...group,
            items: group.items.filter((item) =>
                !search ||
                item.q.toLowerCase().includes(search.toLowerCase()) ||
                item.a.toLowerCase().includes(search.toLowerCase())
            ),
        }))
        .filter((g) => (!activeCat || g.category === activeCat) && g.items.length > 0);

    const toggle = (key) => setOpenKey(openKey === key ? null : key);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setOpenKey(null); // collapse all when searching
    };

    return (
        <div className="page-wrapper">
            <section className="page-section">
                <SectionHeader
                    tag="FAQ"
                    title="Часті запитання"
                    sub="Знайди відповідь на своє питання або зв'яжись з нашою командою підтримки."
                />

                <div className="faq-layout">

                    {/* ── Sidebar ── */}
                    <aside className="faq-sidebar">
                        <button
                            className={`faq-cat-btn ${!activeCat ? 'faq-active' : ''}`}
                            onClick={() => setActiveCat(null)}
                        >
                            <span>🔍</span> Всі категорії
                        </button>
                        {FAQ_DATA.map((g) => (
                            <button
                                key={g.category}
                                className={`faq-cat-btn ${activeCat === g.category ? 'faq-active' : ''}`}
                                onClick={() => setActiveCat(activeCat === g.category ? null : g.category)}
                            >
                                <span>{g.emoji}</span> {g.category}
                            </button>
                        ))}
                    </aside>

                    {/* ── Content ── */}
                    <div>
                        {/* Search */}
                        <div className="faq-search">
                            <span>🔎</span>
                            <input
                                placeholder="Пошук по запитаннях…"
                                value={search}
                                onChange={handleSearch}
                            />
                            {search && (
                                <button className="faq-clear" onClick={() => setSearch('')}>✕</button>
                            )}
                        </div>

                        {filtered.length === 0 && (
                            <div className="faq-empty">
                                😕 Нічого не знайдено. Спробуй інший запит або{' '}
                                <strong style={{ color: 'var(--accent)' }}>зв'яжись з нами</strong>.
                            </div>
                        )}

                        <div className="faq-groups">
                            {filtered.map((group) => (
                                <div key={group.category}>
                                    <div className="faq-group-title">
                                        {group.emoji} {group.category}
                                    </div>
                                    <div className="faq-list">
                                        {group.items.map((item, i) => {
                                            const key = `${group.category}-${i}`;
                                            const isOpen = openKey === key;
                                            return (
                                                <div key={key} className={`faq-item ${isOpen ? 'faq-open' : ''}`}>
                                                    <button className="faq-q" onClick={() => toggle(key)}>
                                                        <span>{item.q}</span>
                                                        <span className="faq-arr">▾</span>
                                                    </button>
                                                    {isOpen && <div className="faq-a">{item.a}</div>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default FaqPage;