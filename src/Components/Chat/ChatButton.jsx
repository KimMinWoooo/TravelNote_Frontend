import React from 'react';
import styled from 'styled-components';

const ChatButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 25px;
  z-index: 999;
  
  @media (min-width: 768px) {
    bottom: 20px;
    right: calc(50% - 265.5px); /* 중앙 정렬 후 오른쪽으로 287.5px 이동 (575px / 2) */
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #0056b3;
  }
`;

function ChatButton({ onClick }) {
  return (
    <ChatButtonContainer>
      <Button onClick={onClick}>
        {/* 챗봇 아이콘 또는 텍스트 */}
        ?
      </Button>
    </ChatButtonContainer>
  );
}

export default ChatButton;