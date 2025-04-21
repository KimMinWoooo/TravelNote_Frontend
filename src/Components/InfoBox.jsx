import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: 90%;
  box-sizing: border-box;
`;

const InfoBoxContainer = styled(Box)`
  text-align: left;
`;

const InfoText = styled.div`
  font-size: 14px;
  color: #555;
`;

function InfoBox({ children }) {
  return (
    <InfoBoxContainer>
      {children}
    </InfoBoxContainer>
  );
}

export default InfoBox;