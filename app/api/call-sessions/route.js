export async function GET(request) {
  const userId = request.headers.get('x-user-id') || 'u1';
  const url = new URL(request.url);
  const limit = url.searchParams.get('limit') || '10';

  try {
    const res = await fetch(`https://mock-backend-hintro.vercel.app/api/call-sessions?limit=${limit}`, {
      headers: {
        'x-user-id': userId,
      },
    });

    if (!res.ok) {
      return Response.json({ callSessions: [], pagination: {} }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ callSessions: [], pagination: {} }, { status: 500 });
  }
}
