import { NextResponse } from 'next/server';

const BASE = 'https://api.counterapi.dev/v2/supporttrivos-team-2891/84-ghats-cruise-ride-interested';
const TOKEN = process.env.COUNTER_API_TOKEN;

if (!TOKEN) {
    console.error('COUNTER_API_TOKEN is missing in environment variables');
}

const headers = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: 'application/json',
};

// Helper to add CORS headers to any response
function withCors(response: NextResponse) {
    response.headers.set('Access-Control-Allow-Origin', '*');           // ← allow all (safe for public counter)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return response;
}

export async function GET() {
    try {
        const res = await fetch(BASE, { headers, cache: 'no-store' });
        if (!res.ok) throw new Error(`CounterAPI GET failed: ${res.status}`);

        const data = await res.json();
        return withCors(NextResponse.json({ count: Number(data.value) || 142 }));
    } catch (err) {
        console.error('GET /interest-count failed:', err);
        return withCors(NextResponse.json({ count: 142 }, { status: 200 }));
    }
}

export async function POST() {
    try {
        const res = await fetch(`${BASE}/up`, {
            method: 'POST',
            headers,
            cache: 'no-store',
        });

        if (!res.ok) throw new Error(`CounterAPI UP failed: ${res.status}`);

        const data = await res.json();
        return withCors(NextResponse.json({ count: Number(data.value) }));
    } catch (err) {
        console.error('POST /interest-count failed:', err);
        return withCors(NextResponse.json({ error: 'Increment failed' }, { status: 500 }));
    }
}

export async function OPTIONS() {
    return withCors(
        new NextResponse(null, {
            status: 204,
        })
    );
}