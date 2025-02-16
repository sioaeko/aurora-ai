# 🌈 Prism Chat

<div align="center">
  
  ![CleanShot 2025-02-01 at 17 15 01](https://github.com/user-attachments/assets/e1d9099f-c1c3-48e7-bac0-cce627ff1c1d)

  <p align="center">
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="MIT License" />
  </p>

  <h3>🤖 Deepseek R1 기반의 강력한 AI 채팅 플랫폼</h3>

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

- 🤖 **다양한 모델 크기** - 여러 Deepseek R1 모델 중 선택:
  - 1.5B - 기본 작업을 위한 초경량 모델
  - 7B - 일상적인 사용을 위한 효율적인 모델
  - 8B - 개선된 경량 모델
  - 14B - 다양한 작업에 적합한 균형잡힌 모델
  - 32B - 뛰어난 이해력을 가진 대형 모델
  - 70B - 복잡한 작업을 위한 고급 모델
  - 671B - 최고 성능을 위한 최상위 모델
- 🔄 **자동 모델 전환** - UI에서 설치된 Ollama 모델 간 자연스러운 전환
- 🌍 **다국어 지원** - 한국어/영어 인터페이스
- 💬 **채팅 관리** - 대화 기록 저장 및 관리
- 🎨 **테마 설정** - 라이트/다크/시스템 테마
- 📱 **반응형 디자인** - 모든 디바이스에서 최적화된 경험
- ⌨️ **편리한 입력** - Enter 키로 메시지 전송 (설정 가능)
- 🔤 **글자 크기 조절** - 작게/중간/크게 설정

## 🚀 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- [Ollama](https://ollama.ai) 설치 및 Deepseek R1 모델 다운로드

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

3. Ollama 실행 및 Deepseek R1 모델 다운로드 (원하는 크기 선택)
```bash
# 14B 모델 (기본)
ollama run deepseek-r1:14b

# 다른 크기의 모델
ollama run deepseek-r1:1.5b  # 초경량
ollama run deepseek-r1:7b    # 효율적
ollama run deepseek-r1:8b    # 개선된 경량
ollama run deepseek-r1:32b   # 대형
ollama run deepseek-r1:70b   # 고급
ollama run deepseek-r1:671b  # 최상위
```

4. 개발 서버 실행
```bash
npm run dev
```

## 💻 사용 방법

### 채팅 시작하기

1. "새로운 채팅" 버튼을 클릭하여 새로운 대화 시작
2. 드롭다운 메뉴에서 원하는 모델 크기 선택
3. 메시지 입력창에 질문이나 요청사항 입력
4. Enter 키(설정된 경우) 또는 전송 버튼을 클릭하여 메시지 전송

### 모델 선택

UI의 모델 선택기는 Ollama를 통해 설치된 Deepseek R1 모델을 자동으로 감지하고 사용합니다. UI에서 다른 모델 크기를 선택할 때:

- 선택한 모델이 설치되어 있다면 현재 채팅에서 즉시 사용됩니다
- 각 채팅은 자체적인 모델 선택을 유지합니다
- 새로운 채팅은 현재 선택된 모델을 기본값으로 사용합니다

### 설정 관리

- **테마**: 사이드바의 설정에서 라이트/다크/시스템 테마 선택
- **글자 크기**: 작게/중간/크게 중 선택
- **언어 설정**: 한국어/영어 중 선택
- **Enter 키 설정**: Enter 키로 메시지 전송 여부 설정

## 🛠 기술 스택

<div align="center">
  <table>
    <tr>
      <td align="center" width="96">
        <img src="https://techstack-generator.vercel.app/react-icon.svg" alt="React" width="48" height="48" />
        <br>React
      </td>
      <td align="center" width="96">
        <img src="https://techstack-generator.vercel.app/ts-icon.svg" alt="TypeScript" width="48" height="48" />
        <br>TypeScript
      </td>
      <td align="center" width="96">
        <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/wind.svg" alt="Tailwind" width="48" height="48" />
        <br>Tailwind
      </td>
      <td align="center" width="96">
        <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/zap.svg" alt="Vite" width="48" height="48" />
        <br>Vite
      </td>
    </tr>
  </table>
</div>

## 📝 라이선스

이 프로젝트는 [MIT](LICENSE) 라이선스를 따릅니다.

## 🤝 기여하기

기여, 이슈 및 기능 요청을 환영합니다!

1. 프로젝트 포크
2. 기능 브랜치 생성 (`git checkout -b feature/멋진기능`)
3. 변경사항 커밋 (`git commit -m '멋진 기능 추가'`)
4. 브랜치에 푸시 (`git push origin feature/멋진기능`)
5. Pull Request 열기

## 📧 연락처

프로젝트 링크: [https://github.com/sioaeko/prism-chat](https://github.com/sioaeko/prism-chat)

---

<div align="center">
  <sub>제작: sioaeko</sub>
</div>