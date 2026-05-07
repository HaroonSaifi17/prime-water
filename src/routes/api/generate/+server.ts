import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST({ request }) {
    try {
        const { brandName, vibe, bottleSize, material, logo } = await request.json();

        if (!brandName) {
            return json({ error: 'Brand name is required' }, { status: 400 });
        }

        const apiKey = env.GEMINI_API_KEY;
        
        if (!apiKey) {
            return json({ error: 'Server API key not configured' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        
        const prompt = `Generate a professional product photography image of a ${bottleSize || '200ml square'} plastic water bottle with a custom label for brand "${brandName}". The bottle should have a clean, premium look with a white/transparent body. The label design should be ${vibe || 'clean, minimalist, premium'}. Show the bottle on a clean white or light gray background with soft studio lighting. High quality, photorealistic, commercial product shot.`;

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image' });
        const result = await model.generateContent({
            contents: [{ parts: [{ text: prompt }] }]
        });

        const response = result.response;
        
        if (response.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
            const base64 = response.candidates[0].content.parts[0].inlineData.data;
            return json({
                success: true,
                image: `data:image/png;base64,${base64}`,
                model: 'gemini-2.5-flash-image',
                design: {
                    id: `design_${Date.now()}`,
                    brandName,
                    vibe,
                    bottleSize,
                    createdAt: new Date().toISOString()
                }
            });
        } else {
            return json({ 
                success: true,
                model: 'gemini-2.5-flash-image',
                design: {
                    id: `design_${Date.now()}`,
                    brandName,
                    vibe,
                    bottleSize,
                    createdAt: new Date().toISOString()
                },
                message: 'Design logic processed, but no visual generated.'
            });
        }

    } catch (error) {
        const ref = Math.random().toString(36).substr(2, 8).toUpperCase();
        console.error(`[API Error ${ref}]`, error.message);
        if (error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('rate_limit')) {
            return json({ error: `Daily generation quota exhausted (${ref}). Try again later or upgrade your plan.` }, { status: 429 });
        }
        return json({ error: `Generation failed (${ref})` }, { status: 500 });
    }
}