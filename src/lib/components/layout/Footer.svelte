<script>
    // Footer logic (e.g. dynamic year) can be added here
    const currentYear = new Date().getFullYear();
</script>

<footer class="bg-black text-white py-12 px-6">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex flex-col items-center md:items-start gap-1">
            <span class="text-2xl font-black">prime.</span>
            <span class="text-neutral-500 text-xs">© {currentYear} All rights reserved.</span>
        </div>
        <div class="text-center md:text-right">
            <p class="text-neutral-400 text-sm font-medium">Packaged Drinking Water</p>
            <p class="text-neutral-500 text-xs mt-1">FSSAI No. 3026041324102600 • New Delhi, India</p>
        </div>
    </div>
</footer>
