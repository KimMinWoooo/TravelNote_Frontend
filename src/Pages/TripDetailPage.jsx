import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TripDetailPage() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [travelers, setTravelers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const [addName, setAddName] = useState('');
    const [addCost, setAddCost] = useState('');
    const [addTravelerId, setAddTravelerId] = useState('');
    const [addLoading, setAddLoading] = useState(false);
    const [addError, setAddError] = useState('');
    const [showInvite, setShowInvite] = useState(false);
    const [inviteId, setInviteId] = useState('');
    const [inviteLoading, setInviteLoading] = useState(false);
    const [inviteError, setInviteError] = useState('');
    const [settleOpen, setSettleOpen] = useState(false);
    const [settleResult, setSettleResult] = useState(null);
    const [settleLoading, setSettleLoading] = useState(false);
    const [settleError, setSettleError] = useState('');
    const [memories, setMemories] = useState([]);
    const [memoryLoading, setMemoryLoading] = useState(false);
    const [memoryError, setMemoryError] = useState('');
    const [memoryPhoto, setMemoryPhoto] = useState(null);
    const [memoryPlace, setMemoryPlace] = useState('');
    const [memoryUploadLoading, setMemoryUploadLoading] = useState(false);
    const [memoryUploadError, setMemoryUploadError] = useState('');

    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            setError('');
            try {
                const token = localStorage.getItem('token');
                const tripRes = await axios.get(`/api/trip/${tripId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTrip(tripRes.data);
                const travelersRes = await axios.get(`/api/traveler/trip/${tripId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTravelers(travelersRes.data.travelers || []);
                const paymentsRes = await axios.get(`/api/payment/trip/${tripId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPayments(paymentsRes.data.payments || []);
            } catch (e) {
                setError('여행 상세 정보를 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [tripId]);

    useEffect(() => {
        // 추억 모음집 불러오기
        const fetchMemories = async () => {
            setMemoryLoading(true);
            setMemoryError('');
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`/api/memory/trip/${tripId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMemories(res.data.memories || []);
            } catch {
                setMemoryError('추억 모음집을 불러오지 못했습니다.');
            } finally {
                setMemoryLoading(false);
            }
        };
        fetchMemories();
    }, [tripId]);

    const handleAddPayment = async (e) => {
        e.preventDefault();
        if (!addName || !addCost || !addTravelerId) {
            setAddError('모든 항목을 입력하세요.');
            return;
        }
        setAddLoading(true);
        setAddError('');
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/payment', {
                name: addName,
                cost: Number(addCost),
                traveler_id: addTravelerId,
                trip_id: tripId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowAdd(false);
            setAddName('');
            setAddCost('');
            setAddTravelerId('');
            // 새로고침
            const paymentsRes = await axios.get(`/api/payment/trip/${tripId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPayments(paymentsRes.data.payments || []);
        } catch (e) {
            setAddError('지출 추가에 실패했습니다.');
        } finally {
            setAddLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 24px 0' }}>
            {loading && <div>불러오는 중...</div>}
            {error && <div style={{ color: '#e53935' }}>{error}</div>}
            {trip && (
                <>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 'bold', margin: '18px 0 12px 0' }}>{trip.name}</h2>
                    <div style={{ color: '#666', fontSize: '0.97rem', marginBottom: 10 }}>{trip.start_date} ~ {trip.end_date}</div>
                    <section style={{ marginBottom: 18 }}>
                        <div style={{ fontWeight: 'bold', marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>여행자</span>
                            <button className="loginbox-btn" style={{ fontSize: '0.98rem', padding: '6px 12px', width: 'auto', margin: 0 }} onClick={() => setShowInvite(v => !v)}>
                                {showInvite ? '취소' : '멤버 초대'}
                            </button>
                        </div>
                        {showInvite && (
                            <form onSubmit={async e => {
                                e.preventDefault();
                                if (!inviteId) {
                                    setInviteError('아이디를 입력하세요.');
                                    return;
                                }
                                setInviteLoading(true);
                                setInviteError('');
                                try {
                                    const token = localStorage.getItem('token');
                                    await axios.post('/api/traveler', {
                                        trip_id: tripId,
                                        register_id: inviteId
                                    }, {
                                        headers: { Authorization: `Bearer ${token}` }
                                    });
                                    setShowInvite(false);
                                    setInviteId('');
                                    // 목록 갱신
                                    const travelersRes = await axios.get(`/api/traveler/trip/${tripId}`, {
                                        headers: { Authorization: `Bearer ${token}` }
                                    });
                                    setTravelers(travelersRes.data.travelers || []);
                                } catch {
                                    setInviteError('초대에 실패했습니다.');
                                } finally {
                                    setInviteLoading(false);
                                }
                            }} style={{ background: '#e3f2fd', borderRadius: 8, padding: 12, marginBottom: 10 }}>
                                <input
                                    className="loginbox-input"
                                    type="text"
                                    placeholder="초대할 멤버 아이디"
                                    value={inviteId}
                                    onChange={e => setInviteId(e.target.value)}
                                    style={{ marginBottom: 8 }}
                                />
                                {inviteError && <div className="loginbox-error">{inviteError}</div>}
                                <button className="loginbox-btn" type="submit" disabled={inviteLoading} style={{ width: '100%' }}>
                                    {inviteLoading ? '초대 중...' : '초대하기'}
                                </button>
                            </form>
                        )}
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: 8 }}>
                            {travelers.map(t => (
                                <li key={t.traveler_id} style={{ background: '#e3f2fd', borderRadius: 6, padding: '6px 12px', fontSize: '0.98rem' }}>
                                    {t.name} {t.is_secretary ? <span style={{ color: '#1976d2', fontWeight: 'bold' }}>(총무)</span> : null}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section style={{ marginBottom: 18 }}>
                        <div style={{ fontWeight: 'bold', marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>지출 내역</span>
                            <button className="loginbox-btn" style={{ fontSize: '0.98rem', padding: '6px 12px', width: 'auto', margin: 0 }} onClick={() => setShowAdd(v => !v)}>
                                {showAdd ? '취소' : '지출 추가'}
                            </button>
                        </div>
                        {showAdd && (
                            <form onSubmit={handleAddPayment} style={{ background: '#f1f8e9', borderRadius: 8, padding: 12, marginBottom: 10 }}>
                                <input
                                    className="loginbox-input"
                                    type="text"
                                    placeholder="지출명"
                                    value={addName}
                                    onChange={e => setAddName(e.target.value)}
                                    style={{ marginBottom: 8 }}
                                />
                                <input
                                    className="loginbox-input"
                                    type="number"
                                    placeholder="금액"
                                    value={addCost}
                                    onChange={e => setAddCost(e.target.value)}
                                    style={{ marginBottom: 8 }}
                                />
                                <select
                                    className="loginbox-input"
                                    value={addTravelerId}
                                    onChange={e => setAddTravelerId(e.target.value)}
                                    style={{ marginBottom: 8 }}
                                >
                                    <option value="">작성자 선택</option>
                                    {travelers.map(t => (
                                        <option key={t.traveler_id} value={t.traveler_id}>{t.name}</option>
                                    ))}
                                </select>
                                {addError && <div className="loginbox-error">{addError}</div>}
                                <button className="loginbox-btn" type="submit" disabled={addLoading} style={{ width: '100%' }}>
                                    {addLoading ? '추가 중...' : '추가하기'}
                                </button>
                            </form>
                        )}
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {payments.map(p => (
                                <li key={p.payment_id} style={{ background: '#fffde7', borderRadius: 6, marginBottom: 8, padding: '8px 10px', fontSize: '0.97rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{p.name} <span style={{ color: '#1976d2', fontWeight: 'normal' }}>({p.cost.toLocaleString()}원)</span></div>
                                        <div style={{ color: '#888', fontSize: '0.95rem' }}>작성자: {travelers.find(t => t.traveler_id === p.traveler_id)?.name || '-'}</div>
                                    </div>
                                    <button onClick={async () => {
                                        if (!window.confirm('정말 삭제하시겠습니까?')) return;
                                        const token = localStorage.getItem('token');
                                        try {
                                            await axios.delete(`/api/payment/${p.payment_id}`, {
                                                headers: { Authorization: `Bearer ${token}` }
                                            });
                                            // 삭제 후 목록 갱신
                                            const paymentsRes = await axios.get(`/api/payment/trip/${tripId}`, {
                                                headers: { Authorization: `Bearer ${token}` }
                                            });
                                            setPayments(paymentsRes.data.payments || []);
                                        } catch {
                                            alert('삭제에 실패했습니다.');
                                        }
                                    }} style={{ background: '#e57373', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontSize: '0.95rem', marginLeft: 8, cursor: 'pointer' }}>삭제</button>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section style={{ marginBottom: 18 }}>
                        <div style={{ fontWeight: 'bold', marginBottom: 6 }}>추억 모음집</div>
                        <form onSubmit={async e => {
                            e.preventDefault();
                            if (!memoryPhoto || !memoryPlace) {
                                setMemoryUploadError('사진과 장소를 모두 입력하세요.');
                                return;
                            }
                            setMemoryUploadLoading(true);
                            setMemoryUploadError('');
                            try {
                                const token = localStorage.getItem('token');
                                const formData = new FormData();
                                formData.append('photo', memoryPhoto);
                                formData.append('place', memoryPlace);
                                formData.append('trip_id', tripId);
                                await axios.post('/api/memory', formData, {
                                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
                                });
                                setMemoryPhoto(null);
                                setMemoryPlace('');
                                // 목록 갱신
                                const res = await axios.get(`/api/memory/trip/${tripId}`, {
                                    headers: { Authorization: `Bearer ${token}` }
                                });
                                setMemories(res.data.memories || []);
                            } catch {
                                setMemoryUploadError('업로드에 실패했습니다.');
                            } finally {
                                setMemoryUploadLoading(false);
                            }
                        }} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
                            <input type="file" accept="image/*" onChange={e => setMemoryPhoto(e.target.files[0])} />
                            <input className="loginbox-input" type="text" placeholder="장소명" value={memoryPlace} onChange={e => setMemoryPlace(e.target.value)} />
                            {memoryUploadError && <div className="loginbox-error">{memoryUploadError}</div>}
                            <button className="loginbox-btn" type="submit" disabled={memoryUploadLoading}>{memoryUploadLoading ? '업로드 중...' : '추억 업로드'}</button>
                        </form>
                        {memoryLoading && <div>불러오는 중...</div>}
                        {memoryError && <div style={{ color: '#e53935' }}>{memoryError}</div>}
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                            {memories.map(m => (
                                <li key={m.memory_id} style={{ width: 100, background: '#f8f9fa', borderRadius: 8, padding: 6, textAlign: 'center' }}>
                                    <img src={m.photo_url} alt={m.place} style={{ width: '100%', height: 70, objectFit: 'cover', borderRadius: 6, marginBottom: 4 }} />
                                    <div style={{ fontSize: '0.95rem', color: '#1976d2', fontWeight: 'bold' }}>{m.place}</div>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <button className="loginbox-btn" style={{ width: '100%', marginTop: 18 }} onClick={async () => {
                        setSettleOpen(true);
                        setSettleLoading(true);
                        setSettleError('');
                        try {
                            const token = localStorage.getItem('token');
                            const res = await axios.get(`/api/payment/settle/${tripId}`, {
                                headers: { Authorization: `Bearer ${token}` }
                            });
                            setSettleResult(res.data);
                        } catch {
                            setSettleError('정산 결과를 불러오지 못했습니다.');
                        } finally {
                            setSettleLoading(false);
                        }
                    }}>
                        정산하기
                    </button>
                    {settleOpen && (
                        <div style={{ position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSettleOpen(false)}>
                            <div style={{ background: '#fff', borderRadius: 12, padding: 24, minWidth: 260, maxWidth: 340, boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }} onClick={e => e.stopPropagation()}>
                                <h3 style={{ fontSize: '1.08rem', fontWeight: 'bold', marginBottom: 12 }}>정산 결과</h3>
                                {settleLoading && <div>계산 중...</div>}
                                {settleError && <div style={{ color: '#e53935' }}>{settleError}</div>}
                                {settleResult && Array.isArray(settleResult.settles) && (
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {settleResult.settles.map((s, idx) => (
                                            <li key={idx} style={{ marginBottom: 8, fontSize: '0.98rem' }}>
                                                <span style={{ fontWeight: 'bold' }}>{s.from}</span> → <span style={{ color: '#1976d2', fontWeight: 'bold' }}>{s.to}</span> : <span style={{ color: '#388e3c' }}>{s.amount.toLocaleString()}원</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <button className="loginbox-btn" style={{ width: '100%', marginTop: 12 }} onClick={() => setSettleOpen(false)}>닫기</button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default TripDetailPage; 