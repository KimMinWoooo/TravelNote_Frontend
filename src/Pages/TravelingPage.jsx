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

const NoTripMessage = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: #9ca3af;
    font-size: 1.1rem;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
    border-radius: 20px;
    border: 1px solid rgba(102, 126, 234, 0.1);
`;

const TripInfoCard = styled.div`
    background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.9));
    border-radius: 20px;
    padding: 28px 24px;
    margin-bottom: 24px;
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

const TripName = styled.div`
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const TripDate = styled.div`
    color: #6b7280;
    font-size: 1rem;
    font-weight: 500;
`;

const Section = styled.section`
    margin-bottom: 24px;
`;

const SectionTitle = styled.div`
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 12px;
    color: #4b5563;
`;

const TravelerList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const TravelerItem = styled.li`
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    border: 2px solid rgba(102, 126, 234, 0.2);
    border-radius: 12px;
    padding: 10px 16px;
    font-size: 1rem;
    font-weight: 500;
    color: #667eea;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        border-color: rgba(102, 126, 234, 0.3);
    }
`;

const SecretaryTag = styled.span`
    color: #764ba2;
    font-weight: bold;
    margin-left: 4px;
`;

const PaymentList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const PaymentItem = styled.li`
    background: linear-gradient(135deg, rgba(255, 248, 220, 0.7), rgba(255, 252, 232, 0.9));
    border: 2px solid rgba(251, 191, 36, 0.2);
    border-radius: 12px;
    margin-bottom: 12px;
    padding: 16px;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateX(4px);
        border-color: rgba(251, 191, 36, 0.4);
        box-shadow: 0 4px 12px rgba(251, 191, 36, 0.15);
    }
    
    &:last-child {
        margin-bottom: 0;
    }
`;

const PaymentName = styled.div`
    font-weight: bold;
    font-size: 1rem;
    color: #4b5563;
    margin-bottom: 4px;
`;

const PaymentAmount = styled.span`
    color: #667eea;
    font-weight: bold;
`;

const ChatButton = styled.button`
    width: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    font-size: 1.1rem;
    font-weight: bold;
    border: none;
    border-radius: 12px;
    padding: 14px 0;
    margin-top: 18px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 14px rgba(102, 126, 234, 0.3);
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
    
    &:active {
        transform: translateY(0);
    }
`;

const ChatModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const ChatModalContent = styled.div`
    background: linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,255,255,0.95));
    border-radius: 24px;
    padding: 28px;
    min-width: 280px;
    max-width: 400px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    height: 500px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.9);
    animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
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

const ChatModalTitle = styled.h3`
    font-size: 1.3rem;
    font-weight: bold;
    margin: 0 0 16px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const ChatHistoryContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    background: linear-gradient(135deg, #f8f9ff, #ffffff);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    border: 1px solid rgba(102, 126, 234, 0.1);
    min-height: 200px;
`;

const EmptyChatMessage = styled.div`
    color: #9ca3af;
    text-align: center;
    margin: 48px 0;
    font-size: 1rem;
`;

const ChatMessage = styled.div`
    margin-bottom: 16px;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

const ChatLabel = styled.div`
    color: #667eea;
    font-weight: bold;
    margin-bottom: 4px;
    font-size: 0.9rem;
`;

const UserMessage = styled.div`
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    border-radius: 12px;
    padding: 10px 14px;
    margin-bottom: 8px;
    color: #4b5563;
    line-height: 1.5;
`;

const BotMessage = styled.div`
    background: linear-gradient(135deg, rgba(255, 248, 220, 0.7), rgba(255, 252, 232, 0.9));
    border-radius: 12px;
    padding: 10px 14px;
    color: #4b5563;
    line-height: 1.5;
`;

const ChatForm = styled.form`
    display: flex;
    gap: 8px;
`;

const ChatInput = styled.input`
    flex: 1;
    padding: 12px 14px;
    border: 2px solid #e5e7eb;
    border-radius: 10px;
    outline: none;
    background: #f9fafb;
    transition: all 0.3s ease;
    font-size: 0.95rem;
    
    &:focus {
        border: 2px solid #667eea;
        background: #ffffff;
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    }
`;

const ChatSubmitButton = styled.button`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    font-size: 0.95rem;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    padding: 12px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    min-width: 60px;
    
    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const ChatCloseButton = styled.button`
    width: 100%;
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 12px;
    padding: 12px 0;
    margin-top: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
    
    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
    }
`;

