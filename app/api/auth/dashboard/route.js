export async function GET(request) {
  const userId = request.headers.get('x-user-id') || 'u1';

  try {
    const res = await fetch('https://mock-backend-hintro.vercel.app/api/auth/dashboard', {
      headers: {
        'x-user-id': userId,
      },
    });

    if (!res.ok) {
      return Response.json({ error: 'Failed to fetch dashboard' }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
