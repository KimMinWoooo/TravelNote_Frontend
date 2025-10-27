import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,255,255,0.95));
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 1px rgba(102, 126, 234, 0.2);
  padding: 28px;
  width: 90%;
  max-width: 500px;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.9);
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  box-sizing: border-box;
  font-size: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #f9fafb;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  
  &:focus {
    outline: none;
    border: 2px solid #667eea;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1), 0 4px 12px rgba(102, 126, 234, 0.15);
  }
  
  &:hover {
    border-color: #c7d2fe;
    box-shadow: 0 2px 6px rgba(102, 126, 234, 0.1);
  }
`;

const ChatButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 28px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ChatResponse = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: linear-gradient(135deg, #f8f9ff, #ffffff);
  border: 1px solid rgba(102, 126, 234, 0.15);
  border-radius: 12px;
  color: #4b5563;
  line-height: 1.6;
  min-height: 60px;
`;

const CloseButton = styled.button`
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin-left: auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);

  &:hover {
    background: linear-gradient(135deg, #dc2626, #b91c1c);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    margin: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 24px;
  }
`;

const ChatButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
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