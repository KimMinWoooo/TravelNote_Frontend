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

function TripTreasurerStep({ members, treasurer, treasurerBank, treasurerAccount, onTreasurerChange, onTreasurerBankChange, onTreasurerAccountChange, onSubmit }) {
  return (
    <StepContainer>
      <StepTitle>4. 여행 총무는 누구인지</StepTitle>
      <Select value={treasurer} onChange={onTreasurerChange}>
        <option value="">총무 선택</option>
        {members.map((member, index) => (
          <option key={index} value={member}>
            {member}
          </option>
        ))}
      </Select>
      <Input
        type="text"
        placeholder="총무 은행사"
        value={treasurerBank}
        onChange={onTreasurerBankChange}
      />
      <Input
        type="text"
        placeholder="총무 계좌번호"
        value={treasurerAccount}
        onChange={onTreasurerAccountChange}
      />
      <Button onClick={onSubmit}>저장</Button>
    </StepContainer>
  );
}

export default TripTreasurerStep;