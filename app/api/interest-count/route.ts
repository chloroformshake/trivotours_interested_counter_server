// app/api/interest-count/route.ts
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

export async function GET() {
    try {
        const res = await fetch(BASE, { headers, cache: 'no-store' });
        if (!res.ok) throw new Error(`CounterAPI GET failed: ${res.status}`);

        const data = await res.json();
        return NextResponse.json({ count: Number(data.value) || 142 });
    } catch (err) {
        console.error('GET /interest-count failed:', err);
        return NextResponse.json({ count: 142 }, { status: 200 }); // never break frontend
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
        return NextResponse.json({ count: Number(data.value) });
    } catch (err) {
        console.error('POST /interest-count failed:', err);
        return NextResponse.json({ error: 'Increment failed' }, { status: 500 });
    }
}

// Optional: prevent OPTIONS preflight spam if needed
export const OPTIONS = () => new NextResponse(null, { status: 204 });