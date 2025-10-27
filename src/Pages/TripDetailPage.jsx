import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../config/axios';
import styled from 'styled-components';

const PageContainer = styled.div`
    max-width: 480px;
    margin: 0 auto;
    padding: 24px 20px;
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

const TripTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0 0 8px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const TripDate = styled.div`
    color: #6b7280;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 28px;
`;

const Section = styled.section`
    margin-bottom: 28px;
`;

const SectionHeader = styled.div`
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SectionTitle = styled.span`
    color: #4b5563;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
`;

const PrimaryButton = styled.button`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    font-size: 0.95rem;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const SettlementButton = styled(PrimaryButton)`
    background: linear-gradient(135deg, #3949ab 0%, #303f9f 100%);
`;

const FormCard = styled.form`
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
    border: 2px solid rgba(102, 126, 234, 0.15);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
`;

const FormInput = styled.input`
    width: 100%;
    padding: 12px 14px;
    margin-bottom: 12px;
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

const FormSelect = styled.select`
    width: 100%;
    padding: 12px 14px;
    margin-bottom: 12px;
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

const SubmitButton = styled(PrimaryButton)`
    width: 100%;
    padding: 12px 0;
    font-size: 1rem;
`;

const TravelerList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const TravelerCard = styled.li`
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    border: 2px solid rgba(102, 126, 234, 0.2);
    border-radius: 16px;
    padding: 16px;
    transition: all 0.3s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    
    &:hover {
        transform: translateX(4px);
        border-color: rgba(102, 126, 234, 0.3);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
    }
`;

const TravelerInfo = styled.div``;

const TravelerName = styled.div`
    font-weight: bold;
    font-size: 1.1rem;
    color: #667eea;
    margin-bottom: 4px;
`;

const TravelerCost = styled.div`
    color: #6b7280;
    font-size: 0.95rem;
`;

const SecretaryTag = styled.span`
    color: #764ba2;
    font-weight: bold;
    font-size: 0.9rem;
`;

const AccountInput = styled.input`
    flex: 1;
    min-width: 180px;
    padding: 10px 12px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    outline: none;
    background: #ffffff;
    font-size: 0.9rem;
    
    &:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
`;

const AccountButton = styled(PrimaryButton)`
    padding: 10px 16px;
    font-size: 0.9rem;
`;

const AccountDisplay = styled.div`
    color: #6b7280;
    font-size: 0.95rem;
    font-style: italic;
`;

const PaymentList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const PaymentCard = styled.li`
    background: linear-gradient(135deg, rgba(255, 248, 220, 0.7), rgba(255, 252, 232, 0.9));
    border: 2px solid rgba(251, 191, 36, 0.2);
    border-radius: 12px;
    margin-bottom: 12px;
    padding: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateX(4px);
        border-color: rgba(251, 191, 36, 0.4);
        box-shadow: 0 4px 12px rgba(251, 191, 36, 0.15);
    }
`;

const PaymentInfo = styled.div``;

const PaymentNameSpan = styled.div`
    font-weight: bold;
    font-size: 1rem;
    color: #4b5563;
`;

const PaymentAmountSpan = styled.span`
    color: #667eea;
    font-weight: bold;
`;

const PaymentAuthor = styled.div`
    color: #9ca3af;
    font-size: 0.9rem;
    margin-top: 4px;
`;

const DeleteButton = styled.button`
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 6px rgba(239, 68, 68, 0.3);
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(239, 68, 68, 0.4);
    }
`;

const SettlementCard = styled.div`
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08));
    border: 2px solid rgba(102, 126, 234, 0.2);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
    color: #4b5563;
    line-height: 1.8;
`;

const SettlementList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const SettlementItem = styled.li`
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
    border: 1px solid rgba(102, 126, 234, 0.15);
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 8px;
    color: #4b5563;
`;

const TransferItem = styled.li`
    background: linear-gradient(135deg, rgba(255, 248, 220, 0.5), rgba(255, 252, 232, 0.7));
    border: 1px solid rgba(251, 191, 36, 0.2);
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 8px;
    color: #4b5563;
