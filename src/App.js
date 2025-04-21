import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TravelingPage from './Pages/TravelingPage';
import BeforeTripPage from './Pages/BeforeTripPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import AddTripInfoPage from './Pages/AddTripInfoPage';
import ChatModal from './Components/Chat/ChatModal';
import ChatButton from './Components/Chat/ChatButton';
import getChatResponse from './Middleware/chatapi';
import testData from './Middleware/test';
import UserInfoBox from './Components/UserInfoBox';

// 전체 컨테이너 (미디어 쿼리 적용)
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f0f0f0;
  padding: 20px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    max-width: 575px;
    margin: 0 auto;
  }
`;

// 페이지 제목 스타일
const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(testData.isLoggedIn); // 초기값을 testData에서 가져옴
  const [travelInfo, setTravelInfo] = useState(testData.travelInfo); // 여행 정보 상태 추가
  const [isTraveling, setIsTraveling] = useState(testData.isTraveling);

  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const openChatModal = () => {
    setChatModalOpen(true);
  };

  const closeChatModal = () => {
    setChatModalOpen(false);
  };

  const handleChatSubmit = async (message) => {
    setChatMessage(message);
    try {
      const responseText = await getChatResponse(message);
      setChatResponse(responseText);
    } catch (error) {
      console.error('챗봇 API 요청 오류:', error);
      setChatResponse('챗봇 API 요청에 실패했습니다.');
    }
  };

  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 데이터를 가져오도록 설정 (나중에 API 호출로 대체)
  useEffect(() => {
    // 나중에 API 호출로 대체될 부분
    // 예:
    // const fetchTravelInfo = async () => {
    //   const data = await fetch('/api/travelInfo', {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('token')}`,
    //     },
    //   }).then(res => res.json());
    //   setTravelInfo(data);
    // };

    // fetchTravelInfo(); // API 호출 함수 실행
  }, []);

  return (
    <BrowserRouter>
      <AppContainer>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <PageTitle>TravelNote</PageTitle>
        </Link>
        <Routes>
          <Route
            path="/"
            element={
              isTraveling ? (
                <TravelingPage
                  isTraveling={isTraveling}
                  travelInfo={travelInfo} /> // travelInfo props 전달
              ) : (
                <BeforeTripPage isLoggedIn={isLoggedIn} />
              )
            }
          />
          <Route
            path="/login"
            element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/add-trip" element={<AddTripInfoPage />} />
        </Routes>
        {isLoggedIn && <ChatButton onClick={openChatModal} />}
        <ChatModal
          isOpen={chatModalOpen}
          onClose={closeChatModal}
          onSend={handleChatSubmit}
          response={chatResponse}
        />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;