function TravelingPage() {
    const [trip, setTrip] = useState(null);
    const [travelers, setTravelers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [chatLoading, setChatLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        const fetchCurrentTrip = async () => {
            setLoading(true);
            setError('');
            try {
                // 현재 여행 API가 없으므로, 목록에서 가장 최근 항목을 선택
                const listRes = await apiClient.get('/api/trip');
                const list = Array.isArray(listRes.data) ? listRes.data : (listRes.data?.trips || []);
                if (list.length === 0) {
                    setTrip(null);
                } else {
                    const latest = list[list.length - 1];
                    const normalized = {
                        trip_id: latest.id ?? latest.trip_id,
                        name: latest.name,
                        start_date: latest.startDate ?? latest.start_date,
                        end_date: latest.endDate ?? latest.end_date
                    };
                    setTrip(normalized);
                    const travelersRes = await apiClient.get(`/api/traveler?tripId=${normalized.trip_id}`);
                    setTravelers(travelersRes.data.travelers || []);
                    const paymentsRes = await apiClient.get(`/api/payment?tripId=${normalized.trip_id}`);
                    const payList = Array.isArray(paymentsRes.data) ? paymentsRes.data : (paymentsRes.data.payments || []);
                    setPayments(payList.map(p => ({
                        payment_id: p.paymentId ?? p.payment_id ?? p.id,
                        traveler_id: p.travelerId ?? p.traveler_id,
                        name: p.name,
                        cost: p.cost
                    })));
                }
            } catch (e) {
                setError('여행 정보를 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentTrip();
    }, []);

    return (
        <PageContainer>
            <PageTitle>여행 중</PageTitle>
            {loading && <LoadingMessage>불러오는 중...</LoadingMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {trip ? (
                <>
                    <TripInfoCard>
                        <TripName>{trip.name}</TripName>
                        <TripDate>{trip.start_date} ~ {trip.end_date}</TripDate>
                    </TripInfoCard>
                    
                    <Section>
                        <SectionTitle>여행자</SectionTitle>
                        <TravelerList>
                            {travelers.map(t => (
                                <TravelerItem key={t.traveler_id}>
                                    {t.name} {t.is_secretary ? <SecretaryTag>(총무)</SecretaryTag> : null}
                                </TravelerItem>
                            ))}
                        </TravelerList>
                    </Section>
                    
                    <Section>
                        <SectionTitle>지출 내역</SectionTitle>
                        <PaymentList>
                            {payments.map(p => (
                                <PaymentItem key={p.payment_id}>
                                    <PaymentName>{p.name} <PaymentAmount>({p.cost.toLocaleString()}원)</PaymentAmount></PaymentName>
                                </PaymentItem>
                            ))}
                        </PaymentList>
                    </Section>
                    
                    <ChatButton onClick={() => setShowChat(true)}>🤖 여행 챗봇</ChatButton>
                    
                    {showChat && (
                        <ChatModalOverlay onClick={() => setShowChat(false)}>
                            <ChatModalContent onClick={e => e.stopPropagation()}>
                                <ChatModalTitle>여행 챗봇</ChatModalTitle>
                                <ChatHistoryContainer>
                                    {chatHistory.length === 0 && <EmptyChatMessage>질문을 입력해보세요! 💬</EmptyChatMessage>}
                                    {chatHistory.map((msg, idx) => (
                                        <ChatMessage key={idx}>
                                            <ChatLabel>나:</ChatLabel>
                                            <UserMessage>{msg.question}</UserMessage>
                                            <ChatLabel style={{ color: '#dc2626' }}>챗봇:</ChatLabel>
                                            <BotMessage>{msg.answer}</BotMessage>
                                        </ChatMessage>
                                    ))}
                                </ChatHistoryContainer>
                                <ChatForm onSubmit={async e => {
                                    e.preventDefault();
                                    if (!chatInput.trim()) return;
                                    setChatLoading(true);
                                    try {
                                        const res = await apiClient.post('/api/chat', {
                                            message: chatInput
                                        });
                                        setChatHistory(h => [...h, { question: chatInput, answer: res.data.answer }]);
                                        setChatInput('');
                                    } catch {
                                        setChatHistory(h => [...h, { question: chatInput, answer: '챗봇 응답에 실패했습니다.' }]);
                                    } finally {
                                        setChatLoading(false);
                                    }
                                }}>
                                    <ChatInput
                                        type="text"
                                        placeholder="여행 관련 질문을 입력하세요"
                                        value={chatInput}
                                        onChange={e => setChatInput(e.target.value)}
                                        disabled={chatLoading}
                                    />
                                    <ChatSubmitButton type="submit" disabled={chatLoading || !chatInput.trim()}>
                                        {chatLoading ? '전송중...' : '전송'}
                                    </ChatSubmitButton>
                                </ChatForm>
                                <ChatCloseButton onClick={() => setShowChat(false)}>닫기</ChatCloseButton>
                            </ChatModalContent>
                        </ChatModalOverlay>
                    )}
                </>
            ) : (
                <NoTripMessage>진행 중인 여행이 없습니다. 🧳</NoTripMessage>
            )}
        </PageContainer>
    );
}

export default TravelingPage;