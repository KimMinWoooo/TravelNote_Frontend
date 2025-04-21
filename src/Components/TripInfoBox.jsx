import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import MemberModal from './MemberMain/MemberModal';

const Box = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: 90%;
  box-sizing: border-box;
`;

const TripInfoBoxContainer = styled(Box)`
  text-align: left;
`;

const TripTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const TripDates = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const TripDetails = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #eee;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #ddd;
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