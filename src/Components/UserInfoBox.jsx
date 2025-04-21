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

const UserInfoBoxContainer = styled(Box)`
  text-align: left;
  margin-top: 20px;
`;

const Greeting = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

function UserInfoBox() {
  return (
    <UserInfoBoxContainer>
      <Greeting>김민우님 안녕하세요!</Greeting>
    </UserInfoBoxContainer>
  );
}

export default UserInfoBox;