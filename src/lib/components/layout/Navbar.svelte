<script>
    import { page } from '$app/stores';
    import { slide } from 'svelte/transition';
    
    let isMobileMenuOpen = $state(false);

    function toggleMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }

    const isDarkPage = $derived($page?.url?.pathname === '/customize');
</script>

<nav class="fixed w-full top-0 z-50 transition-colors duration-500 {isDarkPage ? 'bg-[#0B132B]/80 border-blue-500/10' : 'bg-white/90 border-neutral-100'} backdrop-blur-md border-b">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" class="text-xl font-black tracking-tight relative z-10 transition-colors duration-500 {isDarkPage ? 'text-white' : 'text-neutral-900'}">
            prime water
        </a>
        
        <!-- Desktop Nav -->
        <div class="hidden md:flex gap-8 text-sm font-semibold transition-colors duration-500 {isDarkPage ? 'text-blue-200/50' : 'text-neutral-500'}">
            <a href="/#how" class="hover:text-cyan-400 transition-colors">How it Works</a>
            <a href="/#brands" class="hover:text-cyan-400 transition-colors">Brands</a>
            <a href="/#studio" class="hover:text-cyan-400 transition-colors">Studio</a>
            <a href="/docs" class="hover:text-cyan-400 transition-colors {$page?.url?.pathname === '/docs' ? (isDarkPage ? 'text-white' : 'text-black') : ''}">Docs</a>
            <a href="/contact" class="hover:text-cyan-400 transition-colors {$page?.url?.pathname === '/contact' ? (isDarkPage ? 'text-white' : 'text-black') : ''}">Contact</a>
        </div>
        
        <div class="hidden md:block relative z-10">
            <a href="/#studio" class="px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-lg hover:scale-105 {isDarkPage ? 'bg-cyan-500 text-white shadow-cyan-500/20' : 'bg-black text-white shadow-black/20'}">
                Start Creating
            </a>
        </div>

        <!-- Mobile Menu Toggle -->
        <button 
            class="md:hidden relative z-10 p-2 -mr-2 focus:outline-none transition-colors duration-500 {isDarkPage ? 'text-white' : 'text-neutral-600'}" 
            onclick={toggleMenu}
            aria-label="Toggle menu"
        >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {#if isMobileMenuOpen}
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                {:else}
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                {/if}
            </svg>
        </button>
    </div>

    <!-- Mobile Dropdown -->
    {#if isMobileMenuOpen}
        <div 
            class="md:hidden absolute top-16 left-0 w-full border-b shadow-xl overflow-hidden transition-colors duration-500 {isDarkPage ? 'bg-[#0B132B] border-blue-500/10' : 'bg-white border-neutral-100'}"
            transition:slide={{ duration: 300 }}
        >
            <div class="flex flex-col px-6 py-8 gap-6 text-lg font-bold transition-colors duration-500 {isDarkPage ? 'text-blue-200/70' : 'text-neutral-600'}">
                <a href="/#how" onclick={toggleMenu} class="hover:text-cyan-400">How it Works</a>
                <a href="/#brands" onclick={toggleMenu} class="hover:text-cyan-400">Brands</a>
                <a href="/#studio" onclick={toggleMenu} class="hover:text-cyan-400">Studio</a>
                <a href="/docs" onclick={toggleMenu} class="hover:text-cyan-400">Docs</a>
                <a href="/contact" onclick={toggleMenu} class="hover:text-cyan-400">Contact</a>
                
                <div class="pt-4 mt-2 border-t {isDarkPage ? 'border-blue-500/10' : 'border-neutral-100'}">
                    <a href="/#studio" onclick={toggleMenu} class="inline-block w-full text-center px-6 py-4 rounded-2xl font-semibold shadow-lg transition-all {isDarkPage ? 'bg-cyan-500 text-white shadow-cyan-500/20' : 'bg-black text-white shadow-black/20'}">
                        Start Creating
                    </a>
                </div>
            </div>
        </div>
    {/if}
</nav>