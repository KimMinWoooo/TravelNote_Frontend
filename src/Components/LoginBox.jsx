import React, { useState } from 'react';
import './LoginBox.css';

function LoginBox({ onLogin, loading }) {
    const [registerId, setRegisterId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!registerId || !password) {
            setError('아이디와 비밀번호를 입력하세요.');
            return;
        }
        setError('');
        onLogin(registerId, password);
    };

    return (
        <form className="loginbox-form" onSubmit={handleSubmit}>
            <h2 className="loginbox-title">로그인</h2>
            <input
                className="loginbox-input"
                type="text"
                placeholder="아이디"
                value={registerId}
                onChange={e => setRegisterId(e.target.value)}
                autoComplete="username"
            />
            <input
                className="loginbox-input"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
            />
            {error && <div className="loginbox-error">{error}</div>}
            <button className="loginbox-btn" type="submit" disabled={loading}>
                {loading ? '로그인 중...' : '로그인'}
            </button>
            <div className="loginbox-bottom">
                <a href="/signup">회원가입</a>
            </div>
        </form>
    );
}

export default LoginBox;