`;

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
            const paymentsRes = await apiClient.get(`/api/payment?tripId=${tripId}`);
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
        <PageContainer>
            {loading && <LoadingMessage>불러오는 중...</LoadingMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {trip && (
                <>
                    <TripTitle>{trip.name}</TripTitle>
                    <TripDate>{trip.start_date} ~ {trip.end_date}</TripDate>
                    <Section>
                        <SectionHeader>
                            <SectionTitle>여행자</SectionTitle>
                            <PrimaryButton onClick={() => setShowInvite(v => !v)}>
                                {showInvite ? '취소' : '멤버 초대'}
                            </PrimaryButton>
                        </SectionHeader>
                        {showInvite && (
                            <FormCard onSubmit={async e => {
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
                                    const travelersRes = await apiClient.get(`/api/traveler?tripId=${tripId}`);
                                    setTravelers(travelersRes.data.travelers || []);
                                } catch {
                                    setInviteError('초대에 실패했습니다.');
                                } finally {
                                    setInviteLoading(false);
                                }
                            }}>
                                <FormInput
                                    type="text"
                                    placeholder="초대할 멤버 아이디"
                                    value={inviteId}
                                    onChange={e => setInviteId(e.target.value)}
                                />
                                {inviteError && <div className="loginbox-error">{inviteError}</div>}
                                <SubmitButton type="submit" disabled={inviteLoading}>
                                    {inviteLoading ? '초대 중...' : '초대하기'}
                                </SubmitButton>
                            </FormCard>
                        )}
                        <TravelerList>
                            {travelers.map(t => (
                                <TravelerCard key={t.traveler_id}>
                                    <TravelerInfo>
                                        <TravelerName>
                                            {t.name} {t.is_secretary ? <SecretaryTag>(총무)</SecretaryTag> : null}
                                        </TravelerName>
                                        <TravelerCost>총 지출: {Number(t.total_cost || 0).toLocaleString()}원</TravelerCost>
                                    </TravelerInfo>
                                    {t.is_secretary ? (
                                        <>
                                            <AccountInput
                                                placeholder="총무 계좌번호 입력"
                                                value={acctInputs[t.traveler_id] ?? ''}
                                                onChange={e => setAcctInputs(v => ({ ...v, [t.traveler_id]: e.target.value }))}
                                            />
                                            <AccountButton onClick={() => handleAccountSave(t.traveler_id)}>저장</AccountButton>
                                        </>
                                    ) : (
                                        t.account_number && <AccountDisplay>계좌: {t.account_number}</AccountDisplay>
                                    )}
                                </TravelerCard>
                            ))}
                        </TravelerList>
                    </Section>
                    <Section>
                        <SectionHeader>
                            <SectionTitle>지출 내역</SectionTitle>
                            <ButtonGroup>
                                <PrimaryButton onClick={() => setShowAdd(v => !v)}>
                                    {showAdd ? '취소' : '지출 추가'}
                                </PrimaryButton>
                                <SettlementButton onClick={handleEndTrip}>
                                    여행 종료(정산)
                                </SettlementButton>
                            </ButtonGroup>
                        </SectionHeader>
                        {showAdd && (
                            <FormCard onSubmit={handleAddPayment}>
                                <FormInput
                                    type="text"
                                    placeholder="지출명"
                                    value={addName}
                                    onChange={e => setAddName(e.target.value)}
                                />
                                <FormInput
                                    type="number"
                                    placeholder="금액"
                                    value={addCost}
                                    onChange={e => setAddCost(e.target.value)}
                                />
                                <FormSelect
                                    value={addTravelerId}
                                    onChange={e => setAddTravelerId(e.target.value)}
                                >
                                    <option value="">작성자 선택</option>
                                    {travelers.map(t => (
                                        <option key={t.traveler_id} value={t.traveler_id}>{t.name}</option>
                                    ))}
                                </FormSelect>
                                {addError && <div className="loginbox-error">{addError}</div>}
                                <SubmitButton type="submit" disabled={addLoading}>
                                    {addLoading ? '추가 중...' : '추가하기'}
                                </SubmitButton>
                            </FormCard>
                        )}
                        <PaymentList>
                            {payments.map(p => (
                                <PaymentCard key={p.payment_id}>
                                    <PaymentInfo>
                                        <PaymentNameSpan>
                                            {p.name} <PaymentAmountSpan>({p.cost.toLocaleString()}원)</PaymentAmountSpan>
                                        </PaymentNameSpan>
                                        <PaymentAuthor>
                                            작성자: {travelers.find(t => t.traveler_id === p.traveler_id)?.name || '-'}
                                        </PaymentAuthor>
                                    </PaymentInfo>
                                    <DeleteButton onClick={async () => {
                                        if (!window.confirm('정말 삭제하시겠습니까?')) return;
                                        try {
                                            await apiClient.delete(`/api/payment/${p.payment_id}`);
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
                                    }}>
                                        삭제
                                    </DeleteButton>
                                </PaymentCard>
                            ))}
                        </PaymentList>
                    </Section>
                    {settlement && (
                        <Section>
                            <SectionHeader>
                                <SectionTitle>정산 결과</SectionTitle>
                            </SectionHeader>
                            <SettlementCard>
                                <div>총 지출: {settlement.total.toLocaleString()}원</div>
                                <div>1인당 부담액: {settlement.perCapita.toLocaleString()}원</div>
                                {travelers.find(t => t.is_secretary)?.account_number && (
                                    <div>총무 계좌: {travelers.find(t => t.is_secretary).account_number}</div>
                                )}
                            </SettlementCard>
                            <SectionHeader>
                                <SectionTitle>개인별 정산액</SectionTitle>
                            </SectionHeader>
                            <SettlementList>
                                {settlement.items.map(i => (
                                    <SettlementItem key={i.id}>
                                        {travelers.find(t => t.traveler_id === i.id)?.name || i.id}: {i.balance.toLocaleString()}원 {i.balance >= 0 ? '(받음)' : '(지급)'}
                                    </SettlementItem>
                                ))}
                            </SettlementList>
                            <SectionHeader>
                                <SectionTitle>송금 리스트</SectionTitle>
                            </SectionHeader>
                            <SettlementList>
                                {settlement.transfers.length === 0 && <SettlementItem>정산 필요 없음</SettlementItem>}
                                {settlement.transfers.map((tr, idx) => (
                                    <TransferItem key={idx}>
                                        {travelers.find(t => t.traveler_id === tr.from)?.name || tr.from} → {travelers.find(t => t.traveler_id === tr.to)?.name || tr.to}: {tr.amount.toLocaleString()}원
                                    </TransferItem>
                                ))}
                            </SettlementList>
                        </Section>
                    )}
                </>
            )}
        </PageContainer>
    );
}

export default TripDetailPage; 