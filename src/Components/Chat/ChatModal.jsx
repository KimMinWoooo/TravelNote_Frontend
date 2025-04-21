import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 90%;
  max-width: 500px;
  box-sizing: border-box;
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const ChatButton = styled.button`
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

const ChatResponse = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CloseButton = styled.button`
  background-color: #ccc;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  margin-left: auto; /* Close button을 오른쪽으로 밀어냄 */

  &:hover {
    background-color: #aaa;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ChatButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  margin-top: 10px; /* ChatInput과의 간격 조정 */
`;

function ChatModal({ isOpen, onClose, onSend, response }) {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    onSend(message);
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>여행 챗봇</h2>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ModalHeader>
        <ChatInput
          type="text"
          placeholder="여행 관련 질문을 입력하세요."
          value={message}
          onChange={handleMessageChange}
        />
        <ChatButtonContainer> {/* ChatButton을 ChatButtonContainer로 감싸기 */}
          <ChatButton onClick={handleSendClick}>질문하기</ChatButton>
        </ChatButtonContainer>
        <ChatResponse>{response}</ChatResponse>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ChatModal;