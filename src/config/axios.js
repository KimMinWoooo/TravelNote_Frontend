import axios from 'axios';

// 환경에 따른 API 기본 URL 설정
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://192.168.21.150'  // 배포 환경에서는 직접 백엔드 서버로
  : '';  // 개발 환경에서는 프록시 사용

// axios 기본 설정
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,  // 쿠키를 포함한 요청
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 개발 환경에서는 프록시를 사용하므로 baseURL을 제거
    if (process.env.NODE_ENV === 'development') {
      config.baseURL = '';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 에러 시 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
