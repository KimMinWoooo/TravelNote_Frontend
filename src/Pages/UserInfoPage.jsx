import React, { useEffect, useState } from 'react';
import apiClient from '../config/axios';
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

const InfoCard = styled.div`
    background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.9));
    border-radius: 20px;
    padding: 28px 24px;
    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.12), 0 0 1px rgba(102, 126, 234, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.8);
    animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    
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
`;

const InfoRow = styled.div`
    padding: 16px 20px;
    margin-bottom: 12px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
    border-radius: 12px;
    border-left: 4px solid transparent;
    transition: all 0.3s ease;
    
    &:last-child {
        margin-bottom: 0;
    }
    
    &:hover {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
        border-left-color: #667eea;
        transform: translateX(4px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
    }
`;

const InfoLabel = styled.b`
    display: inline-block;
    min-width: 60px;
    color: #667eea;
    font-weight: 700;
    margin-right: 12px;
`;

const InfoValue = styled.span`
    color: #4b5563;
    font-weight: 500;
`;

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
        <PageContainer>
            <PageTitle>내 정보</PageTitle>
            {loading && <LoadingMessage>불러오는 중...</LoadingMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {info && (
                <InfoCard>
                    <InfoRow>
                        <InfoLabel>이름</InfoLabel>
                        <InfoValue>{info.name ?? '-'}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoLabel>ID</InfoLabel>
                        <InfoValue>{info.email ?? '-'}</InfoValue>
                    </InfoRow>
                </InfoCard>
            )}
        </PageContainer>
    );
}

export default UserInfoPage;
