// app/api/save_image/route.ts

import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
    try {
        const { imageUrl, fileName } = await request.json();

        if (!imageUrl || !fileName) {
            return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
        }

        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error('Failed to fetch image');
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const savePath = path.join(process.cwd(), 'public', 'assets', `${fileName}.png`);
        fs.writeFileSync(savePath, buffer);

        return new Response(JSON.stringify({ success: true, path: `/assets/${fileName}.png` }), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
