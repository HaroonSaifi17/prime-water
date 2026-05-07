<script>
    import { goto } from '$app/navigation';
</script>

<div class="min-h-screen bg-[#0B132B] text-white pt-24 px-4 pb-12 font-sans">
    <div class="max-w-4xl mx-auto">
        <button on:click={() => goto('/customize')} class="text-blue-400 hover:text-cyan-400 mb-8 flex items-center gap-2 text-sm font-medium transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Design
        </button>

        <div class="flex items-center justify-between mb-10">
            <h1 class="text-4xl font-bold">Review & Checkout</h1>
            <div class="flex gap-2">
                <span class="w-3 h-3 rounded-full bg-blue-500/20"></span>
                <span class="w-3 h-3 rounded-full bg-blue-500/20"></span>
                <span class="w-3 h-3 rounded-full bg-cyan-400"></span>
            </div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
            <!-- Order Details -->
            <div class="md:col-span-2 space-y-6">
                <div class="bg-[#1C2541] rounded-2xl p-6 border border-blue-500/20 shadow-xl">
                    <h2 class="text-xl font-semibold mb-4 text-blue-100">Shipping Information</h2>
                    <div class="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" class="bg-[#0B132B] border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none">
                        <input type="text" placeholder="Last Name" class="bg-[#0B132B] border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none">
                        <input type="text" placeholder="Company (Optional)" class="col-span-2 bg-[#0B132B] border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none">
                        <input type="text" placeholder="Address" class="col-span-2 bg-[#0B132B] border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none">
                        <input type="text" placeholder="City" class="bg-[#0B132B] border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none">
                        <input type="text" placeholder="Postal Code" class="bg-[#0B132B] border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none">
                    </div>
                </div>

                <div class="bg-[#1C2541] rounded-2xl p-6 border border-blue-500/20 shadow-xl">
                    <h2 class="text-xl font-semibold mb-4 text-blue-100">Batch Quantity</h2>
                    <div class="flex items-center gap-4">
                        <select class="w-1/2 bg-[#0B132B] border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none">
                            <option>500 Bottles (Min)</option>
                            <option>1,000 Bottles</option>
                            <option>5,000 Bottles</option>
                            <option>10,000+ Bottles (Wholesale)</option>
                        </select>
                        <span class="text-blue-200/60 text-sm">Estimated delivery: 7-10 Business Days</span>
                    </div>
                </div>
            </div>

            <!-- Summary Sidebar -->
            <div class="space-y-6">
                <div class="bg-[#1C2541] rounded-2xl p-6 border border-blue-500/20 shadow-xl relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B132B]/50 pointer-events-none"></div>
                    <h2 class="text-xl font-semibold mb-6 text-blue-100 relative z-10">Order Summary</h2>
                    
                    <div class="space-y-4 text-sm relative z-10">
                        <div class="flex justify-between text-blue-200">
                            <span>Base Rate (500 units)</span>
                            <span>$250.00</span>
                        </div>
                        <div class="flex justify-between text-blue-200">
                            <span>Custom Label Setup</span>
                            <span>$49.00</span>
                        </div>
                        <div class="flex justify-between text-blue-200">
                            <span>Shipping</span>
                            <span>Calculated at next step</span>
                        </div>
                        <hr class="border-blue-500/20 my-4">
                        <div class="flex justify-between text-lg font-bold text-white">
                            <span>Total</span>
                            <span>$299.00</span>
                        </div>
                    </div>

                    <button class="w-full mt-8 py-4 bg-white text-[#0B132B] font-bold rounded-xl hover:bg-gray-100 transition-colors relative z-10">
                        Continue to Payment
                    </button>
                    <p class="text-center text-xs text-blue-400/50 mt-4 relative z-10">Secure encrypted checkout</p>
                </div>
            </div>
        </div>
    </div>
</div>
