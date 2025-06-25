import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/app/utils/prisma';
import { handleError } from '@/app/utils/errorUtils';
import { escapeHtml } from '@/app/utils/stringUtils';

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

// GET /api/categories?title=xyz -> returns existing category or creates it on the fly
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');

    // If no title param, return list
    if (!title) {
      const categories = await prisma.category.findMany({
        orderBy: { title: 'asc' },
      });
      return NextResponse.json(categories);
    }

    // Find or create category by title (case-sensitive match)
    const category = await prisma.category.upsert({
      where: { title },
      update: {},
      create: { title: escapeHtml(title) },
      select: { id: true, title: true },
    });

    return NextResponse.json(category);
  } catch (error: unknown) {
    const apiError = handleError(error);
    return NextResponse.json(
      { error: escapeHtml(apiError.message) },
      { status: apiError.status },
    );
  }
}

// POST { title } – creates or upserts category explicitly
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown;
    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { title } = body as { title?: unknown };

    if (typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ error: 'Missing title' }, { status: 400 });
    }

    const category = await prisma.category.upsert({
      where: { title },
      update: {},
      create: { title: escapeHtml(title.trim()) },
      select: { id: true, title: true },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: unknown) {
    const apiError = handleError(error);
    return NextResponse.json(
      { error: escapeHtml(apiError.message) },
      { status: apiError.status },
    );
  }
}
