import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import MemberModal from './MemberMain/MemberModal';

const Box = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.9));
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.12), 0 0 1px rgba(102, 126, 234, 0.1);
  padding: 24px;
  margin-bottom: 24px;
  width: 90%;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 48px rgba(102, 126, 234, 0.18);
  }
`;

const TripInfoBoxContainer = styled(Box)`
  text-align: left;
`;

const TripTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const TripDates = styled.div`
  font-size: 15px;
  margin-bottom: 12px;
  color: #6b7280;
  font-weight: 500;
`;

const TripDetails = styled.div`
  font-size: 15px;
  margin-bottom: 12px;
  color: #4b5563;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
`;

const Button = styled.button`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 10px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: #667eea;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

function TripInfoBox({ travelInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <TripInfoBoxContainer>
      <TripTitle>{travelInfo.title}</TripTitle>
      <TripDates>{travelInfo.dates}</TripDates>
      <TripDetails>현재 총 지출 : {travelInfo.details.totalExpenses}</TripDetails>
      <TripDetails>기록된 추억 : {travelInfo.details.memories}</TripDetails>
      <ButtonContainer>
        <Button onClick={openModal}>멤버 보기</Button> {/* onClick 이벤트 핸들러 추가 */}
        <Button>지출 추가</Button>
        <Button>여행 기록소</Button>
      </ButtonContainer>
      <MemberModal
        isOpen={isModalOpen}
        onClose={closeModal}
        members={travelInfo.members} // members props 전달
      />
    </TripInfoBoxContainer>
  );
}

export default TripInfoBox;