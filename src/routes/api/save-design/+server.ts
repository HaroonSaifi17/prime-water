import { json } from '@sveltejs/kit';

// In-memory storage for demo (replace with database in production)
const savedDesigns = new Map();

export async function POST({ request }) {
    try {
        const designData = await request.json();

        if (!designData.brandName) {
            return json({ error: 'Brand name is required' }, { status: 400 });
        }

        const designId = `design_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const savedDesign = {
            id: designId,
            ...designData,
            savedAt: new Date().toISOString()
        };

        savedDesigns.set(designId, savedDesign);

        return json({
            success: true,
            designId,
            message: 'Design saved successfully'
        });

    } catch (error) {
        console.error('Save design error:', error);
        return json({ error: 'Failed to save design' }, { status: 500 });
    }
}

export async function GET() {
    return json({
        designs: Array.from(savedDesigns.values())
    });
}