import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import AddTripInfoPage from './Pages/AddTripInfoPage';
import BeforeTripPage from './Pages/BeforeTripPage';
import TravelingPage from './Pages/TravelingPage';
import TripDetailPage from './Pages/TripDetailPage';
import './App.css';

function Header({ title }) {
    return <header className="header">{title}</header>;
}

function BottomNav() {
    // TODO: 현재 경로에 따라 활성화 표시
    return (
        <nav className="bottom-nav">
            <a href="/before" className="bottom-nav__item">여행목록</a>
            <a href="/add" className="bottom-nav__item">여행생성</a>
            <a href="/traveling" className="bottom-nav__item">여행중</a>
            <a href="/login" className="bottom-nav__item">내정보</a>
        </nav>
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