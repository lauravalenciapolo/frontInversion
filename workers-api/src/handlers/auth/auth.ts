import { corsHeaders } from '../../utils/cors';
import { Env } from '../../types';

// LOGIN
export async function handleLogin(request: Request, env: Env) {
  try {
    const { email, password } = await request.json() as { email: string; password: string };;

    const userRaw = await env.USERS.get(email);
    if (!userRaw) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const user = JSON.parse(userRaw);
    if (user.password !== password) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const token = btoa(`${user.id}:${user.email}`);
    return new Response(JSON.stringify({
      success: true,
      data: { token, id: user.id, email: user.email, name: user.name }
    }), {
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

// REGISTER
export async function handleRegister(request: Request, env: Env) {
  try {
    const { email, password, name } = await request.json() as { email: string; password: string; name: string };

    const existing = await env.USERS.get(email);
    if (existing) {
      return new Response(JSON.stringify({ success: false, error: 'Email already in use' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const id = crypto.randomUUID();
    const newUser = { id, email, password, name };
    console.log(newUser, "newUser");
    await env.USERS.put(email, JSON.stringify(newUser));
    console.log("entra")
    return new Response(JSON.stringify({ success: true, data: { id, email, name } }), {
      status: 201,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}
