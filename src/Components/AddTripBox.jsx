import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.9));
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.12), 0 0 1px rgba(102, 126, 234, 0.1);
  padding: 24px;
  margin-bottom: 24px;
  width: 90%;
  box-sizing: border-box;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 48px rgba(102, 126, 234, 0.18);
  }
`;

const AddTripBoxContainer = styled(Box)`
  text-align: center;
`;

const AddTripButton = styled.div`  /* button -> div 변경 */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  padding: 14px 32px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  display: inline-block;
  text-decoration: none;
  color: #fff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0) scale(1);
    box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
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