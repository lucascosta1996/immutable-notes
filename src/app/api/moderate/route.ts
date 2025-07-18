import { NextRequest, NextResponse } from 'next/server';

type OpenAIModerationResponse = {
  results: { flagged: boolean }[];
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Invalid or missing message.' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: message }),
    });

    console.log('Moderation response status:', response);

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: 'OpenAI API failed.' },
        { status: 502 }
      );
    }

    const data = (await response.json()) as OpenAIModerationResponse;
    const flagged = data.results?.[0]?.flagged ?? false;

    return NextResponse.json({ ok: !flagged, flagged });
  } catch (error) {
    console.error('Moderation error:', error);
    return NextResponse.json(
      { ok: false, error: 'Server error.' },
      { status: 500 }
    );
  }
}
