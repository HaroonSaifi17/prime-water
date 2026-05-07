<script>
    import { reveal } from '$lib/utils/animations.js';

    let isGenerating = $state(false);
    let previewReady = $state(false);
    let error = $state('');
    let savedDesign = $state(null);
    let uploadedLogo = $state(null);
    let fileName = $state('');
    let generatedImage = $state(null);
    
    let formData = $state({
        quantity: '500',
        size: '200ml Square',
        vibe: 'clean, minimalist, premium',
        brandName: 'NANO_BANAO',
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
                    quantity: formData.quantity
                })
            });

            const result = await response.json();

            if (result.success) {
                generatedImage = result.image;
                previewReady = true;
                
                savedDesign = {
                    brandName: formData.brandName,
                    vibe: formData.vibe,
                    bottleSize: formData.size,
                    material: formData.material,
                    quantity: formData.quantity,
                    generatedAt: new Date().toISOString()
                };
            } else {
                error = result.error || 'Failed to generate design';
            }
        } catch (err) {
            error = 'Network error: ' + err.message;
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
                body: JSON.stringify({ ...savedDesign, image: generatedImage })
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
            fileName = file.name;
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedLogo = e.target?.result;
            };
            reader.readAsDataURL(file);
        }
    }

    function downloadImage() {
        if (!generatedImage) return;
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `${formData.brandName}-bottle-design.png`;
        link.click();
    }
</script>

