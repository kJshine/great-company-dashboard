# Dashboard Project

## 프로젝트 소개
Next.js와 TypeScript, React-Query를 학습하기 위해 간단한 대시보드 페이지를 만드는 프로젝트입니다.

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 15
- **Language**: TypeScript
- **State Management**: React Query (TanStack Query) (예정)

### UI/UX
- **Styling**: Tailwind CSS
- **Component Library**: Shadcn/ui
- **Form Management**: React Hook Form + Zod

### Backend (예정)
<!--
- **Runtime**: Node.js
- **API**: RESTful API 또는 GraphQL (미정)
-->

## 📦 주요 라이브러리

```json
{
  "dependencies": {
    "@hookform/resolvers": "^5.0.1",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-tooltip": "^1.2.7",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.511.0",
    "next": "15.3.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.56.4",
    "tailwind-merge": "^3.3.0",
    "zod": "^3.25.32"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.3.2",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.3.0",
    "typescript": "^5"
  }
}
```

## 🎯 학습 목표
- [ ] Next.js 15 App Router 학습
- [ ] TypeScript를 활용한 타입 안전성 확보
- [ ] Tailwind CSS + Shadcn/ui로 모던 UI 구축
- [ ] React Hook Form + Zod를 활용한 폼 검증
- [ ] React Query를 통한 서버 상태 관리

## 🚀 시작하기

### 설치
```bash
npm install
# 또는
yarn install
```

### 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
```

## 📁 프로젝트 구조
<!--
```
├── app/                    # Next.js 15 App Router
│   ├── dashboard/         # 대시보드 페이지
│   ├── globals.css        # 전역 스타일
│   └── layout.tsx         # 루트 레이아웃
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # Shadcn/ui 컴포넌트
│   └── forms/            # 폼 관련 컴포넌트
├── lib/                  # 유틸리티 함수
│   ├── utils.ts          # 공통 유틸
│   └── validations.ts    # Zod 스키마
├── hooks/                # 커스텀 훅
│   └── use-query.ts      # React Query 훅
└── types/                # TypeScript 타입 정의
    └── index.ts
```
-->

## 🔧 개발 환경
- **Node.js**: 18.17.0 이상
- **Package Manager**: npm
- **IDE**: VS Code

## 📚 참고 자료
- [Next.js 공식 문서](https://nextjs.org/docs)
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs)
- [React Query 공식 문서](https://tanstack.com/query/latest)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [Shadcn/ui 공식 문서](https://ui.shadcn.com)

## 📝 개발 로그
- [ ] 프로젝트 초기 설정
- [ ] 기본 레이아웃 구성
- [ ] 폼 시스템 구축
- [ ] 로그인 UI 구현
- [ ] 회원가입 UI 구현
- [ ] 대시보드 UI 구현
- [ ] API 연동 (예정)
- [ ] 상태 관리 적용 (예정)

---
