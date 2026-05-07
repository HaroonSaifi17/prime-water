<script>
    import '../app.css';
    import Navbar from '$lib/components/layout/Navbar.svelte';
    import Footer from '$lib/components/layout/Footer.svelte';

    let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-white font-sans text-neutral-900 selection:bg-black selection:text-white">
    <Navbar />
    
    <main class="flex-grow">
        {@render children()}
    </main>

    <Footer />
</div>