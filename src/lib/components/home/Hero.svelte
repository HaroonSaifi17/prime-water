<script>
    import { reveal } from '$lib/utils/animations.js';
</script>

<section class="pt-32 pb-24 md:pt-40 md:pb-32 px-6 overflow-hidden bg-white">
    <div class="max-w-5xl mx-auto text-center">
        <div use:reveal={{delay: 0, duration: 1000}}>
            <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[1.05] text-neutral-900">
                Bottled water.<br/>
                <span class="text-neutral-400">But it's yours.</span>
            </h1>
        </div>
        
        <div use:reveal={{delay: 200, duration: 1000}}>
            <p class="text-xl md:text-2xl text-neutral-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                Stop serving generic water at your events. Use our AI studio to design your own custom branded FSSAI-approved water bottles in exactly 4 seconds.
            </p>
        </div>

        <div use:reveal={{delay: 400, duration: 1200, y: 50}} class="relative w-full h-[400px] md:h-[600px] rounded-[2.5rem] shadow-2xl overflow-hidden group border border-neutral-100">
            <img src="https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=2036&auto=format&fit=crop" class="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110" alt="Clean water bottles lined up" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
            
            <div class="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-left">
                <span class="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-wider uppercase mb-3 inline-block border border-white/20">Prime Water</span>
                <p class="text-white text-xl md:text-2xl font-bold tracking-tight">Premium Hydration, Bespoke Design</p>
            </div>
        </div>
    </div>
</section>
