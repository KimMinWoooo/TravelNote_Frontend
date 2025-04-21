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

function TripLocationStep({ location, district, onLocationChange, onDistrictChange, onNextStep }) {
  return (
    <StepContainer>
      <StepTitle>1. 어느 지역, 어느 구로 여행하는지</StepTitle>
      <Input
        type="text"
        placeholder="지역 (필수)"
        value={location}
        onChange={onLocationChange}
      />
      <Input
        type="text"
        placeholder="구 (선택)"
        value={district}
        onChange={onDistrictChange}
      />
      <Button onClick={onNextStep}>다음</Button>
    </StepContainer>
  );
}

export default TripLocationStep;