import React, { useState } from 'react';
import axios from 'axios';

function SignupPage() {
    const [name, setName] = useState('');
    const [registerId, setRegisterId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !registerId || !password) {
            setError('모든 항목을 입력하세요.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            // 실제 API 엔드포인트는 명세서에 따라 수정 필요
            await axios.post('api/member/signup', {
                name,
                register_id: registerId,
                password
            });
            setSuccess(true);
            setTimeout(() => {
                window.location.href = '/login';
            }, 1200);
        } catch (e) {
            setError('회원가입에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="loginbox-form" onSubmit={handleSubmit} style={{ marginTop: 40 }}>
            <h2 className="loginbox-title">회원가입</h2>
            <input
                className="loginbox-input"
                type="text"
                placeholder="이름"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                className="loginbox-input"
                type="text"
                placeholder="아이디"
                value={registerId}
                onChange={e => setRegisterId(e.target.value)}
            />
            <input
                className="loginbox-input"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            {error && <div className="loginbox-error">{error}</div>}
            <button className="loginbox-btn" type="submit" disabled={loading}>
                {loading ? '가입 중...' : '회원가입'}
            </button>
            {success && <div style={{ color: '#1976d2', textAlign: 'center', marginTop: 12 }}>회원가입 성공! 로그인 페이지로 이동합니다.</div>}
        </form>
    );
}

export default SignupPage;