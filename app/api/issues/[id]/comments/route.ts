// app/api/issues/[id]/comments/route.ts

import { commentSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '@/app/auth/authOptions';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const body = await request.json();
  const validation = commentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  try {
    const newComment = await prisma.comment.create({
      data: {
        content: body.content,
        issue: {
          connect: { id: parseInt(params.id) },
        },
        user: {
          connect: { id: user.id },
        },
      },
      include: {
        user: true, // Include user data in the response
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating comment' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const comments = await prisma.comment.findMany({
    where: {
      issueId: parseInt(params.id),
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(comments);
}

// // app/api/issues/[id]/comments/route.ts

// import { commentSchema } from '@/app/validationSchemas';
// import prisma from '@/prisma/client';
// import { getServerSession } from 'next-auth';
// import { NextRequest, NextResponse } from 'next/server';
// import authOptions from '@/app/auth/authOptions';

// export async function POST(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user?.email)
//     return NextResponse.json({}, { status: 401 });

//   // First, get the user ID based on the email from the session
//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//   });

//   if (!user)
//     return NextResponse.json({ error: 'User not found' }, { status: 404 });

//   const body = await request.json();
//   const validation = commentSchema.safeParse(body);
//   if (!validation.success)
//     return NextResponse.json(validation.error.format(), { status: 400 });

//   try {
//     const newComment = await prisma.comment.create({
//       data: {
//         content: body.content,
//         issue: {
//           connect: { id: parseInt(params.id) },
//         },
//         user: {
//           connect: { id: user.id },
//         },
//       },
//     });

//     return NextResponse.json(newComment, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Error creating comment' },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const comments = await prisma.comment.findMany({
//     where: {
//       issueId: parseInt(params.id),
//     },
//     include: {
//       user: true,
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//   });

//   return NextResponse.json(comments);
// }
// // // Create this file at: app/api/issues/[id]/comments/route.ts

// // import { commentSchema } from '@/app/validationSchemas';
// // import prisma from '@/prisma/client';
// // import { getServerSession } from 'next-auth';
// // import { NextRequest, NextResponse } from 'next/server';
// // import authOptions from '@/app/auth/authOptions';

// // export async function POST(
// //   request: NextRequest,
// //   { params }: { params: { id: string } }
// // ) {
// //   const session = await getServerSession(authOptions);
// //   if (!session) return NextResponse.json({}, { status: 401 });

// //   const body = await request.json();
// //   const validation = commentSchema.safeParse(body);
// //   if (!validation.success)
// //     return NextResponse.json(validation.error.format(), { status: 400 });

// //   const newComment = await prisma.comment.create({
// //     data: {
// //       content: body.content,
// //       issueId: parseInt(params.id),
// //       userId: session.user!.id,
// //     },
// //   });

// //   return NextResponse.json(newComment, { status: 201 });
// // }

// // export async function GET(
// //   request: NextRequest,
// //   { params }: { params: { id: string } }
// // ) {
// //   const comments = await prisma.comment.findMany({
// //     where: { issueId: parseInt(params.id) },
// //     include: { user: true },
// //     orderBy: { createdAt: 'desc' },
// //   });

// //   return NextResponse.json(comments);
// // }
