import React, { useEffect, useState } from 'react';
import apiClient from '../config/axios';

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
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 24px 0' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 'bold', margin: '18px 0 12px 0' }}>여행 중</h2>
            {loading && <div>불러오는 중...</div>}
            {error && <div style={{ color: '#e53935' }}>{error}</div>}
            {trip ? (
                <>
                    <div style={{ fontWeight: 'bold', fontSize: '1.08rem', marginBottom: 6 }}>{trip.name}</div>
                    <div style={{ color: '#666', fontSize: '0.97rem', marginBottom: 10 }}>{trip.start_date} ~ {trip.end_date}</div>
                    <section style={{ marginBottom: 18 }}>
                        <div style={{ fontWeight: 'bold', marginBottom: 6 }}>여행자</div>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: 8 }}>
                            {travelers.map(t => (
                                <li key={t.traveler_id} style={{ background: '#e3f2fd', borderRadius: 6, padding: '6px 12px', fontSize: '0.98rem' }}>
                                    {t.name} {t.is_secretary ? <span style={{ color: '#1976d2', fontWeight: 'bold' }}>(총무)</span> : null}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section style={{ marginBottom: 18 }}>
                        <div style={{ fontWeight: 'bold', marginBottom: 6 }}>지출 내역</div>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {payments.map(p => (
                                <li key={p.payment_id} style={{ background: '#fffde7', borderRadius: 6, marginBottom: 8, padding: '8px 10px', fontSize: '0.97rem' }}>
                                    <div style={{ fontWeight: 'bold' }}>{p.name} <span style={{ color: '#1976d2', fontWeight: 'normal' }}>({p.cost.toLocaleString()}원)</span></div>
                                    {/* <div style={{ color: '#888', fontSize: '0.95rem' }}>작성자: {travelers.find(t => t.traveler_id === p.traveler_id)?.name || '-'}</div> */}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <button className="loginbox-btn" style={{ width: '100%', marginTop: 18 }} onClick={() => setShowChat(true)}>여행 챗봇</button>
                    {showChat && (
                        <div style={{ position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowChat(false)}>
                            <div style={{ background: '#fff', borderRadius: 12, padding: 24, minWidth: 260, maxWidth: 340, boxShadow: '0 2px 12px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', height: 420 }} onClick={e => e.stopPropagation()}>
                                <h3 style={{ fontSize: '1.08rem', fontWeight: 'bold', marginBottom: 12 }}>여행 챗봇</h3>
                                <div style={{ flex: 1, overflowY: 'auto', background: '#f8f9fa', borderRadius: 8, padding: 10, marginBottom: 10 }}>
                                    {chatHistory.length === 0 && <div style={{ color: '#888', textAlign: 'center', margin: '24px 0' }}>질문을 입력해보세요!</div>}
                                    {chatHistory.map((msg, idx) => (
                                        <div key={idx} style={{ marginBottom: 10 }}>
                                            <div style={{ color: '#1976d2', fontWeight: 'bold', marginBottom: 2 }}>나:</div>
                                            <div style={{ background: '#e3f2fd', borderRadius: 6, padding: '6px 10px', marginBottom: 4 }}>{msg.question}</div>
                                            <div style={{ color: '#388e3c', fontWeight: 'bold', marginBottom: 2 }}>챗봇:</div>
                                            <div style={{ background: '#fffde7', borderRadius: 6, padding: '6px 10px' }}>{msg.answer}</div>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={async e => {
                                    e.preventDefault();
                                    if (!chatInput.trim()) return;
                                    setChatLoading(true);
                                    try {
                                        // 실제 챗봇 API 엔드포인트로 요청
                                        const res = await axios.post('http://localhost:3001/api/chat', {
                                            message: chatInput
                                        });
                                        setChatHistory(h => [...h, { question: chatInput, answer: res.data.answer }]);
                                        setChatInput('');
                                    } catch {
                                        setChatHistory(h => [...h, { question: chatInput, answer: '챗봇 응답에 실패했습니다.' }]);
                                    } finally {
                                        setChatLoading(false);
                                    }
                                }} style={{ display: 'flex', gap: 6 }}>
                                    <input
                                        className="loginbox-input"
                                        type="text"
                                        placeholder="여행 관련 질문을 입력하세요"
                                        value={chatInput}
                                        onChange={e => setChatInput(e.target.value)}
                                        style={{ flex: 1 }}
                                        disabled={chatLoading}
                                    />
                                    <button className="loginbox-btn" type="submit" disabled={chatLoading || !chatInput.trim()} style={{ minWidth: 60 }}>
                                        {chatLoading ? '전송중' : '전송'}
                                    </button>
                                </form>
                                <button className="loginbox-btn" style={{ width: '100%', marginTop: 10 }} onClick={() => setShowChat(false)}>닫기</button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div>진행 중인 여행이 없습니다.</div>
            )}
        </div>
    );
}

export default TravelingPage;