<script>
    import { goto } from '$app/navigation';
    let isGenerating = $state(false);
    let generated = $state(false);
    
    function generateLabel() {
        isGenerating = true;
        setTimeout(() => {
            isGenerating = false;
            generated = true;
        }, 3000);
    }
</script>

<div class="min-h-screen bg-[#0B132B] text-white pt-24 px-4 pb-12">
    <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 h-[calc(100vh-8rem)]">
        
        <!-- Left Panel: Controls -->
        <div class="bg-[#1C2541] rounded-3xl p-8 border border-blue-500/20 flex flex-col shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                 <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
            </div>
            
            <h1 class="text-3xl font-bold mb-2">Design Studio</h1>
            <p class="text-blue-200/70 mb-8">Upload your assets to generate a stunning custom label.</p>
            
            <div class="flex-1 space-y-6">
                <!-- Upload Area -->
                <div class="border-2 border-dashed border-blue-500/30 rounded-2xl p-8 text-center hover:bg-blue-500/5 transition-colors cursor-pointer group">
                    <div class="w-16 h-16 bg-blue-500/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    </div>
                    <p class="font-medium text-blue-100">Drop your brand logo here</p>
                    <p class="text-sm text-blue-300/60 mt-1">SVG, PNG, or JPG (max. 5MB)</p>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-blue-200 mb-2">Brand Name</label>
                    <input type="text" placeholder="e.g. Acme Corp" class="w-full bg-[#0B132B] border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-blue-200 mb-2">Aesthetic / Vibe</label>
                    <select class="w-full bg-[#0B132B] border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors">
                        <option>Luxury & Minimal</option>
                        <option>Corporate & Clean</option>
                        <option>Vibrant & Playful</option>
                        <option>Eco & Organic</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-blue-200 mb-2">Bottle Size</label>
                    <select class="w-full bg-[#0B132B] border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors">
                        <option>200ml Square (Best Seller)</option>
                        <option>250ml Round</option>
                        <option>500ml Standard</option>
                        <option>750ml Premium</option>
                        <option>1L Family</option>
                    </select>
                </div>
            </div>
            
            <button 
                onclick={generateLabel}
                disabled={isGenerating}
                class="w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
                {isGenerating ? 'AI is Generating...' : 'Generate Label Design'}
            </button>
        </div>
        
        <!-- Right Panel: Preview -->
        <div class="bg-gradient-to-br from-[#0B132B] to-[#1C2541] rounded-3xl border border-blue-500/10 flex items-center justify-center relative overflow-hidden">
            {#if !isGenerating && !generated}
                <div class="text-center p-8">
                    <div class="w-24 h-24 bg-[#1C2541] rounded-full mx-auto mb-6 flex items-center justify-center border border-blue-500/20">
                        <svg class="w-10 h-10 text-blue-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    </div>
                    <h3 class="text-xl font-medium text-blue-200">Awaiting Generation</h3>
                    <p class="text-sm text-blue-400/50 mt-2">Your 3D mockup will appear here</p>
                </div>
            {:else if isGenerating}
                <div class="text-center">
                    <div class="w-16 h-16 border-4 border-blue-500/20 border-t-cyan-400 rounded-full animate-spin mx-auto mb-6"></div>
                    <p class="text-cyan-400 font-medium animate-pulse">Running proprietary model...</p>
                </div>
            {:else}
                <div class="text-center animate-in fade-in zoom-in duration-500 p-8 w-full">
                    <!-- Fake Bottle Mockup (Square) -->
                    <div class="relative w-40 h-80 mx-auto mb-8 bg-gradient-to-b from-blue-100 to-blue-200 rounded-sm shadow-2xl overflow-hidden shadow-cyan-500/20 perspective-1000 transform-style-3d border border-white/40">
                        <!-- Cap -->
                        <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-6 bg-blue-900 border-b border-blue-800 rounded-sm z-20"></div>
                        <!-- Label -->
                        <div class="absolute top-[30%] w-full h-32 bg-[#0B132B] border-y border-cyan-500/30 flex items-center justify-center flex-col z-10">
                            <span class="text-xs text-blue-300 tracking-widest uppercase mb-1">Acme Corp</span>
                            <span class="text-lg font-bold text-white tracking-widest">PRIME</span>
                            <span class="text-xs text-cyan-400 mt-2">Premium Water</span>
                        </div>
                        <!-- Reflections for Square Edge -->
                        <div class="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-black/10 mix-blend-overlay w-full z-10 pointer-events-none"></div>
                        <div class="absolute left-4 top-0 bottom-0 w-1 bg-white/40 z-10 pointer-events-none"></div>
                        <div class="absolute right-4 top-0 bottom-0 w-1 bg-white/20 z-10 pointer-events-none"></div>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-2">Generation Complete</h3>
                    <p class="text-blue-200/70 mb-8">Ready for production. Review the label above.</p>
                    <button 
                        onclick={() => goto('/order')}
                        class="px-8 py-3 bg-white text-[#0B132B] font-bold rounded-full hover:scale-105 transition-transform shadow-xl">
                        Proceed to Order
                    </button>
                </div>
            {/if}
        </div>
    </div>
</div>
