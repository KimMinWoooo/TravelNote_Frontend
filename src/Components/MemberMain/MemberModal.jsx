import React from 'react';
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
  max-width: 400px;
  box-sizing: border-box;
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

const MemberList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MemberItem = styled.li`
  font-size: 16px;
  margin-bottom: 5px;
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