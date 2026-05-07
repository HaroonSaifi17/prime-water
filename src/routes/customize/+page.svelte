<script>
    import { goto } from '$app/navigation';
    import { fade, fly, scale } from 'svelte/transition';
    import { reveal } from '$lib/utils/animations';

    let isGenerating = $state(false);
    let isSaving = $state(false);
    let generated = $state(false);
    let error = $state('');
    
    // Form state
    let brandName = $state('');
    let vibe = $state('Luxury & Minimal');
    let bottleSize = $state('200ml Square (Best Seller)');
    let material = $state('Premium PET');
    let generatedImage = $state('');
    let designId = $state('');
    let modelUsed = $state('');

    async function generateLabel() {
        if (!brandName) {
            error = 'Please enter a brand name first.';
            return;
        }
        
        error = '';
        isGenerating = true;
        generated = false;

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ brandName, vibe, bottleSize, material })
            });

            let data;
            try {
                data = await response.json();
            } catch {
                const ref = Math.random().toString(36).substr(2, 6).toUpperCase();
                console.error(`[Customize Error ${ref}]`, 'Invalid JSON', response.status, response.statusText);
                error = `Server error (${ref})`;
                return;
            }

            if (!response.ok) {
                const ref = Math.random().toString(36).substr(2, 6).toUpperCase();
                console.error(`[Customize Error ${ref}]`, response.status, data);
                error = data?.error || `Server error (${ref})`;
                return;
            }

            if (data.success) {
                generatedImage = data.image || '';
                designId = data.design?.id || '';
                modelUsed = data.model || 'AI Engine';
                generated = true;
            } else {
                error = data.error || 'Failed to generate design. Quota might be hit.';
            }
        } catch (e) {
            const ref = Math.random().toString(36).substr(2, 6).toUpperCase();
            console.error(`[Customize Error ${ref}]`, e);
            error = `Request failed (${ref})`;
        } finally {
            isGenerating = false;
        }
    }

    async function saveDesign() {
        if (!generated) return;
        
        isSaving = true;
        try {
            const response = await fetch('/api/save-design', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    brandName, 
                    vibe, 
                    bottleSize, 
                    material,
                    image: generatedImage,
                    id: designId 
                })
            });

            const data = await response.json();
            if (data.success) {
                console.log('[Customize] Design saved successfully');
            } else {
                console.error('[Customize] Save failed:', data.error || 'Unknown error');
            }
        } catch (e) {
            console.error('[Customize] Error saving design:', e);
        } finally {
            isSaving = false;
        }
    }

    function downloadImage() {
        if (!generatedImage) {
            console.warn('[Customize] No image to download');
            return;
        }
        
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `${brandName.replace(/\s+/g, '_')}_design.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>

<div class="min-h-screen bg-[#0B132B] text-white pt-24 px-4 pb-12 selection:bg-cyan-500 selection:text-white">
    <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 min-h-[calc(100vh-12rem)]">
        
        <!-- Left Panel: Controls -->
        <div use:reveal={{y: 20}} class="bg-[#1C2541] rounded-[2.5rem] p-8 md:p-10 border border-blue-500/10 flex flex-col shadow-2xl relative overflow-hidden group hover:border-blue-500/20 transition-all duration-500">
            <div class="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-1000">
                 <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
            </div>
            
            <div class="relative z-10">
                <div class="flex items-center gap-3 mb-2">
                    <span class="px-2 py-0.5 bg-cyan-500 text-[10px] font-black uppercase tracking-widest rounded-md shadow-lg shadow-cyan-500/20">Studio v4.2</span>
                    <span class="text-blue-400 text-[10px] font-bold uppercase tracking-widest opacity-50">Experimental</span>
                </div>
                <h1 class="text-4xl font-black tracking-tighter mb-2">Design Studio</h1>
                <p class="text-blue-200/50 mb-10 font-medium">Create your high-performance brand identity with AI.</p>
            </div>
            
            <div class="flex-1 space-y-8 relative z-10">
                <div class="space-y-2">
                    <label class="block text-xs font-black text-blue-400 uppercase tracking-widest ml-1">Brand Identity</label>
                    <input 
                        type="text" 
                        bind:value={brandName}
                        placeholder="e.g. NANO_BANAO" 
                        class="w-full bg-[#0B132B] border border-blue-500/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all shadow-inner font-bold placeholder:font-normal placeholder:opacity-30"
                    >
                </div>
                
                <div class="grid grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="block text-xs font-black text-blue-400 uppercase tracking-widest ml-1">Aesthetic</label>
                        <select 
                            bind:value={vibe}
                            class="w-full bg-[#0B132B] border border-blue-500/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 transition-all cursor-pointer appearance-none font-medium"
                        >
                            <option>Luxury & Minimal</option>
                            <option>Corporate & Clean</option>
                            <option>Vibrant & Playful</option>
                            <option>Eco & Organic</option>
                            <option>Cyberpunk & Tech</option>
                        </select>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-xs font-black text-blue-400 uppercase tracking-widest ml-1">Bottle Spec</label>
                        <select 
                            bind:value={bottleSize}
                            class="w-full bg-[#0B132B] border border-blue-500/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 transition-all cursor-pointer appearance-none font-medium"
                        >
                            <option>200ml Square</option>
                            <option>250ml Round</option>
                            <option>500ml Standard</option>
                            <option>750ml Premium</option>
                            <option>1L Family</option>
                        </select>
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="block text-xs font-black text-blue-400 uppercase tracking-widest ml-1">Material Selection</label>
                    <div class="grid grid-cols-3 gap-3">
                        {#each ['Premium PET', 'Glass', 'Aluminum'] as m}
                            <button 
                                onclick={() => material = m}
                                class="py-3 rounded-xl border transition-all text-xs font-bold {material === m ? 'bg-white text-[#0B132B] border-white shadow-xl shadow-white/10' : 'bg-transparent text-blue-300 border-blue-500/20 hover:border-blue-500/40'}"
                            >
                                {m}
                            </button>
                        {/each}
                    </div>
                </div>

                {#if error}
                    <div class="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3" in:fly={{y: 10}}>
                        <div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <p class="text-red-400 text-xs font-bold uppercase tracking-tight">{error}</p>
                    </div>
                {/if}
            </div>
            
            <button 
                onclick={generateLabel}
                disabled={isGenerating}
                class="w-full mt-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-2xl shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98] relative overflow-hidden group">
                {#if isGenerating}
                    <span class="flex items-center justify-center gap-3">
                        <div class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        AI Synthesis Active
                    </span>
                {:else}
                    <span class="relative z-10 flex items-center justify-center gap-2">
                        Generate Identity
                        <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path></svg>
                    </span>
                    <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:animate-shimmer"></div>
                {/if}
            </button>
        </div>
        
        <!-- Right Panel: Preview -->
        <div class="bg-gradient-to-br from-[#0B132B] to-[#1C2541] rounded-[2.5rem] border border-blue-500/5 flex items-center justify-center relative overflow-hidden min-h-[500px] shadow-2xl">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]"></div>
            
            {#if !isGenerating && !generated}
                <div class="text-center p-12 relative z-10" in:fade>
                    <div class="w-32 h-32 bg-[#1C2541] rounded-[2rem] mx-auto mb-8 flex items-center justify-center border border-blue-500/10 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 group">
                        <svg class="w-12 h-12 text-blue-400/20 group-hover:text-cyan-400/40 transition-colors duration-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    </div>
                    <h3 class="text-2xl font-black text-white mb-3 tracking-tight uppercase">Awaiting Sequence</h3>
                    <p class="text-sm text-blue-400/40 max-w-xs mx-auto font-medium">Configure parameters to initialize the high-fidelity 3D mockup generation sequence.</p>
                </div>
            {:else if isGenerating}
                <div class="text-center relative z-10" in:fade>
                    <div class="relative w-40 h-40 mx-auto mb-10">
                        <div class="absolute inset-0 border-[6px] border-blue-500/10 rounded-full"></div>
                        <div class="absolute inset-0 border-[6px] border-t-cyan-400 rounded-full animate-spin shadow-[0_0_20px_rgba(34,211,238,0.3)]"></div>
                        <div class="absolute inset-6 border-[2px] border-blue-400/20 rounded-full animate-pulse"></div>
                        <div class="absolute inset-10 border border-cyan-400/30 rounded-full animate-ping opacity-20"></div>
                    </div>
                    <p class="text-cyan-400 font-black tracking-[0.3em] uppercase text-xs animate-pulse mb-2">Analyzing Geometry</p>
                    <p class="text-blue-200/30 text-[10px] uppercase font-mono tracking-widest">{brandName || 'Untitled Project'}</p>
                </div>
            {:else}
                <div class="text-center p-8 w-full max-h-full overflow-y-auto relative z-10" in:fly={{y: 40, duration: 1000}}>
                    <div class="flex justify-between items-center max-w-md mx-auto mb-8 px-4">
                        <div class="text-left">
                            <span class="text-[10px] font-black text-cyan-400 uppercase tracking-widest block mb-1">Status</span>
                            <span class="text-xs font-bold text-white uppercase tracking-tight">Verified</span>
                        </div>
                        <div class="text-right">
                            <span class="text-[10px] font-black text-blue-400/50 uppercase tracking-widest block mb-1">Engine</span>
                            <span class="text-xs font-bold text-white uppercase tracking-tight">{modelUsed}</span>
                        </div>
                    </div>

                    {#if generatedImage}
                        <div class="relative group max-w-sm mx-auto mb-10 rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] border border-white/5 transition-transform duration-700 hover:scale-[1.02]">
                            <img src={generatedImage} alt="Generated Design" class="w-full h-auto" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-10 backdrop-blur-[2px]">
                                <button onclick={downloadImage} class="bg-white text-black px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-110 transition-transform">Preview Export</button>
                            </div>
                        </div>
                    {:else}
                        <!-- Advanced Fallback Visual Mockup -->
                        <div class="relative w-48 h-96 mx-auto mb-12 bg-gradient-to-b from-blue-100 to-blue-200 rounded-[2px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] overflow-hidden perspective-1000 transform-style-3d border border-white/40 group" in:scale={{duration: 1200, start: 0.9}}>
                            <!-- Cap -->
                            <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-8 bg-blue-900 border-b border-blue-800 rounded-sm z-20 shadow-lg"></div>
                            <!-- Label -->
                            <div class="absolute top-[35%] w-full h-36 bg-[#0B132B] border-y-2 border-cyan-500/50 flex items-center justify-center flex-col z-10 px-4 text-center group-hover:h-40 transition-all duration-700">
                                <span class="text-[10px] text-blue-300 font-black tracking-[0.2em] uppercase mb-2 truncate w-full">{brandName}</span>
                                <span class="text-2xl font-black text-white tracking-[0.3em] mb-1">PRIME</span>
                                <span class="text-[9px] text-cyan-400 font-bold tracking-widest uppercase mt-3 italic opacity-60">{vibe}</span>
                            </div>
                            <!-- Reflections -->
                            <div class="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-black/20 mix-blend-overlay w-full z-10 pointer-events-none"></div>
                            <div class="absolute left-6 top-0 bottom-0 w-[2px] bg-white/40 z-10 pointer-events-none"></div>
                            <div class="absolute right-6 top-0 bottom-0 w-[1px] bg-white/20 z-10 pointer-events-none"></div>
                            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.4)_0%,transparent_50%)] z-10 pointer-events-none"></div>
                        </div>
                    {/if}

                    <div class="space-y-2 mb-10">
                        <h3 class="text-3xl font-black text-white tracking-tighter uppercase">Synthesis Complete</h3>
                        <p class="text-blue-200/40 text-sm font-medium max-w-xs mx-auto">Your bespoke {bottleSize} {material} configuration for {brandName} has been initialized.</p>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button 
                            onclick={saveDesign}
                            disabled={isSaving}
                            class="w-full sm:w-auto px-8 py-4 bg-[#1C2541] border border-blue-500/10 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-blue-500/10 transition-all flex items-center justify-center gap-3">
                            {#if isSaving}
                                <div class="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            {/if}
                            Save to Vault
                        </button>
                        <button 
                            onclick={downloadImage}
                            disabled={!generatedImage}
                            class="w-full sm:w-auto px-8 py-4 bg-white text-[#0B132B] font-black uppercase text-[10px] tracking-widest rounded-2xl hover:scale-105 transition-transform shadow-2xl shadow-white/10 flex items-center justify-center gap-3 disabled:opacity-30">
                            Download Asset
                        </button>
                        <button 
                            onclick={() => goto('/order')}
                            class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl hover:scale-105 transition-transform shadow-2xl shadow-cyan-500/30">
                            Checkout
                        </button>
                    </div>
                    
                    <button 
                        onclick={() => generated = false}
                        class="mt-12 text-blue-400 hover:text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 mx-auto">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Initialize New Sequence
                    </button>
                </div>
            {/if}
        </div>
    </div>
    
    <div class="max-w-7xl mx-auto mt-20 text-center opacity-20">
        <p class="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">Prime Water Systems • Global Logistics Enabled • Secure Checkout</p>
    </div>
</div>

<style>
    .perspective-1000 {
        perspective: 1000px;
    }
    .transform-style-3d {
        transform-style: preserve-3d;
    }
    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    .animate-shimmer {
        animation: shimmer 2s infinite;
    }
</style>