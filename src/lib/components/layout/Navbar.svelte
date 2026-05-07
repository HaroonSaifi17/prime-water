<script>
    import { page } from '$app/stores';
    import { slide } from 'svelte/transition';
    
    let isMobileMenuOpen = $state(false);

    function toggleMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }
</script>

<nav class="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" class="text-xl font-black tracking-tight text-neutral-900 relative z-10">
            prime water
        </a>
        
        <!-- Desktop Nav -->
        <div class="hidden md:flex gap-8 text-sm font-semibold text-neutral-500">
            <a href="/#how" class="hover:text-black transition-colors">How it Works</a>
            <a href="/#brands" class="hover:text-black transition-colors">Brands</a>
            <a href="/#studio" class="hover:text-black transition-colors">Studio</a>
            <a href="/docs" class="hover:text-black transition-colors {$page?.url?.pathname === '/docs' ? 'text-black' : ''}">Docs</a>
            <a href="/contact" class="hover:text-black transition-colors {$page?.url?.pathname === '/contact' ? 'text-black' : ''}">Contact</a>
        </div>
        
        <div class="hidden md:block relative z-10">
            <a href="/#studio" class="px-5 py-2.5 bg-black text-white rounded-full font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-black/20">
                Start Creating
            </a>
        </div>

        <!-- Mobile Menu Toggle -->
        <button 
            class="md:hidden relative z-10 p-2 -mr-2 text-neutral-600 focus:outline-none" 
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
            class="md:hidden absolute top-16 left-0 w-full bg-white border-b border-neutral-100 shadow-xl overflow-hidden"
            transition:slide={{ duration: 300 }}
        >
            <div class="flex flex-col px-6 py-8 gap-6 text-lg font-bold text-neutral-600">
                <a href="/#how" onclick={toggleMenu} class="hover:text-black">How it Works</a>
                <a href="/#brands" onclick={toggleMenu} class="hover:text-black">Brands</a>
                <a href="/#studio" onclick={toggleMenu} class="hover:text-black">Studio</a>
                <a href="/docs" onclick={toggleMenu} class="hover:text-black {$page?.url?.pathname === '/docs' ? 'text-black' : ''}">Docs</a>
                <a href="/contact" onclick={toggleMenu} class="hover:text-black {$page?.url?.pathname === '/contact' ? 'text-black' : ''}">Contact</a>
                
                <div class="pt-4 mt-2 border-t border-neutral-100">
                    <a href="/#studio" onclick={toggleMenu} class="inline-block w-full text-center px-6 py-4 bg-black text-white rounded-2xl font-semibold shadow-lg shadow-black/20">
                        Start Creating
                    </a>
                </div>
            </div>
        </div>
    {/if}
</nav>
