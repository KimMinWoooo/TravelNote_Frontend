import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import AddTripInfoPage from './Pages/AddTripInfoPage';
import UserInfoPage from './Pages/UserInfoPage';
import BeforeTripPage from './Pages/BeforeTripPage';
import TravelingPage from './Pages/TravelingPage';
import TripDetailPage from './Pages/TripDetailPage';
import './App.css';

function Header({ title }) {
    return <header className="header">{title}</header>;
}

function BottomNav() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { path: '/before', label: '여행목록', icon: '📍' },
        { path: '/add', label: '여행생성', icon: '✈️' },
        { path: '/traveling', label: '여행중', icon: '🗺️' },
        { path: '/me', label: '내정보', icon: '👤' }
    ];

    const currentPath = location.pathname;

    // 로그인/회원가입 페이지에서는 메뉴 버튼을 표시하지 않음
    const isLoginOrSignup = currentPath === '/login' || currentPath === '/signup';
    if (isLoginOrSignup) {
        return null;
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleMenuItemClick = (e, path) => {
        e.preventDefault();
        window.location.href = path;
        closeMenu();
    };

    return (
        <>
            <button className="menu-button" onClick={toggleMenu} aria-label="메뉴 열기">
                <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </button>

            <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}>
                <nav className={`bottom-nav-drawer ${isMenuOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                    <div className="menu-header">
                        <h2 className="menu-title">메뉴</h2>
                        <button className="menu-close" onClick={closeMenu} aria-label="메뉴 닫기">×</button>
                    </div>
                    <ul className="menu-list">
                        {menuItems.map((item, index) => (
                            <li key={index} className={currentPath === item.path ? 'menu-active' : ''}>
                                <a 
                                    href={item.path} 
                                    className="menu-item"
                                    onClick={(e) => handleMenuItemClick(e, item.path)}
                                >
                                    <span className="menu-icon">{item.icon}</span>
                                    <span className="menu-label">{item.label}</span>
                                    {currentPath === item.path && <span className="menu-indicator">✓</span>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}

function App() {
    return (
        <Router>
            <div className="app-container">
                <Header title="TravelNote" />
                <main className="main-content">
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/me" element={<UserInfoPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/add" element={<AddTripInfoPage />} />
                        <Route path="/before" element={<BeforeTripPage />} />
                        <Route path="/traveling" element={<TravelingPage />} />
                        <Route path="/trip/:tripId" element={<TripDetailPage />} />
                        <Route path="/" element={<Navigate to="/login" replace />} />
                    </Routes>
                </main>
                <BottomNav />
            </div>
        </Router>
    );
}

export default App;