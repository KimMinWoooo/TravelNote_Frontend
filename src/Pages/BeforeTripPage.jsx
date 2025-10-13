import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BeforeTripPage() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrips = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await axios.get('/api/trip', {
                    withCredentials: true
                });
                const list = Array.isArray(res.data) ? res.data : (res.data?.trips || []);
                setTrips(list.map(t => ({
                    trip_id: t.id ?? t.trip_id,
                    name: t.name,
                    start_date: t.startDate ?? t.start_date,
                    end_date: t.endDate ?? t.end_date
                })));
            } catch (e) {
                setError('여행 목록을 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);

    return (
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 24px 0' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 'bold', margin: '18px 0 12px 0' }}>내 여행 목록</h2>
            {loading && <div>불러오는 중...</div>}
            {error && <div style={{ color: '#e53935' }}>{error}</div>}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {trips.map(trip => (
                    <li key={trip.trip_id} style={{
                        background: '#f8f9fa',
                        borderRadius: 8,
                        marginBottom: 12,
                        padding: '16px 14px',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate(`/trip/${trip.trip_id}`)}
                    >
                        <div style={{ fontWeight: 'bold', fontSize: '1.08rem' }}>{trip.name}</div>
                        <div style={{ fontSize: '0.97rem', color: '#666', marginTop: 4 }}>
                            {trip.start_date} ~ {trip.end_date}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BeforeTripPage;