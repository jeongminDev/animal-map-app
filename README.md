# Animal Map App

우리 동네 동물 병원, 약국 등 반려 동물 관련 시설 정보를 손쉽게 찾아볼 수 있는 모바일 애플리케이션입니다.

## 🌟 주요 기능

- **지도 기반 시설 검색:** 사용자의 현재 위치를 중심으로 주변의 동물 관련 시설을 지도 위에 표시합니다.
- **실시간 영업 정보:** 각 시설의 영업 상태(영업 중, 영업 종료)를 직관적으로 확인할 수 있습니다.
- **상세 정보 제공:** 시설을 선택하면 상세 정보 페이지로 이동하여 더 많은 정보를 얻을 수 있습니다. (구현 예정)
- **시설 필터링:** 병원, 약국 등 원하는 시설 종류에 따라 필터링하여 볼 수 있습니다. (구현 예정)
- **검색 기능:** 특정 이름의 시설을 검색할 수 있습니다. (구현 예정)

## 🛠️ 기술 스택

- **Framework:** React Native & Expo
- **Language:** TypeScript
- **Navigation:** Expo Router
- **Map:** React Native Maps (Google Maps Provider)
- **State Management:** Zustand (기획 단계에서는 Redux Toolkit을 고려했으나, 현재 `zustand` 가 설치되어 있습니다.)
- **Styling:** React Native StyleSheet

## 📂 프로젝트 구조

```
.
├── app/              # Expo Router 기반의 스크린 및 네비게이션
│   ├── (tabs)/       # 탭 기반 레이아웃
│   └── hospital/     # 병원 상세 페이지
├── assets/           # 폰트, 이미지 등 정적 에셋
├── components/       # 재사용 가능한 UI 컴포넌트
├── constants/        # 색상, 스타일 등 공통 상수
├── data/             # 임시 데이터 (현재 병원 mock 데이터)
├── hooks/            # 커스텀 훅
└── types/            # TypeScript 타입 정의
```

## 🚀 시작하기

### 1. 프로젝트 클론 및 의존성 설치

```bash
git clone <repository-url>
cd animal-map-app
npm install
```

### 2. 환경 변수 설정

`app.config.js`에서 Google Maps API 키를 사용하고 있습니다. 프로젝트 루트에 `.env` 파일을 생성하고 아래와 같이 API 키를 추가해야 합니다.

```
GOOGLE_MAPS_API_KEY="YOUR_GOOGLE_MAPS_API_KEY"
```

### 3. 앱 실행

- **iOS:** `npm run ios`
- **Android:** `npm run android`
- **Web:** `npm run web`

## 📝 API

현재는 `data/hospitals.ts`에 있는 mock 데이터를 사용하여 개발 중입니다.
최종적으로는 [공공데이터포털](https://www.data.go.kr/)에서 제공하는 전국 동물병원 정보를 활용할 계획입니다.
