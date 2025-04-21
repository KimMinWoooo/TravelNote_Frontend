const getChatResponse = async (message) => {
    try {
      if (!message) {
        throw new Error("Message is required");
      }
  
      const response = await fetch('http://localhost:3001/chat', { // 백엔드 API 호출
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.response; // 응답 데이터 반환
  
    } catch (error) {
      console.error('챗봇 API 요청 오류:', error);
      throw new Error("챗봇 API 요청에 실패했습니다.");
    }
  };
  
  export default getChatResponse;