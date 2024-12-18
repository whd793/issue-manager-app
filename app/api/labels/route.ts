// Create this file at: app/api/labels/route.ts

import { labelSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '@/app/auth/authOptions';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = labelSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newLabel = await prisma.label.create({
    data: {
      name: body.name,
      color: body.color,
      issues: {
        connect: body.issueId ? [{ id: body.issueId }] : [],
      },
    },
  });

  return NextResponse.json(newLabel, { status: 201 });
}

export async function GET() {
  const labels = await prisma.label.findMany();
  return NextResponse.json(labels);
}
