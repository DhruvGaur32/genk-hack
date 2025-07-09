import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();


const API_TOKEN = process.env.API_Token;
const BASE_URL = "https://public-api.beatoven.ai";

async function composeTrack(prompt: string, format = "wav", looping = false) {
    const url = `${BASE_URL}/api/v1/tracks/compose`;
    const payload = {
        prompt: { text: prompt },
        format,
        looping,
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error('Failed to start composition');
    const data = await response.json();
    return data.task_id;
}

async function checkTaskStatus(task_id: string) {
    const url = `${BASE_URL}/api/v1/tasks/${task_id}`;
    const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${API_TOKEN}` },
    });
    if (!response.ok) throw new Error('Failed to check task status');
    return response.json();
}

async function downloadAndSaveAudio(url: string, fileName: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to download audio');
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const savePath = path.join(process.cwd(), 'public', 'assets', `${fileName}.mp3`);
    fs.writeFileSync(savePath, buffer);
    return `/assets/${fileName}.mp3`;
}

export async function POST(request: NextRequest) {
    try {
        const { prompt, fileName } = await request.json();
        if (!prompt || !fileName) {
            return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
        }

        // 1. Start composition
        const task_id = await composeTrack(prompt, "mp3");

        // 2. Poll for completion
        let statusResp, status, meta;
        for (let i = 0; i < 30; i++) { // Poll up to 30 times (about 2.5 min)
            statusResp = await checkTaskStatus(task_id);
            status = statusResp.status;
            if (status === "composed") {
                meta = statusResp.meta || {};
                break;
            } else if (status === "failed" || status === "error") {
                return new Response(JSON.stringify({ error: 'Audio generation failed' }), { status: 500 });
            }
            await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds
        }
        if (!meta?.track_url) {
            return new Response(JSON.stringify({ error: 'Track URL not found' }), { status: 500 });
        }

        // 3. Download and save audio
        const publicPath = await downloadAndSaveAudio(meta.track_url, fileName);

        return new Response(JSON.stringify({ success: true, path: publicPath }), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
