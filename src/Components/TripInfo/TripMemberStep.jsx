import React from 'react';
import styled from 'styled-components';

const StepContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: 90%;
  box-sizing: border-box;
`;

const StepTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

function TripMemberStep({ memberCount, members, onMemberCountChange, onMemberNameChange, onNextStep }) {
  return (
    <StepContainer>
      <StepTitle>2. 여행 멤버는 몇 명인지</StepTitle>
      <Select value={memberCount} onChange={onMemberCountChange}>
        <option value="">인원 수 선택</option>
        <option value="1">1명</option>
        <option value="2">2명</option>
        <option value="3">3명</option>
        <option value="4">4명</option>
        <option value="5">5명</option>
      </Select>
      {members.map((member, index) => (
        <Input
          key={index}
          type="text"
          placeholder={`멤버 ${index + 1} 이름`}
          value={member}
          onChange={(event) => onMemberNameChange(index, event)}
        />
      ))}
      <Button onClick={onNextStep}>다음</Button>
    </StepContainer>
  );
}

export default TripMemberStep;