import { NextResponse } from 'next/server';

import { prisma } from '@/app/utils/prisma';
import type { Prisma } from '@prisma/client';
import { handleError } from '@/app/utils/errorUtils';
import { escapeHtml } from '@/app/utils/stringUtils';

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

export async function GET() {
  try {
    const guides = await prisma.guide.findMany({
      include: { category: true, steps: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(guides);
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

    const { name, introduction, author, categoryId, steps, existingStepIds } =
      body as Record<string, unknown>;

    if (
      typeof name !== 'string' ||
      typeof introduction !== 'string' ||
      typeof author !== 'string' ||
      typeof categoryId !== 'string' ||
      !Array.isArray(steps) ||
      !Array.isArray(existingStepIds) ||
      (steps.length === 0 && (existingStepIds as unknown[]).length === 0)
    ) {
      return NextResponse.json(
        { error: 'Missing or invalid fields' },
        { status: 400 },
      );
    }

    const createdGuide = await prisma.guide.create({
      data: {
        name: escapeHtml(name),
        introduction: escapeHtml(introduction),
        author: escapeHtml(author),
        categoryId,
        steps: {
          create: (steps as unknown[]).map((s) => {
            const step = s as Record<string, unknown>;
            return {
              title: escapeHtml(String(step.title ?? '')),
              description: escapeHtml(String(step.description ?? '')),
              externalUrl:
                typeof step.externalUrl === 'string'
                  ? step.externalUrl
                  : undefined,
              markdown: (step.markdown ?? undefined) as
                | Prisma.InputJsonValue
                | undefined,
            };
          }),
          connect: (existingStepIds as string[]).map((id) => ({ id })),
        },
      },
      include: { steps: true, category: true },
    });

    return NextResponse.json(createdGuide, { status: 201 });
  } catch (error: unknown) {
    const apiError = handleError(error);
    return NextResponse.json(
      { error: escapeHtml(apiError.message) },
      { status: apiError.status },
    );
  }
}
