export function reveal(node, { delay = 0, duration = 1000, y = 30 } = {}) {
    node.style.opacity = '0';
    node.style.transform = `translateY(${y}px)`;
    node.style.transition = `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
    node.style.willChange = 'opacity, transform';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                node.style.opacity = '1';
                node.style.transform = 'translateY(0)';
                observer.unobserve(node);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        }
    };
}
