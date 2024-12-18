# 이슈 트래킹 시스템 - Next.js 애플리케이션

<div align="center">
  <h3>
    <a href="#korean">한국어</a> |
    <a href="#english">English</a>
  </h3>
</div>

---

<h2 id="korean">한국어</h2>

Next.js 13을 기반으로 구축된 현대적인 이슈 트래킹 시스템입니다. 실시간 업데이트, 인증 시스템, 그리고 포괄적인 이슈 관리 기능을 제공합니다. 이 애플리케이션은 TypeScript와 최신 웹 기술을 활용한 풀스택 개발의 모범 사례를 보여줍니다.

## 🌟 주요 기능

### 인증 및 권한 관리
- NextAuth.js를 활용한 Google OAuth 통합
- 보호된 라우트 및 API 엔드포인트
- 안전한 세션 관리
- 사용자 권한 기반 접근 제어

### 이슈 관리
- 이슈의 완전한 CRUD 작업
- 마크다운 지원 리치 텍스트 편집
- 우선순위 레벨 관리
  - Critical (긴급)
  - High (높음)
  - Medium (중간)
  - Low (낮음)
- 상태 추적
  - Open (열림)
  - In Progress (진행 중)
  - Closed (완료)
- 고급 필터링 및 정렬 기능

### 사용자 경험
- 실시간 상태 업데이트
- 이슈 할당 시스템
- 사용자 아바타 및 프로필 통합
- 작업 알림을 위한 토스트 메시지
- 이슈 설명을 위한 마크다운 지원
- 실시간 댓글 시스템

### 대시보드 분석
- 이슈 통계의 시각적 표현
- 상태별 분포 차트
- 최신 이슈 피드
- 우선순위 기반 분류

## 🛠 기술 스택

### 프론트엔드
```
- Next.js 13 (App Router)
- TypeScript
- Radix UI
- TailwindCSS
- React Query
- React Hook Form
- React Hot Toast
- React Markdown
```

### 백엔드
```
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- NextAuth.js
- Zod
```

## 📊 데이터베이스 스키마

```prisma
model Issue {
  id               Int       @id @default(autoincrement())
  title            String    // 이슈 제목
  description      String    // 이슈 설명
  status           Status    @default(OPEN)    // 이슈 상태
  priority         Priority  @default(MEDIUM)  // 우선순위
  createdAt        DateTime  @default(now())   // 생성일
  updatedAt        DateTime  @updatedAt        // 수정일
  assignedToUserId String?                     // 담당자 ID
  assignedToUser   User?     @relation(fields: [assignedToUserId], references: [id])
  comments         Comment[] // 댓글
}

enum Status {
  OPEN
  IN_PROGRESS
  CLOSED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}
```

## 🚀 시작하기

### 사전 요구사항
- Node.js 16.8 이상
- PostgreSQL 데이터베이스

### 설치 방법

1. 저장소 클론
```bash
git clone https://github.com/yourusername/issue-tracker.git
cd issue-tracker
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
```env
DATABASE_URL="postgresql://..."
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
```

4. 데이터베이스 마이그레이션
```bash
npx prisma migrate dev
```

5. 개발 서버 실행
```bash
npm run dev
```

## 💡 사용 방법

1. Google 계정으로 로그인합니다.
2. 메인 페이지에서 "New Issue" 버튼을 클릭합니다.
3. 이슈 제목과 설명을 작성합니다.
4. 우선순위를 선택합니다.
5. 필요한 경우 담당자를 지정합니다.
6. Submit 버튼을 클릭하여 이슈를 생성합니다.
7. 생성된 이슈는 목록에서 확인할 수 있습니다.
8. 이슈 상태는 드래그 앤 드롭으로 변경할 수 있습니다.

## 📱 반응형 디자인
- 모바일 우선 접근법
- 적응형 레이아웃
- 터치 친화적 인터페이스
- 크로스 디바이스 호환성

## 🔒 보안 기능
- CSRF 보호
- 입력값 검증
- 보호된 API 라우트
- 안전한 인증 흐름
- XSS 방지

## 🎯 성능 최적화
- 서버 사이드 렌더링
- 낙관적 업데이트
- 효율적인 캐싱
- 코드 분할
- 이미지 최적화

## 🧪 테스트

```bash
# 단위 테스트 실행
npm run test

