import { NextResponse } from 'next/server';

import { handleError } from '@/app/utils/errorUtils';
import { escapeHtml } from '@/app/utils/stringUtils';
import { prisma } from '@/app/utils/prisma';

export async function GET() {
  try {
    const testItems = await prisma.testItem.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(testItems);
  } catch (error) {
    const apiError = handleError(error);
    return NextResponse.json(
      { error: escapeHtml(apiError.message), code: apiError.code },
      { status: apiError.status },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        { error: escapeHtml('Name is required and must be a string') },
        { status: 400 },
      );
    }

    const testItem = await prisma.testItem.create({
      data: {
        name: escapeHtml(body.name),
      },
    });
    return NextResponse.json(testItem, { status: 201 });
  } catch (error) {
    const apiError = handleError(error);
    return NextResponse.json(
      { error: escapeHtml(apiError.message), code: apiError.code },
      { status: apiError.status },
    );
  }
}
