<script>
    import { reveal } from '$lib/utils/animations.js';
    import BottlePreview3D from './BottlePreview3D.svelte';

    let isGenerating = $state(false);
    let previewReady = $state(false);
    let bottle3D = $state(null);
    let error = $state('');
    let savedDesign = $state(null);
    
    let formData = $state({
        quantity: '500',
        size: '200ml Square',
        vibe: '',
        brandName: 'NANO_BANAO',
        material: 'Premium PET'
    });

    const sizes = [
        { value: '200ml Square', label: '200ml Square (Best Seller)', base: '45mm x 45mm', height: '125mm', labelArea: '180mm x 55mm' },
        { value: '250ml Round', label: '250ml Round', base: '50mm diameter', height: '130mm', labelArea: '157mm x 50mm' },
        { value: '500ml', label: '500ml Standard', base: '60mm diameter', height: '180mm', labelArea: '188mm x 60mm' },
        { value: '750ml', label: '750ml Premium', base: '70mm diameter', height: '200mm', labelArea: '220mm x 70mm' },
        { value: '1000ml', label: '1L Family', base: '80mm diameter', height: '220mm', labelArea: '251mm x 80mm' }
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

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    brandName: formData.brandName,
                    vibe: formData.vibe,
                    bottleSize: formData.size,
                    material: formData.material,
                    quantity: formData.quantity
                })
            });

            const result = await response.json();

            if (result.success) {
                await new Promise(r => setTimeout(r, 2000));
                previewReady = true;
                
                if (bottle3D) {
                    bottle3D.updateBrand(formData.brandName, formData.vibe);
                }

                savedDesign = result.design;
            } else {
                error = result.error || 'Failed to generate design';
            }
        } catch (err) {
            error = 'Network error. Please try again.';
            console.error(err);
        } finally {
            isGenerating = false;
        }
    }

    async function handleSaveDesign() {
        if (!savedDesign) return;

        try {
            const response = await fetch('/api/save-design', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(savedDesign)
            });

            const result = await response.json();
            if (result.success) {
                alert('Design saved successfully!');
            }
        } catch (err) {
            console.error('Failed to save design:', err);
        }
    }

    function handleLogoUpload(event) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    if (bottle3D) {
                        bottle3D.updateBrand(formData.brandName, formData.vibe);
                    }
                };
                img.src = e.target?.result;
            };
            reader.readAsDataURL(file);
        }
    }
</script>

