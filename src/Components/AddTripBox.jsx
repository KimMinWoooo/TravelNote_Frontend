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
  text-align: center; /* 텍스트 중앙 정렬 */
`;

const AddTripBoxContainer = styled(Box)`
  text-align: center;
`;

const AddTripButton = styled.div`  /* button -> div 변경 */
  background-color: #eee;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  display: inline-block; /* Link를 감싸기 위해 inline-block으로 변경 */
  text-decoration: none; /* 링크 스타일 제거 */
  color: inherit; /* 폰트 색상 상속 */

  &:hover {
    background-color: #ddd;
  }
`;

function AddTripBox({ children }) {  /* children 받기 */
    return (
      <AddTripBoxContainer>
        <AddTripButton>{children}</AddTripButton>
      </AddTripBoxContainer>
    );
  }

export default AddTripBox;