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
        
        const prompt = `Generate a professional product photography image of a 200ml square plastic water bottle with a custom label for brand "${brandName}". The bottle should have a clean, premium look with a white/transparent body. The label design should be ${vibe || 'clean, minimalist, premium'}. Show the bottle on a clean white or light gray background with soft studio lighting. High quality, photorealistic, commercial product shot.`;

        let result;
        let model;
        
        // Try gemini-2.5-flash first (latest stable), fallback to 1.5-flash
        try {
            model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
            result = await model.generateContent({
                contents: [{ parts: [{ text: prompt }] }]
            });
        } catch (e) {
            console.log('gemini-2.5-flash not available, trying gemini-1.5-flash');
            model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            result = await model.generateContent({
                contents: [{ parts: [{ text: prompt }] }]
            });
        }

        const response = result.response;
        
        if (response.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
            const base64 = response.candidates[0].content.parts[0].inlineData.data;
            return json({
                success: true,
                image: `data:image/png;base64,${base64}`,
                design: {
                    id: `design_${Date.now()}`,
                    brandName,
                    vibe,
                    bottleSize,
                    material,
                    createdAt: new Date().toISOString()
                }
            });
        } else {
            return json({ 
                success: true,
                design: {
                    id: `design_${Date.now()}`,
                    brandName,
                    vibe,
                    bottleSize,
                    material,
                    createdAt: new Date().toISOString()
                },
                message: 'Design generated but no image returned'
            });
        }

    } catch (error) {
        console.error('Gemini API error:', error);
        return json({ error: 'Failed to generate design: ' + error.message }, { status: 500 });
    }
}