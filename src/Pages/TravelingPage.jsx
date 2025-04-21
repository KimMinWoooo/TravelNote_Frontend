import React from 'react';
import styled from 'styled-components';
import UserInfoBox from '../Components/UserInfoBox';
import TripInfoBox from '../Components/TripInfoBox';
import AddTripBox from '../Components/AddTripBox';  // AddTripBox 임포트
import InfoBox from '../Components/InfoBox';

function TravelingPage({ isTraveling, travelInfo }) {  // isLoggedIn props 받기
  return (
    <>
      <UserInfoBox />
      {isTraveling ? (  // 여행 상태에 따른 조건부 렌더링
        <TripInfoBox travelInfo={travelInfo} />  // 여행이 시작 되었을 때 TripInfoBox 보여주기
      ) : (
        <AddTripBox />  // 여행 시작이이 안되었을 때 AddTripBox 보여주기
      )}
      <InfoBox>
        <div>여긴 아직 생각안해봤는데</div>
        <div>지난 여행 기록소를 메인에 추가하기</div>
      </InfoBox>
    </>
  );
}

export default TravelingPage;