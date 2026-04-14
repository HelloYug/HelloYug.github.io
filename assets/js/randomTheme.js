document.addEventListener("DOMContentLoaded", function () {
    // --- CONFIGURATION ---
    const ENABLE_RANDOM_THEME = true; // Set to false to always use the default theme
    const DEFAULT_THEME = "theme-default"; // Fallback theme if randomization is off

    // Array of themes with their respective weights (higher weight = more likely to be chosen)
    const themes = [
        { name: "theme-default", weight: 1 }, // Original Green & Dark Blue theme
        { name: "theme-blue", weight: 1 },
        { name: "theme-purple", weight: 1 },
        { name: "theme-orange", weight: 1 },
        { name: "theme-crimson", weight: 1 },
        { name: "theme-teal", weight: 1 },
        { name: "theme-monochrome", weight: 1 }
    ];

    // If randomization is disabled, strip hardcoded classes and set default
    if (!ENABLE_RANDOM_THEME) {
        document.body.className = DEFAULT_THEME;
        return;
    }

    // 1. Check for theme in priority: URL param > sessionStorage > random
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get('theme');
    let storedTheme = sessionStorage.getItem('selected-theme');

    const isResumePage = window.location.pathname.includes('resume');
    const navEntries = performance.getEntriesByType('navigation');
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';

    // If it's a reload and we're not on the resume page, force a new random theme 
    // to "switch between various themes"
    if (isReload && !isResumePage) {
        storedTheme = null;
    }

    let chosenThemeName = urlTheme || storedTheme;
    let chosenTheme;

    // Validate the chosen theme against our array
    if (chosenThemeName && themes.some(t => t.name === chosenThemeName)) {
        chosenTheme = themes.find(t => t.name === chosenThemeName);
    } else {
        // 2. Otherwise, generate a completely random theme
        let availableThemes = themes;
        
        // If we are forcing a switch on reload, try to avoid the previously selected theme
        if (isReload && !isResumePage && sessionStorage.getItem('selected-theme')) {
            const previousTheme = sessionStorage.getItem('selected-theme');
            availableThemes = themes.filter(t => t.name !== previousTheme);
            if (availableThemes.length === 0) availableThemes = themes; // Fallback
        }

        const totalWeight = availableThemes.reduce((sum, theme) => sum + theme.weight, 0);
        const rand = Math.random() * totalWeight;
        let cumulative = 0;

        chosenTheme = availableThemes[0]; // Default
        for (const theme of availableThemes) {
            cumulative += theme.weight;
            if (rand < cumulative) {
                chosenTheme = theme;
                break;
            }
        }
    }

    // 3. Persist and apply
    sessionStorage.setItem('selected-theme', chosenTheme.name);
    document.body.className = chosenTheme.name;

    // 4. Clean up the URL
    // Remove theme param if present
    if (urlTheme) {
        urlParams.delete('theme');
    }

    // Prepare clean URL
    let currentPath = window.location.pathname;
    let needsClean = false;

    // Remove index.html for "domain only" requirement on Home
    if (currentPath.endsWith('/index.html')) {
        currentPath = currentPath.replace('/index.html', '/');
        needsClean = true;
    } 
    // Remove .html extension from other pages for cleaner URLs
    else if (currentPath.endsWith('.html')) {
        currentPath = currentPath.replace('.html', '');
        needsClean = true;
    }

    // If theme was in URL or path was cleaned, update address bar
    if (urlTheme || needsClean) {
        const query = urlParams.toString() ? '?' + urlParams.toString() : '';
        const newUrl = currentPath + query + window.location.hash;
        window.history.replaceState({}, '', newUrl);
    }

    // 5. Clean up URLs on the page (Normalizing index.html to / for clean domain-only Home URL)
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        try {
            const url = new URL(link.href, window.location.href);
            if (url.origin === window.location.origin) {
                // Remove index.html from end of paths for clean "domain-only" home URLs
                if (url.pathname.endsWith('/index.html')) {
                    url.pathname = url.pathname.replace('/index.html', '/');
                    link.href = url.toString();
                } else if (url.pathname === 'index.html') {
                    link.href = './';
                }
            }
        } catch (e) {}
    });
});
