import { NavLink } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function NavBar() {
    return (
        <nav className="nav">
            <div className="container nav-inner">
                <div className="nav-brand">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M3 12h18M12 3v18" />
                    </svg>
                    Курсы валют
                </div>
                <div className="nav-links">
                    <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                        Конвертер
                    </NavLink>
                    <NavLink to="/rates" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                        Курсы
                    </NavLink>
                </div>
                <ThemeToggle />
            </div>
        </nav>
    );
}