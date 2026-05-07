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
            <p class="text-neutral-600 mb-8 leading-relaxed">
                We offer premium plastic bottles (PET) as our primary material, with glass and aluminum available as premium alternatives. Our 200ml square bottles are our best-seller with precise dimensions optimized for branding.
            </p>
            <div class="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)] mb-6">
                <div class="grid grid-cols-4 gap-4 bg-neutral-50 p-6 border-b border-neutral-200 text-xs font-bold tracking-widest text-neutral-500 uppercase">
                    <div>Size</div>
                    <div>Dimensions (mm)</div>
                    <div>Label Area</div>
                    <div>Material</div>
                </div>
                
                <div class="grid grid-cols-4 gap-4 p-6 border-b border-neutral-100 text-sm font-medium text-neutral-900">
                    <div>200ml Square <span class="text-neutral-600 text-xs font-bold ml-1">Best Seller</span></div>
                    <div>45 x 45 x 125</div>
                    <div>180 x 55mm (wrap)</div>
                    <div>Premium PET</div>
                </div>
                <div class="grid grid-cols-4 gap-4 p-6 border-b border-neutral-100 text-sm font-medium text-neutral-900">
                    <div>250ml Round</div>
                    <div>Ø50 x 130</div>
                    <div>157 x 50mm</div>
                    <div>Premium PET</div>
                </div>
                <div class="grid grid-cols-4 gap-4 p-6 border-b border-neutral-100 text-sm font-medium text-neutral-900">
                    <div>500ml Standard</div>
                    <div>Ø60 x 180</div>
                    <div>188 x 60mm</div>
                    <div>Premium PET</div>
                </div>
                <div class="grid grid-cols-4 gap-4 p-6 border-b border-neutral-100 text-sm font-medium text-neutral-900">
                    <div>750ml Premium</div>
                    <div>Ø70 x 200</div>
                    <div>220 x 70mm</div>
                    <div>Premium PET</div>
                </div>
                <div class="grid grid-cols-4 gap-4 p-6 text-sm font-medium text-neutral-900">
                    <div>1L Family</div>
                    <div>Ø80 x 220</div>
                    <div>251 x 80mm</div>
                    <div>Premium PET</div>
                </div>
            </div>

            <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 mb-12">
                <h4 class="font-bold text-neutral-900 mb-3">Material Options</h4>
                <div class="grid grid-cols-3 gap-4 text-sm">
                    <div>
                        <span class="font-semibold text-neutral-900">Premium PET</span>
                        <p class="text-neutral-500 text-xs mt-1">Standard - Crystal clear, food-safe, 100% recyclable</p>
                    </div>
                    <div>
                        <span class="font-semibold text-neutral-900">Glass</span>
                        <p class="text-neutral-500 text-xs mt-1">+₹40/unit - Premium feel, premium brand</p>
                    </div>
                    <div>
                        <span class="font-semibold text-neutral-900">Aluminum</span>
                        <p class="text-neutral-500 text-xs mt-1">Custom quote - Eco-friendly, fully recyclable</p>
                    </div>
                </div>
            </div>

            <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 mb-12">
                <div class="flex items-start gap-3">
                    <div class="w-6 h-6 bg-neutral-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                        <span class="font-bold text-neutral-900">Minimum Order Quantity (MOQ): 500 bottles</span>
                        <p class="text-neutral-600 text-sm mt-1">Lead time: 7-10 business days for PET. Glass & custom materials may require additional lead time.</p>
                    </div>
                </div>
            </div>

            <h2 class="text-3xl font-bold text-neutral-900 mb-6 mt-16" id="fssai">FSSAI Certification</h2>
            <p class="text-neutral-600 mb-6 leading-relaxed">
                Every bottle we ship is packed in our state-of-the-art facility adhering to strict quality guidelines. The water undergoes our rigorous 7-step purification process including reverse osmosis, UV treatment, and ozone sterilization.
            </p>
            <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 mb-8">
                <div class="flex items-start gap-3">
                    <div class="w-6 h-6 bg-neutral-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                        <span class="font-bold text-neutral-900">FSSAI License: 3026041324102600</span>
                        <p class="text-neutral-600 text-sm mt-1">Fully compliant for resale, distribution, and corporate gifting.</p>
                    </div>
                </div>
            </div>
            <p class="text-neutral-600 leading-relaxed mb-16">
                Your custom branded label will legally include our FSSAI license number and mandatory nutritional information clearly printed on the back panel to ensure 100% compliance for resale or corporate distribution.
            </p>

            <h2 class="text-3xl font-bold text-neutral-900 mb-6 mt-16" id="shipping">Shipping & Delivery</h2>
            <p class="text-neutral-600 mb-8 leading-relaxed">
                We partner with trusted logistics providers to ensure your custom water bottles reach you safely and on time. All orders are carefully packed in damage-resistant packaging with temperature control options available.
            </p>
            
            <div class="grid md:grid-cols-2 gap-6 mb-12">
                <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                        </div>
                        <h4 class="font-bold text-neutral-900">Standard Delivery</h4>
                    </div>
                    <p class="text-neutral-600 text-sm">7-10 business days. Free for orders above 5,000 units. Trackable via SMS and email.</p>
                </div>
                <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h4 class="font-bold text-neutral-900">Express Delivery</h4>
                    </div>
                    <p class="text-neutral-600 text-sm">3-5 business days. Additional charges apply based on location. Priority handling.</p>
                </div>
            </div>

            <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 mb-12">
                <h4 class="font-bold text-neutral-900 mb-4">Shipping Coverage</h4>
                <ul class="grid md:grid-cols-2 gap-3 text-sm text-neutral-700">
                    <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-neutral-500 rounded-full"></span>
                        PAN India Delivery Available
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-neutral-500 rounded-full"></span>
                        International Shipping (Custom Quote)
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-neutral-500 rounded-full"></span>
                        Bulk Orders: Door-to-Door Delivery
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-neutral-500 rounded-full"></span>
                        Insurance Included on All Shipments
                    </li>
                </ul>
            </div>

            <h3 class="text-xl font-bold text-neutral-900 mb-4 mt-12">Packaging Standards</h3>
            <div class="bg-white border border-neutral-200 rounded-2xl overflow-hidden mb-16">
                <div class="grid grid-cols-2 gap-4 p-6 bg-neutral-50 border-b border-neutral-200 text-xs font-bold tracking-widest text-neutral-500 uppercase">
                    <div>Feature</div>
                    <div>Specification</div>
                </div>
                <div class="grid grid-cols-2 gap-4 p-6 border-b border-neutral-100 text-sm">
                    <div class="font-medium text-neutral-900">Primary Packaging</div>
                    <div class="text-neutral-600">Shrink-wrapped in batches of 50</div>
                </div>
                <div class="grid grid-cols-2 gap-4 p-6 border-b border-neutral-100 text-sm">
                    <div class="font-medium text-neutral-900">Outer Carton</div>
                    <div class="text-neutral-600">5-ply corrugated boxes, GST-tested</div>
                </div>
                <div class="grid grid-cols-2 gap-4 p-6 border-b border-neutral-100 text-sm">
                    <div class="font-medium text-neutral-900">Palletization</div>
                    <div class="text-neutral-600">Standard for orders 5,000+ units</div>
                </div>
                <div class="grid grid-cols-2 gap-4 p-6 text-sm">
                    <div class="font-medium text-neutral-900">Fragile Handling</div>
                    <div class="text-neutral-600">Glass bottles: Additional cushioning</div>
                </div>
            </div>

            <h3 class="text-xl font-bold text-neutral-900 mb-4">Returns & Damages</h3>
            <p class="text-neutral-600 mb-4 leading-relaxed">
                In the rare event of damage during transit, we offer a hassle-free replacement policy. Simply share photos of the damaged goods within 48 hours of delivery, and we'll arrange immediate replacements at no additional cost.
            </p>
            <p class="text-neutral-500 text-sm pb-16">
                For any queries about shipping or to request a custom logistics solution for large orders, contact us at <span class="font-medium text-neutral-700">logistics@primewater.in</span>
            </p>
        </main>
    </div>
</div>
