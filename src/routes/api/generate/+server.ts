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

        let result;
        let model;
        let modelUsed = 'gemini-2.5-flash-image';
        
        try {
            model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image' });
            result = await model.generateContent({
                contents: [{ parts: [{ text: prompt }] }]
            });
        } catch (e) {
            console.warn('Nano Banana (gemini-2.5-flash-image) failed, falling back to Nano Banana 2:', e.message);
            modelUsed = 'gemini-3.1-flash-image-preview';
            model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-image-preview' });
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
                model: modelUsed,
                design: {
                    id: `design_${Date.now()}`,
                    brandName,
                    vibe,
                    bottleSize,
                    createdAt: new Date().toISOString()
                }
            });
        } else {
            // If no image is returned (sometimes happens if safety filters trigger or model choice)
            return json({ 
                success: true,
                model: modelUsed,
                design: {
                    id: `design_${Date.now()}`,
                    brandName,
                    vibe,
                    bottleSize,
                    createdAt: new Date().toISOString()
                },
                message: 'Design logic processed, but no visual generated. Using fallback preview.'
            });
        }

    } catch (error) {
        console.error('Gemini API error:', error);
        return json({ error: 'Failed to generate design: ' + error.message }, { status: 500 });
    }
}