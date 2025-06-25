import { NextRequest, NextResponse } from 'next/server';
import { isSignupPayload } from './utils';

export async function POST(req: NextRequest) {
  const raw = (await req.json()) as unknown;

  if (!isSignupPayload(raw)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const { email } = raw as { email: string };
  console.log('Signup email:', email);
  return NextResponse.json({ success: true });
}
