<script>
    import { reveal } from '$lib/utils/animations.js';
</script>

<div class="pt-40 pb-32 px-6 min-h-screen bg-neutral-50 flex items-center">
    <div class="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        <!-- Left Side: Copy & Info -->
        <div use:reveal={{delay: 0}} class="space-y-8 sticky top-40">
            <div>
                <h1 class="text-5xl md:text-6xl font-black tracking-tighter text-neutral-900 mb-6 leading-none">
                    Let's create<br />something <span class="text-neutral-400">iconic.</span>
                </h1>
                <p class="text-xl text-neutral-500 font-medium leading-relaxed max-w-md">
                    Whether you need 500 bottles for an exclusive event or 50,000 for a retail rollout, our team is ready to deliver.
                </p>
            </div>
            
            <div class="pt-8 border-t border-neutral-200 grid grid-cols-2 gap-8">
                <div>
                    <h3 class="font-bold text-neutral-900 mb-1">General Inquiries</h3>
                    <a href="mailto:hello@primewater.co" class="text-neutral-500 hover:text-black font-medium transition-colors">hello@primewater.co</a>
                </div>
                <div>
                    <h3 class="font-bold text-neutral-900 mb-1">Corporate Sales</h3>
                    <a href="mailto:b2b@primewater.co" class="text-neutral-500 hover:text-black font-medium transition-colors">b2b@primewater.co</a>
                </div>
            </div>
        </div>

        <!-- Right Side: Form -->
        <div use:reveal={{delay: 150}} class="w-full bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-neutral-100">
            <form class="space-y-6" onsubmit={(e) => e.preventDefault()}>
                <div class="grid grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="text-sm font-bold text-neutral-900 block" for="fname">First Name</label>
                        <input type="text" id="fname" placeholder="John" class="w-full px-5 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-black focus:outline-none transition-all font-medium placeholder:font-normal" />
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-bold text-neutral-900 block" for="lname">Last Name</label>
                        <input type="text" id="lname" placeholder="Doe" class="w-full px-5 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-black focus:outline-none transition-all font-medium placeholder:font-normal" />
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="text-sm font-bold text-neutral-900 block" for="email">Work Email</label>
                    <input type="email" id="email" placeholder="john@company.com" class="w-full px-5 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-black focus:outline-none transition-all font-medium placeholder:font-normal" />
                </div>
                
                <div class="space-y-2">
                    <label class="text-sm font-bold text-neutral-900 block" for="volume">Estimated Volume</label>
                    <select id="volume" class="w-full px-5 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-black focus:outline-none transition-all font-medium appearance-none cursor-pointer">
                        <option>500 - 1,000 Bottles</option>
                        <option>1,000 - 5,000 Bottles</option>
                        <option>5,000 - 10,000 Bottles</option>
                        <option>10,000+ Bottles (Enterprise)</option>
                    </select>
                </div>

                <div class="space-y-2">
                    <label class="text-sm font-bold text-neutral-900 block" for="message">Project Details</label>
                    <textarea id="message" rows="4" placeholder="Tell us about your event, timeline, or specific requirements..." class="w-full px-5 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-black focus:outline-none transition-all resize-none font-medium placeholder:font-normal"></textarea>
                </div>

                <button type="submit" class="w-full py-5 bg-black text-white font-bold rounded-2xl text-lg hover:bg-neutral-800 transition-all mt-4 shadow-xl shadow-black/10 focus:ring-4 focus:ring-neutral-200">
                    Submit Request
                </button>
            </form>
        </div>
        
    </div>
</div>

<style>
    select {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 1rem center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
    }
</style>
