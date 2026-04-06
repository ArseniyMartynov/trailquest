import { CAT_LABELS } from '../data';

const Footer = ({ onNavigate, onRegister }) => {
  const go = (page) => { onNavigate(page); window.scrollTo(0, 0); };

  return (
    <footer className="main-footer">
      <div className="footer-grid">

        <div className="footer-brand">
          <div className="nav-logo" style={{ fontSize: '1.2rem' }}>
            Trail<span>Quest</span>
          </div>
          <p>Платформа для відкриття та планування пішохідних маршрутів по Україні.</p>
        </div>

        <div className="footer-col">
          <h4>Маршрути</h4>
          {Object.entries(CAT_LABELS).map(([k, v]) => (
            <a key={k} onClick={() => go('routes')}>{v}</a>
          ))}
          <a onClick={() => go('routes')}>Всі маршрути</a>
        </div>

        <div className="footer-col">
          <h4>Компанія</h4>
          <a onClick={() => go('about')}>Про нас</a>
          <a onClick={() => go('faq')}>FAQ</a>
          <a onClick={() => go('contact')}>Контакти</a>
          <a onClick={onRegister}>Реєстрація</a>
        </div>

        <div className="footer-col">
          <h4>Ресурси</h4>
          <a onClick={() => go('blog')}>Блог</a>
          <a>Карта сайту</a>
          <a>Конфіденційність</a>
          <a>Умови використання</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 TrailQuest. Всі права захищено.</p>
        <div className="footer-links">
          <a onClick={() => go('faq')}>FAQ</a>
          <a>Конфіденційність</a>
          <a>Умови</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
