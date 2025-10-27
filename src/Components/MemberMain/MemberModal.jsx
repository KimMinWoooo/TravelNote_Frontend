import React from 'react';
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
  max-width: 400px;
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

const MemberList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MemberItem = styled.li`
  font-size: 16px;
  margin-bottom: 12px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  border-radius: 12px;
  color: #4b5563;
  font-weight: 500;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    transform: translateX(4px);
    border-color: rgba(102, 126, 234, 0.2);
  }
`;

function MemberModal({ isOpen, onClose, members }) {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}> {/* 이벤트 버블링 방지 */}
        <ModalHeader>
          <h2>여행 멤버</h2>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ModalHeader>
        <MemberList>
          {members.map((member, index) => (
            <MemberItem key={index}>{member}</MemberItem>
          ))}
        </MemberList>
      </ModalContent>
    </ModalOverlay>
  );
}

export default MemberModal;