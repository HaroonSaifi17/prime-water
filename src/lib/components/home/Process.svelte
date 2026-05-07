<script>
    import { reveal } from '$lib/utils/animations.js';
</script>

<section id="how" class="py-24 md:py-32 bg-neutral-50 border-t border-neutral-100 overflow-hidden">
    <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-3 gap-12 lg:gap-16">
            <!-- Step 1 -->
            <div use:reveal={{delay: 0}} class="space-y-6 group">
                <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-neutral-100 group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 text-black">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path>
                    </svg>
                </div>
                <div>
                    <h3 class="text-2xl font-bold text-neutral-900 tracking-tight mb-3">1. AI Synthesis</h3>
                    <p class="text-neutral-500 font-medium leading-relaxed">Our proprietary Nano Banao model analyzes your logo and brand guidelines to instantly generate stunning, production-ready label wrap mockups.</p>
                </div>
            </div>

            <!-- Step 2 -->
            <div use:reveal={{delay: 150}} class="space-y-6 group">
                <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-neutral-100 group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 text-black">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"></path>
                    </svg>
                </div>
                <div>
                    <h3 class="text-2xl font-bold text-neutral-900 tracking-tight mb-3">2. 7-Step Purification</h3>
                    <p class="text-neutral-500 font-medium leading-relaxed">It's not just a beautiful bottle. We utilize advanced reverse osmosis and UV treatment to deliver crisp, FSSAI-certified premium hydration.</p>
                </div>
            </div>

            <!-- Step 3 -->
            <div use:reveal={{delay: 300}} class="space-y-6 group">
                <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-neutral-100 group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 text-black">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"></path>
                    </svg>
                </div>
                <div>
                    <h3 class="text-2xl font-bold text-neutral-900 tracking-tight mb-3">3. Rapid Logistics</h3>
                    <p class="text-neutral-500 font-medium leading-relaxed">From digital approval to physical delivery in record time. We manage the entire supply chain to stock your corporate event or retail shelf.</p>
                </div>
            </div>
        </div>
    </div>
</section>
