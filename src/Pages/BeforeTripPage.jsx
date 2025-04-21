import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AddTripBox from '../Components/AddTripBox';
import InfoBox from '../Components/InfoBox';
import LoginBox from '../Components/LoginBox';
import UserInfoBox from '../Components/UserInfoBox'; // UserInfoBox 임포트

function BeforeTripPage({ isLoggedIn }) { // isLoggedIn props 받기
  return (
    <>
      {isLoggedIn ? ( // 로그인 상태에 따른 조건부 렌더링
        <UserInfoBox /> // 로그인 되었을 때 UserInfoBox 보여주기
      ) : (
        <LoginBox /> // 로그인되지 않았을 때 LoginBox 보여주기
      )}
      <AddTripBox>
        <Link to="/add-trip">
          여행 추가하기
        </Link>
      </AddTripBox>
      <InfoBox>
        <div>여긴 아직 생각안해봤는데</div>
        <div>1. 전체적인 여행 관련 소식</div>
      </InfoBox>
    </>
  );
}

export default BeforeTripPage;