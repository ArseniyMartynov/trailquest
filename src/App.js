import { useState } from 'react';

import Nav from './components/Nav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RoutesPage from './pages/RoutesPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';

import './styles/global.css';
import './styles/pages.css';
import './styles/booking.css';

const App = () => {
    const [page, setPage] = useState({ name: 'home', extra: null });
    const [showRegister, setShowReg] = useState(false);

    const navigate = (name, extra = null) => {
        setPage({ name, extra });
        setShowReg(false);
        window.scrollTo(0, 0);
    };

    const openRegister = () => { setShowReg(true); window.scrollTo(0, 0); };
    const closeRegister = () => setShowReg(false);

    const renderPage = () => {
        if (showRegister) return <RegisterPage onClose={closeRegister} />;

        switch (page.name) {
            case 'home': return <HomePage onNavigate={navigate} onRegister={openRegister} />;
            case 'routes': return <RoutesPage initCat={page.extra} />;
            case 'blog': return <BlogPage />;
            case 'blog-article': return <BlogPage initPost={page.extra} />;
            case 'about': return <AboutPage />;
            case 'faq': return <FaqPage />;
            case 'contact': return <ContactPage />;
            default: return <HomePage onNavigate={navigate} onRegister={openRegister} />;
        }
    };

    return (
        <>
            {!showRegister && (
                <Nav
                    currentPage={page.name}
                    onNavigate={navigate}
                    onRegister={openRegister}
                />
            )}

            <main>{renderPage()}</main>

            {!showRegister && (
                <Footer onNavigate={navigate} onRegister={openRegister} />
            )}
        </>
    );
};

export default App;