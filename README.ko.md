# 🌈 Prism Chat

<div align="center">
  
  <img src="public/aurora-favicon.svg" alt="Prism AI 로고" width="120" height="120">

  <p align="center">
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="MIT License" />
  </p>

  <h3>Groq로 구현한 초고속 AI 채팅</h3>

  <p>
    <b>
      <a href="#-기능">기능</a> •
      <a href="#-시작하기">시작하기</a> •
      <a href="#-설치-방법">설치 방법</a> •
      <a href="#-사용-방법">사용 방법</a> •
      <a href="#-기술-스택">기술 스택</a>
    </b>
  </p>

  [English](README.md) | [한국어](README.ko.md)
</div>

## ✨ 기능

- ⚡️ **Groq 기반** - Groq의 최첨단 추론 엔진으로 가장 빠른 AI 응답 경험
- 🎯 **Mixtral 모델** - 고품질 응답을 위한 강력한 Mixtral-8x7B 모델 사용
- 🌍 **다국어 지원** - 한국어/영어 인터페이스
- 💬 **채팅 관리** - 대화 기록 저장 및 관리
- 🎨 **테마 설정** - 라이트/다크/시스템 테마
- 📱 **반응형 디자인** - 모든 디바이스에서 최적화된 경험
- ⌨️ **편리한 입력** - Enter 키로 메시지 전송 (설정 가능)
- 🔤 **글자 크기 조절** - 작게/중간/크게 설정
- 🎭 **코드 하이라이팅** - 코드 블록을 위한 아름다운 구문 강조
- 📝 **마크다운 지원** - 마크다운을 통한 풍부한 텍스트 서식

## 🚀 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- Groq API 키

### 설치 방법

1. 리포지토리 클론
```bash
git clone https://github.com/sioaeko/prism-chat.git
cd prism-chat
```

2. 의존성 설치
```bash
npm install
```

3. `.env` 파일 생성 및 Groq API 키 추가
```bash
VITE_GROQ_API_KEY=your_api_key_here
```

4. 개발 서버 실행
```bash
npm run dev
```

## 💻 사용 방법

### 채팅 시작하기

1. "새로운 채팅" 버튼을 클릭하여 새로운 대화 시작
2. 메시지 입력창에 질문이나 요청사항 입력
3. Enter 키(설정된 경우) 또는 전송 버튼을 클릭하여 메시지 전송

### 키보드 단축키

- `Enter` - 메시지 전송 (설정 가능)
- `Shift + Enter` - 줄 바꿈
- `Esc` - 입력 내용 지우기
- `Ctrl/Cmd + K` - 검색 포커스

## 🛠 기술 스택

- **프론트엔드**: React + TypeScript
- **스타일링**: Tailwind CSS
- **빌드 도구**: Vite
- **AI 제공자**: Groq
- **배포**: Vercel

## 🤝 기여하기

기여는 언제나 환영합니다! Pull Request를 자유롭게 제출해주세요.

1. 프로젝트 포크
2. 기능 브랜치 생성 (`git checkout -b feature/멋진기능`)
3. 변경사항 커밋 (`git commit -m '멋진 기능 추가'`)
4. 브랜치에 푸시 (`git push origin feature/멋진기능`)
5. Pull Request 열기

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📧 연락처

프로젝트 링크: [https://github.com/sioaeko/prism-chat](https://github.com/sioaeko/prism-chat)

---

[sioaeko](https://github.com/sioaeko)가 ❤️로 만들었습니다