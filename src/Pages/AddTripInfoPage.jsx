import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TripLocationStep from '../Components/TripInfo/TripLocationStep';
import TripMemberStep from '../Components/TripInfo/TripMemberStep';
import TripDurationStep from '../Components/TripInfo/TripDurationStep';
import TripTreasurerStep from '../Components/TripInfo/TripTreasurerStep';

const AddTripInfoPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh; /* 최소 높이 설정 */
  background-color: #f0f0f0;
  padding: 20px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    max-width: 575px;
    margin: 0 auto;
  }
`;

function AddTripInfoPage() {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [district, setDistrict] = useState('');
  const [memberCount, setMemberCount] = useState('');
  const [members, setMembers] = useState([]);
  const [duration, setDuration] = useState('');
  const [treasurer, setTreasurer] = useState('');
  const [treasurerBank, setTreasurerBank] = useState('');
  const [treasurerAccount, setTreasurerAccount] = useState('');

  const navigate = useNavigate();

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleMemberCountChange = (event) => {
    setMemberCount(event.target.value);
    setMembers(Array(parseInt(event.target.value)).fill('')); // 멤버 입력 필드 초기화
  };

  const handleMemberNameChange = (index, event) => {
    const newMembers = [...members];
    newMembers[index] = event.target.value;
    setMembers(newMembers);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleTreasurerChange = (event) => {
    setTreasurer(event.target.value);
  };

  const handleTreasurerBankChange = (event) => {
    setTreasurerBank(event.target.value);
  };

  const handleTreasurerAccountChange = (event) => {
    setTreasurerAccount(event.target.value);
  };

  const handleSubmit = () => {
    // 여기에서 모든 여행 정보를 서버에 전송하거나, 상태를 업데이트할 수 있습니다.
    console.log('여행 정보:', {
      location,
      district,
      memberCount,
      members,
      duration,
      treasurer,
      treasurerBank,
      treasurerAccount,
    });
    navigate('/');  // 메인 페이지로 이동
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <TripLocationStep
            location={location}
            district={district}
            onLocationChange={handleLocationChange}
            onDistrictChange={handleDistrictChange}
            onNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <TripMemberStep
            memberCount={memberCount}
            members={members}
            onMemberCountChange={handleMemberCountChange}
            onMemberNameChange={handleMemberNameChange}
            onNextStep={handleNextStep}
          />
        );
      case 3:
        return (
          <TripDurationStep
            duration={duration}
            onDurationChange={handleDurationChange}
            onNextStep={handleNextStep}
          />
        );
      case 4:
        return (
          <TripTreasurerStep
            members={members}
            treasurer={treasurer}
            treasurerBank={treasurerBank}
            treasurerAccount={treasurerAccount}
            onTreasurerChange={handleTreasurerChange}
            onTreasurerBankChange={handleTreasurerBankChange}
            onTreasurerAccountChange={handleTreasurerAccountChange}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AddTripInfoPageContainer>
      {renderStep()}
    </AddTripInfoPageContainer>
  );
}

export default AddTripInfoPage;