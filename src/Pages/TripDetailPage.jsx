import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../config/axios';

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
    const [acctInputs, setAcctInputs] = useState({});
    const [settlement, setSettlement] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            setError('');
            try {
                const tripRes = await apiClient.get(`/api/trip/${tripId}`);
                const t = tripRes.data;
                setTrip({
                    name: t.name,
                    start_date: t.startDate ?? t.start_date,
                    end_date: t.endDate ?? t.end_date
                });
                const travelersRes = await apiClient.get(`/api/traveler?tripId=${tripId}`);
                const tv = travelersRes.data.travelers || [];
                const mappedTv = tv.map(x => ({
                    traveler_id: x.travelerId ?? x.traveler_id,
                    member_id: x.memberId ?? x.member_id,
                    name: x.name,
                    total_cost: x.totalCost ?? x.total_cost ?? 0,
                    account_number: x.accountNumber ?? x.account_number ?? '',
                    is_secretary: x.isSecretary ?? x.is_secretary ?? false
                }));
                setTravelers(mappedTv);
                setAcctInputs(Object.fromEntries(mappedTv.map(t => [t.traveler_id, t.account_number || ''])));
                const paymentsRes = await apiClient.get(`/api/payment?tripId=${tripId}`);
                const list = Array.isArray(paymentsRes.data) ? paymentsRes.data : (paymentsRes.data.payments || []);
                setPayments(list.map(p => ({
                    payment_id: p.paymentId ?? p.payment_id ?? p.id,
                    traveler_id: p.travelerId ?? p.traveler_id,
                    name: p.name,
                    cost: p.cost
                })));
            } catch (e) {
                setError('여행 상세 정보를 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
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
            await apiClient.post('/api/payment', {
                name: addName,
                cost: Number(addCost),
                travelerId: Number(addTravelerId)
            });
            setShowAdd(false);
            setAddName('');
            setAddCost('');
            setAddTravelerId('');
            // 새로고침
            const paymentsRes = await axios.get(`/api/payment?tripId=${tripId}`, { withCredentials: true });
            const list = Array.isArray(paymentsRes.data) ? paymentsRes.data : (paymentsRes.data.payments || []);
            setPayments(list.map(p => ({
                payment_id: p.paymentId ?? p.payment_id ?? p.id,
                traveler_id: p.travelerId ?? p.traveler_id,
                name: p.name,
                cost: p.cost
            })));
        } catch (e) {
            setAddError('지출 추가에 실패했습니다.');
        } finally {
            setAddLoading(false);
        }
    };

    const handleAccountSave = async (travelerId) => {
        const accountNumber = acctInputs[travelerId] || '';
        try {
            await apiClient.put(`/api/traveler/${travelerId}/account-number`, { accountNumber });
            setTravelers(prev => prev.map(t => t.traveler_id === travelerId ? { ...t, account_number: accountNumber } : t));
        } catch (e) {
            alert('계좌번호 저장에 실패했습니다.');
        }
    };

    const handleEndTrip = () => {
        // 총무 1명 기준: 총무는 대신 결제했고, 각 멤버 total_cost는 개인 사용액.
        // 1인당 부담액 = 총지출 / 인원. 각자 balance = 개인사용액 - 1인당.
        // 송금은 balance<0 인 사람이 총무에게 지불하는 구조로 단순화.
        const totals = travelers.map(t => ({ id: t.traveler_id, name: t.name, cost: Number(t.total_cost || 0), isSec: !!t.is_secretary }));
        const total = totals.reduce((s, x) => s + x.cost, 0);
        const n = totals.length || 1;
        const perCapita = Math.round(total / n);
        const items = totals.map(x => ({ ...x, balance: x.cost - perCapita }));
        const treasurer = items.find(i => i.isSec) || items[0];
        const transfers = items
            .filter(i => i.id !== treasurer.id && i.balance < 0)
            .map(i => ({ from: i.id, to: treasurer.id, amount: -i.balance }));
        setSettlement({ total, perCapita, items, transfers });
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
                                    await apiClient.post('/api/traveler', {
                                        memberId: 1,
                                        tripId: Number(tripId),
                                        name: inviteId,
                                        isSecretary: false
                                    });
                                    setShowInvite(false);
                                    setInviteId('');
                                    // 목록 갱신
                                    const travelersRes = await apiClient.get(`/api/traveler?tripId=${tripId}`);
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
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {travelers.map(t => (
                                <li key={t.traveler_id} style={{ background: '#e3f2fd', borderRadius: 6, padding: '10px 12px', fontSize: '0.98rem', display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{t.name} {t.is_secretary ? <span style={{ color: '#1976d2', fontWeight: 'bold' }}>(총무)</span> : null}</div>
                                        <div style={{ color: '#666', fontSize: '0.92rem' }}>총 지출: {Number(t.total_cost || 0).toLocaleString()}원</div>
                                    </div>
                                    {t.is_secretary ? (
                                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                            <input
                                                className="loginbox-input"
                                                style={{ minWidth: 220 }}
                                                placeholder="총무 계좌번호 입력"
                                                value={acctInputs[t.traveler_id] ?? ''}
                                                onChange={e => setAcctInputs(v => ({ ...v, [t.traveler_id]: e.target.value }))}
                                            />
                                            <button className="loginbox-btn" onClick={() => handleAccountSave(t.traveler_id)}>저장</button>
                                        </div>
                                    ) : (
                                        t.account_number ? <div style={{ color: '#555' }}>계좌: {t.account_number}</div> : null
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section style={{ marginBottom: 18 }}>
                        <div style={{ fontWeight: 'bold', marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>지출 내역</span>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button className="loginbox-btn" style={{ fontSize: '0.98rem', padding: '6px 12px', width: 'auto', margin: 0 }} onClick={() => setShowAdd(v => !v)}>
                                    {showAdd ? '취소' : '지출 추가'}
                                </button>
                                <button className="loginbox-btn" style={{ fontSize: '0.98rem', padding: '6px 12px', width: 'auto', margin: 0, background: '#3949ab' }} onClick={handleEndTrip}>
                                    여행 종료(정산)
                                </button>
                            </div>
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
                                        try {
                                            await apiClient.delete(`/api/payment/${p.payment_id}`);
                                            // 삭제 후 목록 갱신
                                            const paymentsRes = await apiClient.get(`/api/payment?tripId=${tripId}`);
                                            const list = Array.isArray(paymentsRes.data) ? paymentsRes.data : (paymentsRes.data.payments || []);
                                            setPayments(list.map(p => ({
                                                payment_id: p.paymentId ?? p.payment_id ?? p.id,
                                                traveler_id: p.travelerId ?? p.traveler_id,
                                                name: p.name,
                                                cost: p.cost
                                            })));
                                        } catch {
                                            alert('삭제에 실패했습니다.');
                                        }
                                    }} style={{ background: '#e57373', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontSize: '0.95rem', marginLeft: 8, cursor: 'pointer' }}>삭제</button>
                                </li>
                            ))}
                        </ul>
                    </section>
                    {settlement && (
                        <section style={{ marginBottom: 18 }}>
                            <div style={{ fontWeight: 'bold', marginBottom: 6 }}>정산 결과</div>
                            <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 12, marginBottom: 10 }}>
                                <div>총 지출: {settlement.total.toLocaleString()}원</div>
                                <div>1인당 부담액: {settlement.perCapita.toLocaleString()}원</div>
                                {travelers.find(t => t.is_secretary)?.account_number && (
                                    <div>총무 계좌: {travelers.find(t => t.is_secretary).account_number}</div>
                                )}
                            </div>
                            <div style={{ fontWeight: 'bold', marginBottom: 6 }}>개인별 정산액</div>
                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: 10 }}>
                                {settlement.items.map(i => (
                                    <li key={i.id} style={{ background: '#eef7ff', borderRadius: 6, padding: '8px 10px', marginBottom: 6 }}>
                                        {travelers.find(t => t.traveler_id === i.id)?.name || i.id}: {i.balance.toLocaleString()}원 {i.balance >= 0 ? '(받음)' : '(지급)'}
                                    </li>
                                ))}
                            </ul>
                            <div style={{ fontWeight: 'bold', marginBottom: 6 }}>송금 리스트</div>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {settlement.transfers.length === 0 && <li>정산 필요 없음</li>}
                                {settlement.transfers.map((tr, idx) => (
                                    <li key={idx} style={{ background: '#fffde7', borderRadius: 6, padding: '8px 10px', marginBottom: 6 }}>
                                        {travelers.find(t => t.traveler_id === tr.from)?.name || tr.from} → {travelers.find(t => t.traveler_id === tr.to)?.name || tr.to}: {tr.amount.toLocaleString()}원
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </>
            )}
        </div>
    );
}

export default TripDetailPage; 