<section id="brands" class="py-24 bg-neutral-50 overflow-hidden">
    <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="text-sm font-bold tracking-widest text-neutral-400 uppercase mb-4">Trusted By</h2>
            <p class="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight">Our Partners & Clients</p>
        </div>

        <!-- Seamless Infinite Marquee -->
        <div class="relative w-full overflow-hidden flex items-center mb-16 mask-edges">
            <div class="flex w-max animate-marquee space-x-16 hover:[animation-play-state:paused] opacity-50 hover:opacity-100 transition-opacity duration-500">
                <!-- Set 1 -->
                <div class="flex space-x-16 items-center">
                    <div class="w-40 flex justify-center"><svg class="h-8 text-black" viewBox="0 0 100 30" fill="currentColor"><text x="10" y="20" font-family="sans-serif" font-weight="900" font-size="20">MARRIOTT</text></svg></div>
                    <div class="w-40 flex justify-center"><svg class="h-8 text-black" viewBox="0 0 100 30" fill="currentColor"><text x="10" y="20" font-family="sans-serif" font-weight="900" font-size="20">HYATT</text></svg></div>
                    <div class="w-40 flex justify-center"><svg class="h-8 text-black" viewBox="0 0 100 30" fill="currentColor"><text x="10" y="20" font-family="sans-serif" font-weight="900" font-size="20">WEWORK</text></svg></div>
                    <div class="w-40 flex justify-center"><svg class="h-8 text-black" viewBox="0 0 100 30" fill="currentColor"><text x="10" y="20" font-family="sans-serif" font-weight="900" font-size="20">RADISSON</text></svg></div>
                    <div class="w-40 flex justify-center"><svg class="h-8 text-black" viewBox="0 0 100 30" fill="currentColor"><text x="10" y="20" font-family="sans-serif" font-weight="900" font-size="20">TAJ</text></svg></div>
                    <div class="w-40 flex justify-center"><svg class="h-8 text-black" viewBox="0 0 100 30" fill="currentColor"><text x="10" y="20" font-family="sans-serif" font-weight="900" font-size="20">HILTON</text></svg></div>
                </div>
                <!-- Set 2 (Duplicate for seamless loop) -->
                <div class="flex space-x-16 items-center">
                    <div class="w-40 flex justify-center"><svg class="h-8 text-black" viewBox="0 0 100 30" fill="currentColor"><text x="10" y="20" font-family="sans-serif" font-weight="900" font-size="20">MARRIOTT</text></svg></div>
                    <div class="w-40 flex justify-center"><svg class="h-8 text-black" viewBox="0 0 100 30" fill="currentColor"><text x="10" y="20" font-family="sans-serif" font-weight="900" font-size="20">HYATT</text></svg></div>
                    <div class="w-40 flex justify-center"><svg class="h-8 text-black" viewBox="0 0 100 30" fill="currentColor"><text x="10" y="20" font-family="sans-serif" font-weight="900" font-size="20">WEWORK</text></svg></div>
                    <div class="w-40 flex justify-center"><svg class="h-8 text-black" viewBox="0 0 100 30" fill="currentColor"><text x="10" y="20" font-family="sans-serif" font-weight="900" font-size="20">RADISSON</text></svg></div>
                    <div class="w-40 flex justify-center"><svg class="h-8 text-black" viewBox="0 0 100 30" fill="currentColor"><text x="10" y="20" font-family="sans-serif" font-weight="900" font-size="20">TAJ</text></svg></div>
                    <div class="w-40 flex justify-center"><svg class="h-8 text-black" viewBox="0 0 100 30" fill="currentColor"><text x="10" y="20" font-family="sans-serif" font-weight="900" font-size="20">HILTON</text></svg></div>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-neutral-200 pt-16">
            <div class="text-center">
                <p class="text-4xl font-black text-black mb-2">5M+</p>
                <p class="text-sm font-semibold text-neutral-500">Bottles Delivered</p>
            </div>
            <div class="text-center">
                <p class="text-4xl font-black text-black mb-2">500+</p>
                <p class="text-sm font-semibold text-neutral-500">Corporate Clients</p>
            </div>
            <div class="text-center">
                <p class="text-4xl font-black text-black mb-2">100%</p>
                <p class="text-sm font-semibold text-neutral-500">Recyclable</p>
            </div>
            <div class="text-center">
                <p class="text-4xl font-black text-black mb-2">48h</p>
                <p class="text-sm font-semibold text-neutral-500">Turnaround Time</p>
            </div>
        </div>
    </div>
</section>

<style>
    .mask-edges {
        mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    }
    @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
    .animate-marquee {
        animation: marquee 25s linear infinite;
    }
</style>
