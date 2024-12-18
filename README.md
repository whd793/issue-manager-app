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
