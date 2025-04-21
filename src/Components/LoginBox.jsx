import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Box = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: 90%;
  box-sizing: border-box;
`;

const LoginBoxContainer = styled(Box)`
  text-align: center;
`;

const LoginButton = styled.button`
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

function LoginBox() {
  return (
    <LoginBoxContainer>
      <Link to="/login">
        <LoginButton>로그인</LoginButton>
      </Link>
    </LoginBoxContainer>
  );
}

export default LoginBox;