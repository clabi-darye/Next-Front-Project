# Next Front Project

## 📋 프로젝트 개요

**Next Front Project**는 웹 애플리케이션 개발을 위한 Next.js 기반 프론트엔드 템플릿 프로젝트입니다.  
Material-UI, TailwindCSS, Zustand 등의 최신 기술 스택을 활용하여 확장 가능하고 유지보수가 용이한 구조로 설계되었습니다.

## ✨ 주요 특징

- **Next.js 15.3.2** - App Router 기반의 최신 Next.js 구조
- **Material-UI v7** - 일관된 디자인 시스템과 컴포넌트
- **TailwindCSS v4** - 유틸리티 우선 CSS 프레임워크
- **반응형 디자인** - 모바일 우선 반응형 레이아웃
- **상태 관리** - Zustand 기반 경량 상태 관리
- **API 통신** - React Query를 활용한 서버 상태 관리
- **타입 안전성** - TypeScript 완전 지원
- **개발자 경험** - ESLint, Prettier 등 개발 도구 통합

## 🛠️ 기술 스택

### 핵심 프레임워크

- **[Next.js](https://nextjs.org/)** `15.3.2` - React 기반 풀스택 프레임워크
- **[React](https://reactjs.org/)** `19.0.0` - 사용자 인터페이스 라이브러리
- **[TypeScript](https://www.typescriptlang.org/)** `5.x` - 타입 안전성을 위한 JavaScript 확장

### UI 및 스타일링

- **[Material-UI](https://mui.com/)** `7.1.0` - React UI 컴포넌트 라이브러리
- **[TailwindCSS](https://tailwindcss.com/)** `4.x` - 유틸리티 우선 CSS 프레임워크
- **[Material Icons](https://mui.com/material-ui/material-icons/)** - 아이콘 라이브러리

### 상태 관리 및 데이터

- **[Zustand](https://zustand.docs.pmnd.rs/)** `5.0.4` - 경량 상태 관리 라이브러리
- **[TanStack Query](https://tanstack.com/query)** `5.76.1` - 서버 상태 관리
- **[isomorphic-dompurify](https://github.com/kkomelin/isomorphic-dompurify)** - HTML 새니타이징

### 개발 도구

- **[ESLint](https://eslint.org/)** - 코드 품질 및 스타일 검사
- **[PostCSS](https://postcss.org/)** - CSS 후처리기

## 📁 프로젝트 구조

```
next-front-project/
├── app/                          # Next.js App Router
│   ├── (with-drawer)/           # Drawer 있는 레이아웃 그룹
│   │   ├── layout.tsx           # Drawer 있는 레이아웃
│   │   ├── page.tsx             # 메인 홈페이지
│   │   └── template.tsx         # 페이지 템플릿
│   ├── (no-drawer)/             # Drawer 없는 레이아웃 그룹
│   │   └── version/             # 버전 정보 페이지
│   ├── layout.tsx               # 루트 레이아웃
│   ├── providers.tsx            # React Query Provider
│   ├── theme.tsx                # Material-UI 테마 설정
│   ├── globals.css              # 전역 스타일
│   ├── not-found.tsx            # 404 페이지
│   └── favicon.ico              # 파비콘
├── components/                   # 재사용 가능한 컴포넌트
│   ├── AppInitializer.tsx       # 앱 초기화 컴포넌트
│   ├── ThemeProviderClient.tsx  # 클라이언트 테마 프로바이더
│   └── common/                  # 공통 컴포넌트
│       └── GlobalAlert.tsx      # 전역 알림 컴포넌트
├── config/                      # 설정 파일
│   └── drawer.config.tsx        # Drawer 메뉴 설정
├── hooks/                       # 커스텀 React Hooks
│   └── useIsMobile.ts           # 모바일 감지 훅
├── lib/                         # 유틸리티 라이브러리
│   ├── apiUtils.ts              # API 유틸리티 함수
│   ├── mergeClassNames.ts       # 클래스명 병합 유틸리티
│   ├── queryClient.ts           # React Query 클라이언트 설정
│   └── SafeHTML.tsx             # 안전한 HTML 렌더링 컴포넌트
├── services/                    # API 서비스 레이어
│   ├── common/                  # 공통 서비스
│   │   ├── apiClient.ts         # 클라이언트 API 클라이언트
│   │   └── serverService.ts     # 서버 API 클라이언트
│   └── errorHandler.ts          # 에러 핸들링
├── store/                       # Zustand 상태 관리
│   ├── useAlertStore.ts         # 알림 상태 관리
│   └── useDrawerStore.ts        # Drawer 상태 관리
├── types/                       # TypeScript 타입 정의
├── utils/                       # 순수 유틸리티 함수
├── public/                      # 정적 파일
├── next.config.ts               # Next.js 설정
├── tsconfig.json                # TypeScript 설정
├── eslint.config.mjs            # ESLint 설정
├── postcss.config.mjs           # PostCSS 설정
├── tailwind.config.js           # TailwindCSS 설정
└── package.json                 # 프로젝트 의존성
```

## 🚀 시작하기

### 필수 요구사항

- **Node.js** 18.0.0 이상
- **npm** 또는 **yarn** 패키지 매니저

### 설치 및 실행

1. **의존성 설치**

   ```bash
   npm install
   ```

2. **개발 서버 실행**

   ```bash
   npm run dev
   ```

   개발 서버가 [http://localhost:8080](http://localhost:8080)에서 실행됩니다.

3. **프로덕션 빌드**
   ```bash
   npm run build
   npm run start
   ```

### 사용 가능한 스크립트

- `npm run dev` - 개발 서버 실행 (포트 8080)
- `npm run build` - 프로덕션 빌드 생성
- `npm run start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 코드 검사

## 🏗️ 아키텍처 특징

### 1. **레이아웃 그룹 기반 라우팅**

- `(with-drawer)`: Drawer가 포함된 메인 레이아웃
- `(no-drawer)`: Drawer가 없는 독립적인 페이지들

### 2. **계층화된 API 클라이언트**

- **apiClient**: 클라이언트 사이드 API 호출 (`/api` 라우트)
- **serverClient**: 서버 사이드 직접 API 호출
- **자동 재시도**: 지수 백오프를 통한 네트워크 오류 복구
- **에러 핸들링**: 통합된 에러 처리 및 사용자 알림

### 3. **상태 관리 패턴**

- **Zustand**: 전역 UI 상태 (Drawer, Alert 등)
- **React Query**: 서버 상태 및 캐싱
- **로컬 상태**: React useState/useReducer

### 4. **타입 안전성**

- 엄격한 TypeScript 설정
- API 응답 타입 정의
- 컴포넌트 Props 타입 검증

## 🔧 설정 및 커스터마이징

### 환경 변수

```env
NEXT_PUBLIC_BACKEND_SERVER=https://api.example.com
NEXT_PUBLIC_APP_VERSION=0.0.0
```

### Drawer 메뉴 설정

`config/drawer.config.tsx`에서 메뉴 구성을 수정할 수 있습니다:

```typescript
export const drawerConfig = {
  drawerWidth: 240,
  showLogo: false,
  activeMenu: ["home", "settings"],
};
```

### 테마 커스터마이징

`app/theme.tsx`에서 Material-UI 테마를 수정할 수 있습니다.

## 🔗 유용한 링크

- [Next.js 문서](https://nextjs.org/docs)
- [Material-UI 문서](https://mui.com/material-ui/getting-started/)
- [TailwindCSS 문서](https://tailwindcss.com/docs)
- [Zustand 문서](https://zustand.docs.pmnd.rs/)
- [TanStack Query 문서](https://tanstack.com/query/latest)

---
