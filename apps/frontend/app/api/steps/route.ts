import { NextResponse } from 'next/server';

import { prisma } from '@/app/utils/prisma';
import type { Prisma } from '@prisma/client';
import { handleError } from '@/app/utils/errorUtils';
import { escapeHtml } from '@/app/utils/stringUtils';

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

export async function GET() {
  try {
    const steps = await prisma.step.findMany({
      select: { id: true, title: true },
    });
    return NextResponse.json(steps);
  } catch (error: unknown) {
    const apiError = handleError(error);
    return NextResponse.json(
      { error: escapeHtml(apiError.message) },
      { status: apiError.status },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { title, description, externalUrl, markdown } = body as Record<
      string,
      unknown
    >;

    if (typeof title !== 'string' || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const step = await prisma.step.create({
      data: {
        title: escapeHtml(title),
        description: escapeHtml(description),
        externalUrl: typeof externalUrl === 'string' ? externalUrl : undefined,
        markdown: (markdown ?? undefined) as Prisma.InputJsonValue | undefined,
      },
    });

    return NextResponse.json(step, { status: 201 });
  } catch (error: unknown) {
    const apiError = handleError(error);
    return NextResponse.json(
      { error: escapeHtml(apiError.message) },
      { status: apiError.status },
    );
  }
}
