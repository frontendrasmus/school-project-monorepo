/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

import { handleError } from '@/app/utils/errorUtils';
import { escapeHtml } from '@/app/utils/stringUtils';

type TestItemPayload = {
  name: string;
};

// Using a fresh Prisma client instance here avoids potential ESLint `any` type inference issues.
// In a long-running server process you would typically re-use a singleton (see `app/utils/prisma.ts`).
// However, API routes in Next.js run in a short-lived environment, so creating a new instance
// here is acceptable and keeps the type information intact for the linter.

export async function GET() {
  try {
    const db = new PrismaClient();
    const testItems = await db.testItem.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(testItems);
  } catch (error: unknown) {
    const apiError = handleError(error);
    return NextResponse.json(
      { error: escapeHtml(apiError.message), code: apiError.code },
      { status: apiError.status },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;

    if (
      typeof body !== 'object' ||
      body === null ||
      typeof (body as Record<string, unknown>).name !== 'string'
    ) {
      return NextResponse.json(
        { error: escapeHtml('Name is required and must be a string') },
        { status: 400 },
      );
    }

    const { name } = body as TestItemPayload;

    const db = new PrismaClient();
    const testItem = await db.testItem.create({
      data: {
        name: escapeHtml(name),
      },
    });
    return NextResponse.json(testItem, { status: 201 });
  } catch (error: unknown) {
    const apiError = handleError(error);
    return NextResponse.json(
      { error: escapeHtml(apiError.message), code: apiError.code },
      { status: apiError.status },
    );
  }
}
