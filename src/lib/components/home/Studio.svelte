<script>
    import { reveal } from '$lib/utils/animations.js';

    let isGenerating = false;
    
    // Form state
    let formData = {
        quantity: '500',
        size: '500ml',
        vibe: '',
        material: 'Premium PET'
    };

    function handleGenerate() {
        if (!isGenerating) {
            isGenerating = true;
            setTimeout(() => {
                isGenerating = false;
            }, 4000);
        }
    }
</script>

<section id="studio" class="py-32 bg-white px-6 overflow-hidden">
    <div class="max-w-7xl mx-auto">
        <div use:reveal class="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
            <div>
                <h2 class="text-5xl md:text-7xl font-black tracking-tighter text-neutral-900 mb-2">The Studio.</h2>
                <p class="text-neutral-500 font-medium text-lg">Configure your brand parameters below.</p>
            </div>
            <p class="text-neutral-500 font-mono text-sm px-4 py-2 bg-neutral-100 rounded-full w-max border border-neutral-200">NANO_BANAO v2.0</p>
        </div>
        
        <div class="grid lg:grid-cols-12 gap-6 lg:gap-10">
            <!-- Left: Controls -->
            <div use:reveal={{delay: 150}} class="lg:col-span-5 bg-neutral-50 p-8 md:p-10 rounded-[2.5rem] border border-neutral-200 shadow-sm flex flex-col justify-between">
                <div class="space-y-8">
                    
                    <!-- Upload -->
                    <div>
                        <div class="flex justify-between items-center mb-3">
                            <span class="font-bold text-neutral-900">Brand Logo</span>
                            <span class="text-neutral-400 text-xs font-bold tracking-wider uppercase">PNG / SVG</span>
                        </div>
                        <button class="w-full h-32 border-2 border-dashed border-neutral-300 rounded-2xl flex items-center justify-center bg-white cursor-pointer hover:border-black hover:bg-neutral-50 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-neutral-50">
                            <span class="text-neutral-400 font-medium group-hover:text-black transition-colors flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
                                Upload Vector Asset
                            </span>
                        </button>
                    </div>

                    <!-- Brand Vibe -->
                    <div>
                        <span class="font-bold text-neutral-900 block mb-3">Brand Context & Vibe</span>
                        <textarea bind:value={formData.vibe} placeholder="e.g. Minimalist corporate, dark luxury, or vibrant event..." class="w-full p-4 bg-white border border-neutral-200 rounded-2xl font-medium text-neutral-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none h-28"></textarea>
                    </div>

                    <!-- Configuration Grid -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <span class="font-bold text-neutral-900 text-sm block mb-2">Bottle Size</span>
                            <select bind:value={formData.size} class="w-full p-4 bg-white border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer">
                                <option value="250ml">250ml Mini</option>
                                <option value="500ml">500ml Standard</option>
                                <option value="750ml">750ml Premium</option>
                            </select>
                        </div>
                        <div>
                            <span class="font-bold text-neutral-900 text-sm block mb-2">Material Type</span>
                            <select bind:value={formData.material} class="w-full p-4 bg-white border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer">
                                <option>Premium PET</option>
                                <option>Glass (+ ₹40/unit)</option>
                                <option>Aluminum</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <span class="font-bold text-neutral-900 block mb-3">Order Quantity</span>
                        <select bind:value={formData.quantity} class="w-full p-4 bg-white border border-neutral-200 rounded-2xl font-medium text-neutral-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer">
                            <option value="500">500 Bottles (Minimum MOQ)</option>
                            <option value="1000">1,000 Bottles</option>
                            <option value="5000">5,000+ Bottles (Wholesale)</option>
                        </select>
                    </div>
                </div>

                <div class="mt-10">
                    <button 
                        on:click={handleGenerate}
                        disabled={isGenerating}
                        class="w-full py-5 bg-black text-white font-bold rounded-2xl text-lg hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-200 transition-all disabled:opacity-50 disabled:hover:bg-black flex justify-center items-center gap-3">
                        {#if isGenerating}
                            <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Synthesizing...</span>
                        {:else}
                            <span>Generate Mockup</span>
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path></svg>
                        {/if}
                    </button>
                </div>
            </div>
            
            <!-- Right: Preview / Loading -->
            <div use:reveal={{delay: 300}} class="lg:col-span-7 bg-neutral-950 rounded-[2.5rem] p-8 flex flex-col items-center justify-center min-h-[600px] text-white relative overflow-hidden shadow-2xl border border-neutral-800">
                <!-- Grid background -->
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDFoNDB2MUgweiIgZmlsbD0icmdiYSgyNTUsIDI1NSLCAyNTUsIDAuMDMpIi8+PHBhdGggZD0iTTEgMHY0MGgxvi00MHoiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMykiLz48L3N2Zz4=')]"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950"></div>
                
                <div class="relative z-10 w-full flex flex-col items-center">
                    {#if isGenerating}
                        <div class="space-y-8 text-center animate-in fade-in duration-500">
                            <div class="relative w-32 h-32 mx-auto">
                                <div class="absolute inset-0 border-[3px] border-neutral-800 rounded-full"></div>
                                <div class="absolute inset-0 border-[3px] border-white rounded-full border-t-transparent animate-spin duration-1000"></div>
                                <div class="absolute inset-4 border-[3px] border-neutral-700 rounded-full"></div>
                                <div class="absolute inset-4 border-[3px] border-neutral-400 rounded-full border-b-transparent animate-spin duration-700 reverse"></div>
                            </div>
                            <div class="space-y-2">
                                <p class="font-mono text-sm text-white uppercase tracking-widest animate-pulse">Running proprietary model...</p>
                                <p class="font-mono text-xs text-neutral-500">Wrapping {formData.size} {formData.material}</p>
                            </div>
                        </div>
                    {:else}
                        <div class="space-y-6 text-center text-neutral-600 animate-in fade-in zoom-in-95 duration-500">
                            <div class="w-24 h-24 border border-neutral-800 rounded-3xl mx-auto flex items-center justify-center bg-neutral-900 shadow-inner">
                                <svg class="w-10 h-10 text-neutral-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path></svg>
                            </div>
                            <div class="space-y-2">
                                <p class="font-mono text-sm uppercase tracking-widest text-neutral-400">Awaiting Assets</p>
                                <p class="text-sm text-neutral-600 max-w-xs mx-auto">Upload your logo and define your parameters to generate a photorealistic 3D label preview.</p>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    select {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 0.5rem center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
    }
</style>
