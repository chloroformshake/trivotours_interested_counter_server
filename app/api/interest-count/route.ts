import { NextResponse } from 'next/server';

// Updated BASE to match your new counter exactly
const BASE = 'https://api.counterapi.dev/v2/supporttrivos-team-2891/trivotours-counter-84-ghats';
const TOKEN = process.env.COUNTER_API_TOKEN;

const headers = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: 'application/json',
};

function withCors(response: NextResponse) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return response;
}

export async function GET() {
    try {
        const res = await fetch(BASE, { headers, cache: 'no-store' });
        if (!res.ok) throw new Error(`GET failed: ${res.status}`);
        const data = await res.json();
        // CounterAPI returns { value: number }
        return withCors(NextResponse.json({ count: data.value ?? 142 }));
    } catch (err) {
        return withCors(NextResponse.json({ count: 142 }, { status: 200 }));
    }
}

export async function POST() {
    try {
        // Updated path: BASE + /up
        const res = await fetch(`${BASE}/up`, {
            method: 'POST',
            headers,
            cache: 'no-store',
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('CounterAPI Error:', errorText);
            throw new Error(`UP failed: ${res.status}`);
        }

        const data = await res.json();
        return withCors(NextResponse.json({ count: data.value }));
    } catch (err: any) {
        console.error('POST failed:', err.message);
        return withCors(NextResponse.json({ error: err.message }, { status: 500 }));
    }
}

export async function OPTIONS() {
    return withCors(new NextResponse(null, { status: 204 }));
}