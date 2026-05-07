<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';

    let { brandName = 'NANO_BANAO', vibe = '', isGenerating = false } = $props();

    let container;
    let scene, camera, renderer, bottle, labelMesh;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255
        } : null;
    }

    function hexToRgbArray(hex) {
        const rgb = hexToRgb(hex);
        return rgb ? [rgb.r, rgb.g, rgb.b] : [1, 1, 1];
    }

    function getVibeColor(vibeStr) {
        const vibeLower = (vibeStr || '').toLowerCase();
        if (vibeLower.includes('luxury') || vibeLower.includes('dark')) return '#1a1a2e';
        if (vibeLower.includes('eco') || vibeLower.includes('organic')) return '#2d5a27';
        if (vibeLower.includes('vibrant') || vibeLower.includes('playful')) return '#ff6b35';
        if (vibeLower.includes('corporate') || vibeLower.includes('clean')) return '#0077b6';
        return '#0ea5e9';
    }

    function getVibeAccent(vibeStr) {
        const vibeLower = (vibeStr || '').toLowerCase();
        if (vibeLower.includes('luxury') || vibeLower.includes('dark')) return '#d4af37';
        if (vibeLower.includes('eco') || vibeLower.includes('organic')) return '#90be6d';
        if (vibeLower.includes('vibrant') || vibeLower.includes('playful')) return '#ffbe0b';
        if (vibeLower.includes('corporate') || vibeLower.includes('clean')) return '#00b4d8';
        return '#ffffff';
    }

    onMount(() => {
        init();
        animate();
        window.addEventListener('resize', onWindowResize);
        return () => {
            window.removeEventListener('resize', onWindowResize);
            if (renderer) renderer.dispose();
        };
    });

    function init() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a0a);

        camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
        camera.position.set(0, 0, 6);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(5, 5, 5);
        mainLight.castShadow = true;
        scene.add(mainLight);

        const fillLight = new THREE.DirectionalLight(0x8888ff, 0.5);
        fillLight.position.set(-5, 0, 5);
        scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
        rimLight.position.set(0, 5, -5);
        scene.add(rimLight);

        createBottle();
        createLabel();
    }

    function createBottle() {
        const bottleGroup = new THREE.Group();

        const capGeometry = new THREE.CylinderGeometry(0.22, 0.22, 0.4, 32);
        const capMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            metalness: 0.8,
            roughness: 0.2
        });
        const cap = new THREE.Mesh(capGeometry, capMaterial);
        cap.position.y = 1.9;
        cap.castShadow = true;
        bottleGroup.add(cap);

        const neckGeometry = new THREE.CylinderGeometry(0.22, 0.28, 0.3, 32);
        const neckMaterial = new THREE.MeshStandardMaterial({
            color: 0x88ccff,
            metalness: 0.1,
            roughness: 0.1,
            transparent: true,
            opacity: 0.9
        });
        const neck = new THREE.Mesh(neckGeometry, neckMaterial);
        neck.position.y = 1.55;
        bottleGroup.add(neck);

        const bodyWidth = 0.9;
        const bodyHeight = 2.2;
        const bodyDepth = 0.5;

        const bodyShape = new THREE.Shape();
        bodyShape.moveTo(-bodyWidth/2, 0);
        bodyShape.lineTo(-bodyWidth/2, bodyHeight * 0.1);
        bodyShape.quadraticCurveTo(-bodyWidth/2, bodyHeight * 0.15, -bodyWidth/2 + 0.1, bodyHeight * 0.2);
        bodyShape.lineTo(bodyWidth/2 - 0.1, bodyHeight * 0.2);
        bodyShape.quadraticCurveTo(bodyWidth/2, bodyHeight * 0.15, bodyWidth/2, bodyHeight * 0.1);
        bodyShape.lineTo(bodyWidth/2, 0);
        bodyShape.lineTo(-bodyWidth/2, 0);

        const extrudeSettings = {
            depth: bodyDepth,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: 0.05,
            bevelSegments: 3
        };

        const bodyGeometry = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
        bodyGeometry.center();

        const bodyMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x88ddff,
            metalness: 0,
            roughness: 0.05,
            transmission: 0.95,
            thickness: 0.5,
            transparent: true,
            opacity: 0.8,
            ior: 1.4,
            clearcoat: 1,
            clearcoatRoughness: 0.1
        });

        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.2;
        body.castShadow = true;
        body.receiveShadow = true;
        bottleGroup.add(body);

        const waterGeometry = new THREE.BoxGeometry(bodyWidth - 0.1, bodyHeight * 0.75, bodyDepth - 0.1);
        const waterMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x22aaff,
            metalness: 0,
            roughness: 0.1,
            transmission: 0.6,
            thickness: 0.3,
            transparent: true,
            opacity: 0.5
        });
        const water = new THREE.Mesh(waterGeometry, waterMaterial);
        water.position.y = -0.5;
        bottleGroup.add(water);

        bottle = bottleGroup;
        scene.add(bottle);

        const floorGeometry = new THREE.PlaneGeometry(10, 10);
        const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -1.3;
        floor.receiveShadow = true;
        scene.add(floor);
    }

    function createLabel() {
        const labelWidth = 1.6;
        const labelHeight = 0.9;

        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 288;
        const ctx = canvas.getContext('2d');

        const baseColor = getVibeColor(vibe);
        const accentColor = getVibeAccent(vibe);

        const gradient = ctx.createLinearGradient(0, 0, 512, 288);
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(1, shadeColor(baseColor, -30));
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 288);

        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 3;
        ctx.strokeRect(10, 10, 492, 268);
        ctx.strokeRect(15, 15, 482, 258);

        ctx.fillStyle = accentColor;
        ctx.font = 'bold 72px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(brandName || 'NANO_BANAO', 256, 140);

        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('PREMIUM WATER', 256, 180);

        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = '18px sans-serif';
        ctx.fillText('200ml', 256, 220);
        ctx.fillText('FSSAI: 3026041324102600', 256, 250);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;

        const labelGeometry = new THREE.PlaneGeometry(labelWidth, labelHeight);
        const labelMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.DoubleSide,
            roughness: 0.3,
            metalness: 0.1
        });

        labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
        labelMesh.position.set(0, 0.2, 0.26);
        bottle.add(labelMesh);
    }

    function shadeColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    function updateLabel() {
        if (labelMesh) {
            bottle.remove(labelMesh);
            labelMesh.geometry.dispose();
            labelMesh.material.map.dispose();
            labelMesh.material.dispose();
        }
        createLabel();
    }

    function onWindowResize() {
        if (!container || !camera || !renderer) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    function animate() {
        requestAnimationFrame(animate);

        if (bottle) {
            targetRotationY = mouseX * 0.5;
            targetRotationX = mouseY * 0.3;
            bottle.rotation.y += (targetRotationY - bottle.rotation.y) * 0.05;
            bottle.rotation.x += (targetRotationX - bottle.rotation.x) * 0.05;
        }

        if (renderer && scene && camera) {
            renderer.render(scene, camera);
        }
    }

    export function updateBrand(newBrand, newVibe) {
        brandName = newBrand;
        vibe = newVibe;
        updateLabel();
    }

    $effect(() => {
        if (labelMesh && (brandName || vibe)) {
            updateLabel();
        }
    });
</script>

<div
    class="w-full h-full cursor-grab active:cursor-grabbing"
    bind:this={container}
    onmousemove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }}
    role="img"
    aria-label="3D bottle preview"
></div>