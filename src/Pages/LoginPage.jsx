import React, { useState } from 'react';
import LoginBox from '../Components/LoginBox';
import apiClient from '../config/axios';

function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (registerId, password) => {
        setLoading(true);
        setError('');
        try {
            // 실제 API 엔드포인트는 명세서에 따라 수정 필요
            await apiClient.post('/api/member/login', {
                email: registerId,
                password: password
            });
            // JWT는 쿠키로 발급되므로 로컬 저장 불필요. 성공 시 이동
            window.location.href = '/before';
        } catch (e) {
            setError('로그인에 실패했습니다. 아이디/비밀번호를 확인하세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: 40 }}>
            <LoginBox onLogin={handleLogin} loading={loading} />
            {error && <div style={{ color: '#e53935', textAlign: 'center', marginTop: 12 }}>{error}</div>}
        </div>
    );
}

export default LoginPage;