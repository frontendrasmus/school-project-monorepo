import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  console.log('Signup email:', email);
  return NextResponse.json({ success: true });
}
