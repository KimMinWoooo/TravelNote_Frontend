import React from 'react';
import styled from 'styled-components';

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

const UserInfoBoxContainer = styled(Box)`
  text-align: left;
  margin-top: 20px;
`;

const Greeting = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

function UserInfoBox() {
  return (
    <UserInfoBoxContainer>
      <Greeting>김민우님 안녕하세요!</Greeting>
    </UserInfoBoxContainer>
  );
}

export default UserInfoBox;