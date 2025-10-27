import React, { useEffect, useState } from 'react';
import apiClient from '../config/axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
    max-width: 480px;
    margin: 0 auto;
    padding: 24px 20px;
`;

const PageTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0 0 28px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 40px 20px;
    color: #6b7280;
    font-size: 1.1rem;
    font-weight: 500;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;

const ErrorMessage = styled.div`
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 16px 20px;
    border-radius: 12px;
    font-size: 1rem;
    margin: 20px 0;
    box-shadow: 0 2px 8px rgba(220, 38, 38, 0.1);
`;

const EmptyMessage = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: #9ca3af;
    font-size: 1.1rem;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
    border-radius: 20px;
    border: 1px solid rgba(102, 126, 234, 0.1);
`;

const TripList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const TripCard = styled.li`
    background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.9));
    border-radius: 20px;
    margin-bottom: 16px;
    padding: 24px;
    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.12), 0 0 1px rgba(102, 126, 234, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.8);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    animation-delay: ${props => props.index * 0.1}s;
    animation-fill-mode: both;
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 48px rgba(102, 126, 234, 0.18);
        border-color: rgba(102, 126, 234, 0.3);
    }
    
    &:active {
        transform: translateY(-2px);
    }
`;

const TripName = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const TripDate = styled.div`
    font-size: 1rem;
    color: #6b7280;
    font-weight: 500;
`;

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
                const res = await apiClient.get('/api/trip');
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
        <PageContainer>
            <PageTitle>내 여행 목록</PageTitle>
            {loading && <LoadingMessage>불러오는 중...</LoadingMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {trips.length === 0 && !loading && (
                <EmptyMessage>아직 등록된 여행이 없습니다. 🧳</EmptyMessage>
            )}
            {trips.length > 0 && (
                <TripList>
                    {trips.map((trip, index) => (
                        <TripCard 
                            key={trip.trip_id} 
                            index={index}
                            onClick={() => navigate(`/trip/${trip.trip_id}`)}
                        >
                            <TripName>{trip.name}</TripName>
                            <TripDate>{trip.start_date} ~ {trip.end_date}</TripDate>
                        </TripCard>
                    ))}
                </TripList>
            )}
        </PageContainer>
    );
}

export default BeforeTripPage;