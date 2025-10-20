import React, { useEffect, useState } from 'react';
import apiClient from '../config/axios';

function UserInfoPage() {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMe = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await apiClient.get('/api/member/me');
                setInfo(res.data);
            } catch {
                setError('내 정보를 불러오지 못했습니다. 로그인 상태를 확인하세요.');
            } finally {
                setLoading(false);
            }
        };
        fetchMe();
    }, []);

    return (
        <div style={{ maxWidth: 480, margin: '0 auto', paddingBottom: 24 }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 'bold', margin: '18px 0 12px 0' }}>내 정보</h2>
            {loading && <div>불러오는 중...</div>}
            {error && <div style={{ color: '#e53935' }}>{error}</div>}
            {info && (
                <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 16 }}>
                    <div style={{ marginBottom: 8 }}><b>이름</b>: {info.name ?? '-'}</div>
                    <div><b>ID</b>: {info.email ?? '-'}</div>
                </div>
            )}
        </div>
    );
}

export default UserInfoPage;
