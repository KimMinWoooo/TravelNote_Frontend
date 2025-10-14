import React, { useState } from 'react';
import axios from 'axios';

function AddTripInfoPage() {
    const [name, setName] = useState('');
    const [travelerName, setTravelerName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !travelerName || !startDate || !endDate) {
            setError('모든 항목을 입력하세요.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await axios.post('/api/trip', {
                memberId: 1,
                travelerName: travelerName,
                startDate: startDate,
                endDate: endDate,
                tripName: name
            }, {
                withCredentials: true
            });
            setSuccess(true);
            setTimeout(() => {
                window.location.href = '/before';
            }, 1200);
        } catch (e) {
            setError('여행 생성에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="loginbox-form" onSubmit={handleSubmit} style={{ marginTop: 40 }}>
            <h2 className="loginbox-title">여행 생성</h2>
            <input
                className="loginbox-input"
                type="text"
                placeholder="여행 이름"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                className="loginbox-input"
                type="text"
                placeholder="초기 여행자(총무) 이름"
                value={travelerName}
                onChange={e => setTravelerName(e.target.value)}
            />
            <input
                className="loginbox-input"
                type="date"
                placeholder="시작 날짜"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
            />
            <input
                className="loginbox-input"
                type="date"
                placeholder="종료 날짜"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
            />
            {error && <div className="loginbox-error">{error}</div>}
            <button className="loginbox-btn" type="submit" disabled={loading}>
                {loading ? '생성 중...' : '여행 생성'}
            </button>
            {success && <div style={{ color: '#1976d2', textAlign: 'center', marginTop: 12 }}>여행 생성 성공! 목록으로 이동합니다.</div>}
        </form>
    );
}

export default AddTripInfoPage;