# Dockerfile

# 1단계: Nginx 공식 이미지를 기반으로 시작
FROM nginx:alpine

# 2단계: 이전에 빌드한 'build' 폴더의 내용물을 Nginx의 기본 웹 루트 디렉터리로 복사
COPY build /usr/share/nginx/html

# 3단계: 기본 Nginx 설정을 우리가 만든 커스텀 설정으로 교체
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 4단계: 80번 포트를 외부에 노출
EXPOSE 80

# 5단계: 컨테이너가 시작될 때 Nginx 실행
CMD ["nginx", "-g", "daemon off;"]