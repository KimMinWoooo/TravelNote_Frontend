import React from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';  // Link 임포트

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const LoginForm = styled.form`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
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

const SignupLink = styled.p`
  margin-top: 10px;
  font-size: 14px;
`;

function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에서 실제 로그인 로직을 처리해야 합니다.
    // 예를 들어, API 요청을 보내고 응답을 처리할 수 있습니다.
    // 지금은 단순히 콘솔에 메시지를 출력하고 onLogin 콜백을 호출합니다.

    console.log('로그인 폼 제출!');
    onLogin();
    navigate('/');
  };

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={handleSubmit}>
        <h2>로그인</h2>
        <Input type="text" placeholder="아이디" />
        <Input type="password" placeholder="비밀번호" />
        <Button type="submit">로그인</Button>
        <SignupLink>
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </SignupLink>
      </LoginForm>
    </LoginPageContainer>
  );
}

export default LoginPage;