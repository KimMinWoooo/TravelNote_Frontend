import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SignupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const SignupForm = styled.form`
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

function SignupPage() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에서 실제 회원가입 로직을 처리해야 합니다.
    // 예를 들어, API 요청을 보내고 응답을 처리할 수 있습니다.
    // 지금은 단순히 콘솔에 메시지를 출력하고 메인 페이지로 이동합니다.

    console.log('회원가입 폼 제출!');
    navigate('/login'); // 회원가입 성공 후 메인 페이지로 이동
  };

  return (
    <SignupPageContainer>
      <SignupForm onSubmit={handleSubmit}>
        <h2>회원가입</h2>
        <Input type="text" placeholder="아이디" />
        <Input type="password" placeholder="비밀번호" />
        <Input type="password" placeholder="비밀번호 확인" />
        <Input type="email" placeholder="이메일" />
        <Button type="submit">회원가입</Button>
      </SignupForm>
    </SignupPageContainer>
  );
}

export default SignupPage;