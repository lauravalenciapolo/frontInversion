import { corsHeaders } from '../utils/cors';

const sampleUsers = [
  { id: '1', email: 'test@example.com', password: 'password123', name: 'Test User' },
  { id: '2', email: 'admin@example.com', password: 'admin123', name: 'Admin User' }
];

export async function handleLogin(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const body = await request.json() as { email: string; password: string };
    const { email, password } = body;
    const user = sampleUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const token = btoa(`${user.id}:${user.email}`);
    return new Response(JSON.stringify({ success: true, 
        data:{token, id: user.id, email: user.email, name: user.name }}), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}
