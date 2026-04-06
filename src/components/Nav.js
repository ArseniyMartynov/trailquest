import { useState, useEffect, useRef } from 'react';
import { BLOG_POSTS, CAT_LABELS } from '../data';
import '../styles/nav.css';

function Nav({ currentPage, onNavigate, onRegister }) {
    const [drop, setDrop] = useState(null);
    const [mobileOpen, setMob] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setDrop(null); };
        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, []);

    const go = (page, extra) => { onNavigate(page, extra); setDrop(null); setMob(false); };

    const isActive = (p) => currentPage === p ? "active" : "";

    return (
        <>
        <nav className="main-nav" ref={ref}>
            <div className="nav-logo" onClick={() => go("home")}>Trail<span>Quest</span></div>

            <div className="nav-links">
                <div className="nav-item">
                    <button className={`nav-btn ${isActive("routes")} ${drop === "routes" ? "open" : ""}`}
                        onClick={() => setDrop(drop === "routes" ? null : "routes")}>
                        Маршрути <span className="nav-arr">▾</span>
                    </button>
                    {drop === "routes" && (
                        <div className="nav-dropdown">
                            {Object.entries(CAT_LABELS).map(([k, v]) => (
                                <button key={k} className="dd-item" onClick={() => go("routes", k)}>{v}</button>
                            ))}
                            <button className="dd-item" onClick={() => go("routes")}>Всі маршрути</button>
                        </div>
                    )}
                </div>

                <div className="nav-item">
                    <button className={`nav-btn ${isActive("blog")} ${drop === "blog" ? "open" : ""}`}
                        onClick={() => setDrop(drop === "blog" ? null : "blog")}>
                        Блог <span className="nav-arr">▾</span>
                    </button>
                    {drop === "blog" && (
                        <div className="nav-dropdown">
                            {BLOG_POSTS.map(p => (
                                <button key={p.id} className="dd-item" onClick={() => go("blog-article", p)}>
                                    {p.emoji} {p.title.slice(0, 28)}…
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button className={`nav-btn ${isActive("about")}`} onClick={() => go("about")}>Про нас</button>
                <button className={`nav-btn ${isActive("faq")}`} onClick={() => go("faq")}>FAQ</button>
                <button className={`nav-btn ${isActive("contact")}`} onClick={() => go("contact")}>Контакти</button>
            </div>

            <button className="nav-cta" onClick={onRegister}>Реєстрація</button>
            <button className="hamburger" onClick={() => setMob(!mobileOpen)}>{mobileOpen ? "✕" : "☰"}</button>

            
            </nav>
            {mobileOpen && (
                <div className="mobile-menu">
                    <button className="mob-btn" onClick={() => go("home")}>🏠 Головна</button>
                    <button className="mob-btn" onClick={() => go("routes")}>🗺️ Маршрути</button>
                    {Object.entries(CAT_LABELS).map(([k, v]) => (
                        <button key={k} className="mob-btn" style={{ paddingLeft: "2.5rem", fontSize: ".9rem" }} onClick={() => go("routes", k)}>→ {v}</button>
                    ))}
                    <button className="mob-btn" onClick={() => go("blog")}>📝 Блог</button>
                    <button className="mob-btn" onClick={() => go("about")}>👥 Про нас</button>
                    <button className="mob-btn" onClick={() => go("faq")}>❓ FAQ</button>
                    <button className="mob-btn" onClick={() => go("contact")}>📬 Контакти</button>
                    <button className="mob-btn mob-accent" onClick={() => { onRegister(); setMob(false); }}>✨ Реєстрація</button>
                </div>
            )}
        </>
    );
}

export default Nav;
