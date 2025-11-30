/* ---------------------------------------------------- */
/* CUSTOM CURSOR JAVASCRIPT LOGIC */
/* ---------------------------------------------------- */
(function() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return; // Exit if cursor element doesn't exist
    
    const interactiveElements = document.querySelectorAll('a, button, .nav-link'); 
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, li, code'); 
    
    // 1. Mouse Movement
    document.addEventListener('mousemove', e => {
        // Offset by half the default cursor size (6px)
        cursor.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`;
    });
    
    // 2. State Switching: Link Hover (Circuit Node)
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.remove('text-hover');
            cursor.classList.add('link-hover');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('link-hover');
        });
    });
    
    // 3. State Switching: Text Hover (I-Beam)
    textElements.forEach(element => {
        // Prevent triggering I-beam on elements that are also links
        if (!element.closest('a') && !element.closest('button') && !element.classList.contains('nav-link')) {
            element.addEventListener('mouseenter', () => {
                cursor.classList.remove('link-hover');
                cursor.classList.add('text-hover');
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('text-hover');
            });
        }
    });

    // 4. Reset on leaving the document
    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('link-hover', 'text-hover');
    });
})();