# E2E 테스트 실행
npm run test:e2e
```

## 📦 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start
```

## 🤝 기여하기
프로젝트에 기여하고 싶으시다면 다음 단계를 따라주세요:

1. 이 저장소를 포크합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📝 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.
---

<h2 id="english">English</h2>

# Issue Manager - Full Stack Next.js Application

A modern, feature-rich issue tracking system built with Next.js 13, Prisma, and TypeScript. This application demonstrates best practices in full-stack development, real-time updates, and modern web architecture.

![Issue Tracker Dashboard](placeholder-for-screenshot)

## 🌟 Key Features

### Authentication & Authorization
- Google OAuth integration using NextAuth.js
- Protected routes and API endpoints
- Secure user sessions and role-based access

### Issue Management
- Create, read, update, and delete (CRUD) operations for issues
- Rich text editing with Markdown support
- Advanced filtering and sorting capabilities
- Real-time status updates
- Priority levels (Critical, High, Medium, Low)
- Label system for better organization

### User Interaction
- Comment system with real-time updates
- Issue assignment capabilities
- User avatars and profile integration
- Toast notifications for user actions
- Markdown support for issue descriptions
- Comment system with real-time updates



### Dashboard & Analytics
- Overview of issue statistics
- Status distribution visualization
- Latest issues feed
- Priority-based categorization

## 🛠 Technical Stack

### Frontend
- **Next.js 13** with App Router
- **TypeScript** for type safety
- **Radix UI** for accessible component library
- **TailwindCSS** for styling
- **React Query** for server state management
- **React Hook Form** for form handling
- **React Hot Toast** for notifications
- **React Markdown** for content rendering



### Backend
- **Next.js API Routes** for serverless functions
- **Prisma** for database operations
- **PostgreSQL** for data storage
- **NextAuth.js** for authentication
- **Zod** for schema validation

## 📊 Database Schema

```prisma
model Issue {
  id               Int       @id @default(autoincrement())
  title            String
  description      String
  status           Status    @default(OPEN)
  priority         Priority  @default(MEDIUM)
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
  assignedToUserId String?
  assignedToUser   User?     @relation(fields: [assignedToUserId], references: [id])
  comments         Comment[]
  labels           Label[]
}

enum Status {
  OPEN
  IN_PROGRESS
  CLOSED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}
```

## 🚀 Implementation Highlights

### Real-time Updates
- Optimistic updates for immediate user feedback
- Server-side data validation
- Efficient state management with React Query

### Performance Optimizations
- Server-side rendering for initial page load
- Client-side navigation for smooth transitions
- Cached database queries
- Optimized API routes

### Security Features
- CSRF protection
- Input sanitization
- Protected API routes
- Secure authentication flow

## 📱 Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interfaces
- Consistent experience across devices

## 🎯 Performance Optimizations
- Server-side rendering
- Optimistic updates
- Efficient caching
- Code splitting
- Image optimization


## 🔧 Code Quality

### Type Safety
```typescript
interface IssueFormData {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignedToUserId?: string;
}
```

### API Route Example
```typescript
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // ... implementation
}
```

## 🔄 State Management
- Client-side state with React hooks
- Server state with React Query
- Form state with React Hook Form
- Global state management for UI components

## 🎯 Future Enhancements
- Email notifications
- Advanced reporting features
- Team collaboration tools
- Custom dashboard widgets
- API documentation
- Integration with external services

## 💡 Learning Outcomes
- Modern Next.js 13 patterns and practices
- Full-stack TypeScript implementation
- Database design and optimization
- Authentication flows and security
- Real-time updates and optimistic UI
- API design and implementation
- State management strategies
- Performance optimization techniques

## 🏃‍♂️ Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/issue-tracker.git
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
DATABASE_URL=your_database_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Run database migrations
```bash
npx prisma migrate dev
```

5. Start the development server
```bash
npm run dev
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License
This project is licensed under the MIT License - see the LICENSE.md file for details.