<section id="studio" class="py-32 bg-white px-6 overflow-hidden">
    <div class="max-w-7xl mx-auto">
        <div use:reveal class="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
            <div>
                <h2 class="text-5xl md:text-7xl font-black tracking-tighter text-neutral-900 mb-2">The Studio.</h2>
                <p class="text-neutral-500 font-medium text-lg">Design your 200ml custom bottle with AI.</p>
            </div>
            <p class="text-neutral-500 font-mono text-sm px-4 py-2 bg-neutral-100 rounded-full w-max border border-neutral-200">NANO_BANAO v4.0</p>
        </div>
        
        <div class="grid lg:grid-cols-12 gap-6 lg:gap-10">
            <div use:reveal={{delay: 150}} class="lg:col-span-5 bg-neutral-50 p-8 md:p-10 rounded-[2.5rem] border border-neutral-200 shadow-sm flex flex-col justify-between">
                <div class="space-y-6">
                    <div>
                        <div class="flex justify-between items-center mb-3">
                            <span class="font-bold text-neutral-900">Brand Logo</span>
                            <span class="text-neutral-400 text-xs font-bold tracking-wider uppercase">All Image Formats</span>
                        </div>
                        <label class="block w-full h-24 border-2 border-dashed rounded-2xl flex items-center justify-center bg-white cursor-pointer transition-all duration-300 group focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 {uploadedLogo ? 'border-neutral-800 bg-neutral-50' : 'border-neutral-300 hover:border-black hover:bg-neutral-50'}">
                            <input type="file" accept="image/*,.ai,.eps,.pdf,.svg" class="hidden" onchange={handleLogoUpload}>
                            {#if uploadedLogo}
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center overflow-hidden">
                                        <img src={uploadedLogo} alt="Uploaded logo" class="w-full h-full object-contain p-1" />
                                    </div>
                                    <span class="text-sm font-medium text-neutral-900">{fileName}</span>
                                </div>
                            {:else}
                                <span class="text-neutral-400 font-medium group-hover:text-black transition-colors flex items-center gap-2 text-sm">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
                                    Upload Logo
                                </span>
                            {/if}
                        </label>
                    </div>

                    <div>
                        <label for="brandName" class="font-bold text-neutral-900 block mb-3">Brand Name</label>
                        <input 
                            id="brandName"
                            type="text" 
                            bind:value={formData.brandName}
                            placeholder="Your Brand"
                            class="w-full p-3 bg-white border border-neutral-200 rounded-xl font-medium text-neutral-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                        >
                    </div>

                    <div>
                        <label for="vibe" class="font-bold text-neutral-900 block mb-2">Style / Vibe</label>
                        <textarea 
                            id="vibe"
                            bind:value={formData.vibe}
                            placeholder="clean, minimalist, premium"
                            class="w-full p-3 bg-white border border-neutral-200 rounded-xl font-medium text-neutral-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none h-16 text-sm"
                        ></textarea>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label for="size" class="font-bold text-neutral-900 text-sm block mb-2">Bottle Size</label>
                            <select id="size" bind:value={formData.size} class="w-full p-3 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer">
                                {#each sizes as size}
                                    <option value={size.value}>{size.label}</option>
                                {/each}
                            </select>
                        </div>
                        <div>
                            <label for="material" class="font-bold text-neutral-900 text-sm block mb-2">Material</label>
                            <select id="material" bind:value={formData.material} class="w-full p-3 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer">
                                <option>Premium PET</option>
                                <option>Glass (+ ₹40)</option>
                                <option>Aluminum</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label for="quantity" class="font-bold text-neutral-900 block mb-2">Order Quantity</label>
                        <select id="quantity" bind:value={formData.quantity} class="w-full p-3 bg-white border border-neutral-200 rounded-lg font-medium text-neutral-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer text-sm">
                            <option value="500">500 Bottles (Min)</option>
                            <option value="1000">1,000 Bottles</option>
                            <option value="5000">5,000+ (Wholesale)</option>
                            <option value="10000">10,000+ (Bulk)</option>
                        </select>
                    </div>

                    {#if error}
                        <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
                    {/if}
                </div>

                <div class="mt-6">
                    <button 
                        onclick={handleGenerate}
                        disabled={isGenerating}
                        class="w-full py-4 bg-black text-white font-bold rounded-2xl text-base hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-200 transition-all disabled:opacity-50 disabled:hover:bg-black flex justify-center items-center gap-3">
                        {#if isGenerating}
                            <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Generating...</span>
                        {:else}
                            <span>Generate with AI</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path></svg>
                        {/if}
                    </button>
                </div>
            </div>
            
            <div use:reveal={{delay: 300}} class="lg:col-span-7 bg-neutral-950 rounded-[2.5rem] p-6 flex flex-col text-white relative overflow-hidden shadow-2xl border border-neutral-800">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDFoNDB2MUgweiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIvPjxwYXRoIGQ9Ik0xIDB2NDBoMXYtNUgweiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIvPjwvc3ZnPg==')]"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950"></div>
                
                <div class="relative z-10 flex-1 flex flex-col">
                    {#if isGenerating}
                        <div class="flex-1 flex flex-col items-center justify-center py-20">
                            <div class="space-y-6 text-center">
                                <div class="relative w-24 h-24 mx-auto">
                                    <div class="absolute inset-0 border-[3px] border-neutral-800 rounded-full"></div>
                                    <div class="absolute inset-0 border-[3px] border-white rounded-full border-t-transparent animate-spin duration-1000"></div>
                                    <div class="absolute inset-3 border-[3px] border-neutral-700 rounded-full"></div>
                                    <div class="absolute inset-3 border-[3px] border-neutral-600 rounded-full border-b-transparent animate-spin duration-700 reverse"></div>
                                </div>
                                <div class="space-y-1">
                                    <p class="font-mono text-sm text-white uppercase tracking-widest animate-pulse">Creating your design...</p>
                                    <p class="font-mono text-xs text-neutral-500">{formData.brandName} • {formData.size}</p>
                                </div>
                            </div>
                        </div>
                    {:else if previewReady}
                        <div class="flex-1 flex flex-col">
                            <div class="text-center mb-4">
                                <span class="font-bold text-lg">{formData.brandName}</span>
                                <span class="text-neutral-400 text-sm ml-2">• AI Generated</span>
                            </div>
                            
                            <div class="flex-1 flex items-center justify-center py-4">
                                {#if generatedImage}
                                    <img src={generatedImage} alt="Generated bottle design" class="max-h-[350px] rounded-xl shadow-2xl" />
                                {:else}
                                    <div class="text-center p-8">
                                        <div class="font-bold text-xl mb-2">{formData.brandName}</div>
                                        <div class="text-neutral-400 text-sm">{formData.vibe}</div>
                                        <div class="mt-4 text-neutral-500 text-xs">AI design generated successfully</div>
                                    </div>
                                {/if}
                            </div>

                            <div class="flex justify-between items-center pt-4 border-t border-neutral-800">
                                <div class="text-xs text-neutral-400">
                                    <span class="font-mono">{currentSize.base}</span>
                                </div>
                                <div class="flex gap-2">
                                    <button onclick={handleSaveDesign} class="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium rounded-lg transition-colors border border-neutral-600">
                                        Save
                                    </button>
                                    <button onclick={downloadImage} class="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-neutral-200 transition-colors">
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    {:else}
                        <div class="flex-1 flex flex-col items-center justify-center py-20">
                            <div class="text-center max-w-xs">
                                <div class="w-20 h-20 border border-neutral-700 rounded-2xl mx-auto flex items-center justify-center bg-neutral-900/50 mb-4">
                                    <svg class="w-8 h-8 text-neutral-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path></svg>
                                </div>
                                <p class="font-mono text-sm uppercase tracking-widest text-neutral-500 mb-2">AI Preview</p>
                                <p class="text-sm text-neutral-500">Enter your brand and click generate to create your custom bottle design with AI.</p>
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