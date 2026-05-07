<script>
    import { reveal } from '$lib/utils/animations.js';
</script>

<div class="pt-32 pb-24 px-6 bg-white min-h-[calc(100vh-64px)]">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
        
        <!-- Sidebar (Sticky) -->
        <aside class="w-full md:w-64 flex-shrink-0 md:sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto pr-4 pb-10" use:reveal={{delay: 0}}>
            <div class="space-y-10">
                <div>
                    <h4 class="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-4">Getting Started</h4>
                    <ul class="space-y-4">
                        <li><a href="#introduction" class="text-sm font-semibold text-black hover:opacity-70 transition-opacity block">Introduction</a></li>
                        <li><a href="#guidelines" class="text-sm font-semibold text-neutral-500 hover:text-black transition-colors block">Design Guidelines</a></li>
                        <li><a href="#materials" class="text-sm font-semibold text-neutral-500 hover:text-black transition-colors block">Materials & Sizing</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-4">Logistics</h4>
                    <ul class="space-y-4">
                        <li><a href="#shipping" class="text-sm font-semibold text-neutral-500 hover:text-black transition-colors block">Shipping & Delivery</a></li>
                        <li><a href="#fssai" class="text-sm font-semibold text-neutral-500 hover:text-black transition-colors block">FSSAI Certification</a></li>
                    </ul>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-grow max-w-3xl prose prose-neutral prose-lg prose-headings:tracking-tight" use:reveal={{delay: 150}}>
            <h1 class="text-5xl font-black text-neutral-900 mb-8 leading-none" id="introduction">Documentation</h1>
            <p class="text-xl text-neutral-500 font-medium mb-12 leading-relaxed">
                Everything you need to know about integrating your brand with Prime Water. From design specs to legal requirements.
            </p>
            
            <hr class="border-neutral-100 my-16" />

            <h2 class="text-3xl font-bold text-neutral-900 mb-6" id="guidelines">Design Guidelines</h2>
            <p class="text-neutral-600 mb-8 leading-relaxed">
                Our Nano Banao model accepts SVG, PNG, and JPEG formats. For the best results on the physical wrap, we strongly recommend providing a high-contrast vector format (SVG) that scales infinitely without artifacting.
            </p>
            <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 mb-12">
                <ul class="list-disc list-inside space-y-3 text-neutral-700 font-medium marker:text-black">
                    <li>Minimum resolution for raster graphics: 2000x2000px at 300dpi.</li>
                    <li>Avoid thin, wispy fonts (&lt; 400 weight) that may not render cleanly on PET material at high speeds.</li>
                    <li>If specifying a brand vibe in the Studio, be highly descriptive (e.g., "Industrial minimalist with heavy typography and generous negative space").</li>
                </ul>
            </div>

            <h2 class="text-3xl font-bold text-neutral-900 mb-6 mt-16" id="materials">Materials & Sizing</h2>
            <div class="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)] mb-12">
                <div class="grid grid-cols-3 gap-4 bg-neutral-50 p-6 border-b border-neutral-200 text-xs font-bold tracking-widest text-neutral-500 uppercase">
                    <div>Format</div>
                    <div>Material</div>
                    <div>Lead Time</div>
                </div>
                
                <div class="grid grid-cols-3 gap-4 p-6 border-b border-neutral-100 text-sm font-medium text-neutral-900">
                    <div>250ml Mini</div>
                    <div>PET / Aluminum</div>
                    <div class="text-neutral-500">48 Hours</div>
                </div>
                
                <div class="grid grid-cols-3 gap-4 p-6 border-b border-neutral-100 text-sm font-medium text-neutral-900">
                    <div>500ml Standard</div>
                    <div>PET / Glass / Alum.</div>
                    <div class="text-neutral-500">48 Hours</div>
                </div>

                <div class="grid grid-cols-3 gap-4 p-6 text-sm font-medium text-neutral-900">
                    <div>750ml Premium</div>
                    <div>Glass Only</div>
                    <div class="text-neutral-500">72 Hours</div>
                </div>
            </div>

            <h2 class="text-3xl font-bold text-neutral-900 mb-6 mt-16" id="fssai">FSSAI Certification</h2>
            <p class="text-neutral-600 mb-6 leading-relaxed">
                Every bottle we ship is packed in our state-of-the-art facility adhering to strict quality guidelines. The water undergoes our rigorous 7-step purification process.
            </p>
            <p class="text-neutral-600 leading-relaxed pb-32">
                Your custom branded label will legally include our FSSAI license number (<span class="font-mono bg-neutral-100 px-2 py-1 rounded text-black font-bold">3026041324102600</span>) and mandatory nutritional information clearly printed on the back panel to ensure 100% compliance for resale or corporate distribution.
            </p>
        </main>
    </div>
</div>