<section id="studio" class="py-32 bg-white px-6 overflow-hidden">
    <div class="max-w-7xl mx-auto">
        <div use:reveal class="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
            <div>
                <h2 class="text-5xl md:text-7xl font-black tracking-tighter text-neutral-900 mb-2">The Studio.</h2>
                <p class="text-neutral-500 font-medium text-lg">Design your 200ml custom bottle with live 3D preview.</p>
            </div>
            <p class="text-neutral-500 font-mono text-sm px-4 py-2 bg-neutral-100 rounded-full w-max border border-neutral-200">NANO_BANAO v3.0</p>
        </div>
        
        <div class="grid lg:grid-cols-12 gap-6 lg:gap-10">
            <div use:reveal={{delay: 150}} class="lg:col-span-5 bg-neutral-50 p-8 md:p-10 rounded-[2.5rem] border border-neutral-200 shadow-sm flex flex-col justify-between">
                <div class="space-y-6">
                    <div>
                        <div class="flex justify-between items-center mb-3">
                            <span class="font-bold text-neutral-900">Brand Logo</span>
                            <span class="text-neutral-400 text-xs font-bold tracking-wider uppercase">PNG / SVG</span>
                        </div>
                        <label class="block w-full h-32 border-2 border-dashed border-neutral-300 rounded-2xl flex items-center justify-center bg-white cursor-pointer hover:border-black hover:bg-neutral-50 transition-all duration-300 group focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2">
                            <input type="file" accept=".png,.svg,.jpg,.jpeg" class="hidden" onchange={handleLogoUpload}>
                            <span class="text-neutral-400 font-medium group-hover:text-black transition-colors flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
                                Upload Vector Asset
                            </span>
                        </label>
                    </div>

                    <div>
                        <label for="brandName" class="font-bold text-neutral-900 block mb-3">Brand Name</label>
                        <input 
                            id="brandName"
                            type="text" 
                            bind:value={formData.brandName}
                            placeholder="Enter your brand name"
                            class="w-full p-4 bg-white border border-neutral-200 rounded-2xl font-medium text-neutral-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                        >
                    </div>

                    <div>
                        <label for="vibe" class="font-bold text-neutral-900 block mb-3">Brand Context & Vibe</label>
                        <textarea 
                            id="vibe"
                            bind:value={formData.vibe}
                            placeholder="e.g. Minimalist corporate, dark luxury, vibrant event, eco-friendly..."
                            class="w-full p-4 bg-white border border-neutral-200 rounded-2xl font-medium text-neutral-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none h-24"
                        ></textarea>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="size" class="font-bold text-neutral-900 text-sm block mb-2">Bottle Size</label>
                            <select id="size" bind:value={formData.size} class="w-full p-4 bg-white border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer">
                                {#each sizes as size}
                                    <option value={size.value}>{size.label}</option>
                                {/each}
                            </select>
                        </div>
                        <div>
                            <label for="material" class="font-bold text-neutral-900 text-sm block mb-2">Material</label>
                            <select id="material" bind:value={formData.material} class="w-full p-4 bg-white border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer">
                                <option>Premium PET</option>
                                <option>Glass (+ ₹40/unit)</option>
                                <option>Aluminum</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label for="quantity" class="font-bold text-neutral-900 block mb-3">Order Quantity</label>
                        <select id="quantity" bind:value={formData.quantity} class="w-full p-4 bg-white border border-neutral-200 rounded-2xl font-medium text-neutral-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer">
                            <option value="500">500 Bottles (Min MOQ)</option>
                            <option value="1000">1,000 Bottles</option>
                            <option value="5000">5,000+ Bottles (Wholesale)</option>
                            <option value="10000">10,000+ (Bulk)</option>
                        </select>
                    </div>

                    {#if error}
                        <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
                    {/if}
                </div>

                <div class="mt-8">
                    <button 
                        onclick={handleGenerate}
                        disabled={isGenerating}
                        class="w-full py-5 bg-black text-white font-bold rounded-2xl text-lg hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-200 transition-all disabled:opacity-50 disabled:hover:bg-black flex justify-center items-center gap-3 shadow-xl shadow-black/20">
                        {#if isGenerating}
                            <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Generating...</span>
                        {:else}
                            <span>Generate 3D Mockup</span>
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path></svg>
                        {/if}
                    </button>
                </div>
            </div>
            
            <div use:reveal={{delay: 300}} class="lg:col-span-7 bg-neutral-950 rounded-[2.5rem] p-2 flex flex-col items-center justify-center min-h-[600px] text-white relative overflow-hidden shadow-2xl border border-neutral-800">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDFoNDB2MUgweiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIvPjxwYXRoIGQ9Ik0xIDB2NDBoMXYtNUgweiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIvPjwvc3ZnPg==')]"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950"></div>
                
                <div class="relative z-10 w-full h-full min-h-[500px]">
                    {#if isGenerating}
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                            <div class="space-y-8 text-center">
                                <div class="relative w-32 h-32 mx-auto">
                                    <div class="absolute inset-0 border-[3px] border-neutral-800 rounded-full"></div>
                                    <div class="absolute inset-0 border-[3px] border-white rounded-full border-t-transparent animate-spin duration-1000"></div>
                                    <div class="absolute inset-4 border-[3px] border-neutral-700 rounded-full"></div>
                                    <div class="absolute inset-4 border-[3px] border-neutral-600 rounded-full border-b-transparent animate-spin duration-700 reverse"></div>
                                </div>
                                <div class="space-y-2">
                                    <p class="font-mono text-sm text-white uppercase tracking-widest animate-pulse">Generating your custom label...</p>
                                    <p class="font-mono text-xs text-neutral-500">{formData.brandName} • {formData.size}</p>
                                </div>
                            </div>
                        </div>
                    {:else if previewReady}
                        <div class="absolute inset-0">
                            <BottlePreview3D 
                                bind:this={bottle3D}
                                brandName={formData.brandName}
                                vibe={formData.vibe}
                                {isGenerating}
                            />
                            
                            <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                <div class="bg-neutral-900/80 backdrop-blur-sm p-4 rounded-2xl border border-neutral-700">
                                    <div class="text-xs font-mono text-neutral-400 mb-1">{formData.brandName}</div>
                                    <div class="text-sm font-bold text-white">{formData.size}</div>
                                    <div class="text-xs text-neutral-500">{formData.material}</div>
                                </div>
                                
                                <div class="flex gap-2">
                                    <button onclick={handleSaveDesign} class="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium rounded-xl transition-colors border border-neutral-600">
                                        Save Design
                                    </button>
                                    <button class="px-4 py-2 bg-white text-black text-sm font-bold rounded-xl hover:bg-neutral-200 transition-colors">
                                        Download
                                    </button>
                                </div>
                            </div>

                            <div class="absolute top-4 right-4 bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-green-500/30">
                                <span class="text-xs font-medium text-green-400">3D Preview Ready</span>
                            </div>
                        </div>
                    {:else}
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                            <div class="w-24 h-24 border border-neutral-800 rounded-3xl mx-auto flex items-center justify-center bg-neutral-900 shadow-inner">
                                <svg class="w-10 h-10 text-neutral-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path></svg>
                            </div>
                            <div class="space-y-2 mt-6 text-center">
                                <p class="font-mono text-sm uppercase tracking-widest text-neutral-400">Interactive 3D Preview</p>
                                <p class="text-sm text-neutral-500 max-w-xs mx-auto">Enter your brand name and click generate to see a real-time 3D bottle preview with your custom label.</p>
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