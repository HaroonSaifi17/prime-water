<script>
    import { reveal } from '$lib/utils/animations.js';
    import { fade, fly, scale } from 'svelte/transition';

    let isGenerating = $state(false);
    let previewReady = $state(false);
    let error = $state('');
    let uploadedLogo = $state(null);
    let fileName = $state('');
    let generatedImage = $state(null);
    let isSaving = $state(false);
    let modelUsed = $state('AI ENGINE');
    
    let formData = $state({
        quantity: '500',
        size: '200ml Square',
        vibe: 'Luxury & Minimal',
        brandName: '',
        material: 'Premium PET'
    });

    const sizes = [
        { value: '200ml Square', label: '200ml Square (Best Seller)', base: '45mm x 45mm', height: '125mm' },
        { value: '250ml Round', label: '250ml Round', base: '50mm diameter', height: '130mm' },
        { value: '500ml', label: '500ml Standard', base: '60mm diameter', height: '180mm' },
        { value: '750ml', label: '750ml Premium', base: '70mm diameter', height: '200mm' },
        { value: '1000ml', label: '1L Family', base: '80mm diameter', height: '220mm' }
    ];

    const currentSize = $derived(sizes.find(s => s.value === formData.size) || sizes[0]);

    async function handleGenerate() {
        if (!formData.brandName.trim()) {
            error = 'Please enter a brand name';
            return;
        }

        error = '';
        isGenerating = true;
        previewReady = false;
        generatedImage = null;

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    brandName: formData.brandName,
                    vibe: formData.vibe,
                    bottleSize: formData.size,
                    material: formData.material,
                    logo: uploadedLogo
                })
            });

            let result;
            try {
                result = await response.json();
            } catch {
                const ref = Math.random().toString(36).substr(2, 6).toUpperCase();
                console.error(`[Studio Error ${ref}]`, 'Invalid JSON response', response.status, response.statusText);
                error = `Server error (${ref})`;
                return;
            }

            if (result.success) {
                generatedImage = result.image || null;
                modelUsed = result.model || 'AI ENGINE';
                previewReady = true;
            } else {
                error = result.error || 'Generation failed';
            }
        } catch (err) {
            const ref = Math.random().toString(36).substr(2, 6).toUpperCase();
            console.error(`[Studio Error ${ref}]`, err);
            error = `Request failed (${ref})`;
        } finally {
            isGenerating = false;
        }
    }

    async function handleSaveDesign() {
        if (!previewReady) return;
        
        isSaving = true;
        try {
            const response = await fetch('/api/save-design', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    ...formData, 
                    image: generatedImage,
                    savedAt: new Date().toISOString()
                })
            });

            const result = await response.json();
            if (result.success) {
                console.log('[Studio] Design saved successfully');
            } else {
                console.error('[Studio] Save failed:', result.error || 'Unknown error');
            }
        } catch (err) {
            console.error('[Studio] Failed to save design:', err);
        } finally {
            isSaving = false;
        }
    }

    function handleLogoUpload(event) {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                error = 'Logo file too large (max 5MB)';
                return;
            }
            fileName = file.name;
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedLogo = e.target?.result;
            };
            reader.readAsDataURL(file);
        }
    }

    function downloadImage() {
        if (!generatedImage) {
            console.warn('[Studio] No image available to download');
            return;
        }
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `${formData.brandName.replace(/\s+/g, '_')}-bottle-design.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>

<section id="studio" class="py-32 bg-white px-6 overflow-hidden">
    <div class="max-w-7xl mx-auto">
        <div use:reveal class="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
            <div>
                <h2 class="text-5xl md:text-7xl font-black tracking-tighter text-neutral-900 mb-2">The Studio.</h2>
                <p class="text-neutral-500 font-medium text-lg">Design your custom bottle with AI in seconds.</p>
            </div>
            <p class="text-neutral-500 font-mono text-sm px-4 py-2 bg-neutral-100 rounded-full w-max border border-neutral-200 shadow-sm">STUDIO ENGINE v4.2</p>
        </div>
        
        <div class="grid lg:grid-cols-12 gap-6 lg:gap-10">
            <!-- Controls -->
            <div use:reveal={{delay: 150}} class="lg:col-span-5 bg-neutral-50 p-8 md:p-10 rounded-[2.5rem] border border-neutral-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div class="space-y-6">
                    <div>
                        <div class="flex justify-between items-center mb-3">
                            <span class="font-bold text-neutral-900">Brand Logo</span>
                            <span class="text-neutral-400 text-[10px] font-black tracking-widest uppercase">SVG / PNG / JPG</span>
                        </div>
                        <label class="block w-full h-24 border-2 border-dashed rounded-2xl flex items-center justify-center bg-white cursor-pointer transition-all duration-300 group focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 {uploadedLogo ? 'border-neutral-800 bg-neutral-50' : 'border-neutral-300 hover:border-black hover:bg-neutral-50'}">
                            <input type="file" accept="image/*" class="hidden" onchange={handleLogoUpload}>
                            {#if uploadedLogo}
                                <div class="flex items-center gap-3" in:fade>
                                    <div class="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center overflow-hidden p-1 shadow-inner">
                                        <img src={uploadedLogo} alt="Uploaded logo" class="w-full h-full object-contain" />
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="text-sm font-bold text-neutral-900 truncate max-w-[150px]">{fileName}</span>
                                        <button onclick={(e) => {e.preventDefault(); uploadedLogo = null; fileName = '';}} class="text-[10px] text-red-500 font-bold hover:underline">Remove</button>
                                    </div>
                                </div>
                            {:else}
                                <span class="text-neutral-400 font-medium group-hover:text-black transition-colors flex items-center gap-2 text-sm">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
                                    Upload Logo
                                </span>
                            {/if}
                        </label>
                    </div>

                    <div>
                        <label for="brandName" class="font-bold text-neutral-900 block mb-2 text-sm">Brand Name</label>
                        <input 
                            id="brandName"
                            type="text" 
                            bind:value={formData.brandName}
                            placeholder="e.g. NANO_BANAO"
                            class="w-full p-4 bg-white border border-neutral-200 rounded-xl font-medium text-neutral-900 outline-none focus:border-black focus:ring-2 focus:ring-neutral-100 transition-all text-sm shadow-sm"
                        >
                    </div>

                    <div>
                        <label for="vibe" class="font-bold text-neutral-900 block mb-2 text-sm">Aesthetic / Style</label>
                        <select 
                            id="vibe" 
                            bind:value={formData.vibe} 
                            class="w-full p-4 bg-white border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 outline-none focus:border-black focus:ring-2 focus:ring-neutral-100 transition-all appearance-none cursor-pointer shadow-sm"
                        >
                            <option>Luxury & Minimal</option>
                            <option>Corporate & Clean</option>
                            <option>Vibrant & Playful</option>
                            <option>Eco & Organic</option>
                        </select>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="size" class="font-bold text-neutral-900 text-xs block mb-2 uppercase tracking-wider">Size</label>
                            <select id="size" bind:value={formData.size} class="w-full p-4 bg-white border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 outline-none focus:border-black focus:ring-2 focus:ring-neutral-100 transition-all appearance-none cursor-pointer shadow-sm">
                                {#each sizes as size}
                                    <option value={size.value}>{size.label}</option>
                                {/each}
                            </select>
                        </div>
                        <div>
                            <label for="material" class="font-bold text-neutral-900 text-xs block mb-2 uppercase tracking-wider">Material</label>
                            <select id="material" bind:value={formData.material} class="w-full p-4 bg-white border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 outline-none focus:border-black focus:ring-2 focus:ring-neutral-100 transition-all appearance-none cursor-pointer shadow-sm">
                                <option>Premium PET</option>
                                <option>Glass (+ ₹40)</option>
                                <option>Aluminum</option>
                            </select>
                        </div>
                    </div>
                    
                    {#if error}
                        <p class="text-red-500 text-xs font-medium text-center">{error}</p>
                    {/if}
                </div>

                <div class="mt-8">
                    <button 
                        onclick={handleGenerate}
                        disabled={isGenerating}
                        class="w-full py-4 bg-black text-white font-bold rounded-2xl text-base hover:bg-neutral-800 active:scale-[0.98] focus:ring-4 focus:ring-neutral-200 transition-all disabled:opacity-50 disabled:hover:bg-black flex justify-center items-center gap-3 shadow-xl shadow-black/10">
                        {#if isGenerating}
                            <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Engine Processing...</span>
                        {:else}
                            <span>Generate Design</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path></svg>
                        {/if}
                    </button>
                </div>
            </div>
            
            <!-- Preview -->
            <div use:reveal={{delay: 300}} class="lg:col-span-7 bg-neutral-950 rounded-[2.5rem] p-8 flex flex-col text-white relative overflow-hidden shadow-2xl border border-neutral-800 min-h-[500px]">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDFoNDB2MUgweiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIvPjxwYXRoIGQ9Ik0xIDB2NDBoMXYtNUgweiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIvPjwvc3ZnPg==')] opacity-20"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950"></div>
                
                <div class="relative z-10 flex-1 flex flex-col">
                    {#if isGenerating}
                        <div class="flex-1 flex flex-col items-center justify-center py-20" in:fade>
                            <div class="space-y-8 text-center">
                                <div class="relative w-32 h-32 mx-auto">
                                    <div class="absolute inset-0 border-[4px] border-neutral-800 rounded-full"></div>
                                    <div class="absolute inset-0 border-[4px] border-white rounded-full border-t-transparent animate-spin duration-1000"></div>
                                    <div class="absolute inset-4 border-[2px] border-neutral-700 rounded-full animate-pulse"></div>
                                    <div class="absolute inset-6 border-[1px] border-neutral-600 rounded-full border-b-transparent animate-spin duration-700 reverse"></div>
                                </div>
                                <div class="space-y-2">
                                    <p class="font-mono text-sm text-white uppercase tracking-[0.3em] animate-pulse">AI Synthesis...</p>
                                    <p class="font-mono text-xs text-neutral-500 uppercase tracking-widest">{formData.brandName || 'UNTITLED'} • {formData.size}</p>
                                </div>
                            </div>
                        </div>
                    {:else if previewReady}
                        <div class="flex-1 flex flex-col" in:fly={{y: 20, duration: 600}}>
                            <div class="flex justify-between items-start mb-8">
                                <div>
                                    <span class="font-black text-2xl tracking-tighter uppercase">{formData.brandName}</span>
                                    <div class="flex items-center gap-2 mt-1">
                                        <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span class="text-neutral-400 text-[10px] font-bold tracking-widest uppercase">
                                            {previewReady ? 'AI Generated' : 'Processing'}
                                        </span>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <span class="text-neutral-500 text-[10px] font-mono block">REF: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                                    <span class="text-neutral-500 text-[10px] font-mono block">MODEL: {modelUsed}</span>
                                </div>
                            </div>
                            
                            <div class="flex-1 flex items-center justify-center py-6">
                                {#if generatedImage}
                                    <div class="relative group" in:scale={{duration: 800, start: 0.95}}>
                                        <img src={generatedImage} alt="Generated bottle design" class="max-h-[380px] rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-transform duration-700 group-hover:scale-[1.02]" />
                                        <div class="absolute -inset-4 bg-white/5 blur-3xl rounded-full -z-10 opacity-50"></div>
                                    </div>
                                {:else}
                                    <div class="text-center p-12 bg-neutral-900/50 rounded-[2rem] border border-neutral-800 backdrop-blur-sm" in:scale>
                                        <div class="relative w-24 h-48 mx-auto mb-8 bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-sm shadow-2xl overflow-hidden border border-white/5">
                                            <div class="absolute top-[30%] w-full h-16 bg-white flex items-center justify-center flex-col">
                                                <span class="text-[8px] text-black font-black uppercase tracking-tighter leading-none px-1 truncate w-full text-center">{formData.brandName}</span>
                                            </div>
                                        </div>
                                        <p class="text-neutral-400 text-sm font-medium">Design logic processed successfully.</p>
                                        <p class="text-neutral-600 text-[10px] mt-2 italic">Note: High-fidelity image generation may be limited in free tier.</p>
                                    </div>
                                {/if}
                            </div>

                            <div class="flex justify-between items-center pt-8 border-t border-neutral-800">
                                <div class="space-y-1">
                                    <div class="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Specifications</div>
                                    <div class="text-xs font-mono text-neutral-300">
                                        {currentSize.base} • {currentSize.height}
                                    </div>
                                </div>
                                <div class="flex gap-3">
                                    <button 
                                        onclick={handleSaveDesign} 
                                        disabled={isSaving}
                                        class="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-all border border-neutral-800 flex items-center gap-2">
                                        {#if isSaving}
                                            <div class="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        {/if}
                                        SAVE
                                    </button>
                                    <button onclick={downloadImage} class="px-6 py-3 bg-white text-black text-xs font-black rounded-xl hover:bg-neutral-200 transition-all shadow-lg shadow-white/5">
                                        DOWNLOAD
                                    </button>
                                </div>
                            </div>
                            
                            <p class="text-[9px] text-neutral-600 mt-4 text-center font-medium tracking-tight">
                                <svg class="w-3 h-3 inline-block mr-1 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                Free Tier: Content may be used to improve AI models.
                            </p>
                        </div>
                    {:else}
                        <div class="flex-1 flex flex-col items-center justify-center py-20" in:fade>
                            <div class="text-center max-w-sm space-y-6">
                                <div class="w-24 h-24 border border-neutral-800 rounded-[2rem] mx-auto flex items-center justify-center bg-neutral-900/50 shadow-inner group">
                                    <svg class="w-10 h-10 text-neutral-700 group-hover:text-neutral-400 transition-colors duration-500" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path></svg>
                                </div>
                                <div class="space-y-2">
                                    <p class="font-mono text-xs uppercase tracking-[0.4em] text-neutral-600">Waiting for Input</p>
                                    <p class="text-sm text-neutral-500 leading-relaxed font-medium">Configure your brand identity on the left to initialize the AI design sequence.</p>
                                </div>
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
        background-position: right 1rem center;
        background-repeat: no-repeat;
        background-size: 1.2em 1.2em;
    }
    
    .reverse {
        animation-direction: reverse;
    }
</style>