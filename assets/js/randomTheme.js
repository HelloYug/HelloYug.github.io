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

    // 1. Get info about current state
    const isResumePage = window.location.pathname.includes('resume');
    const navEntries = performance.getEntriesByType('navigation');
    const navType = navEntries.length > 0 ? navEntries[0].type : 'navigate';
    const isReload = navType === 'reload';

    let storedTheme = sessionStorage.getItem('selected-theme');

    // 2. Logic for Theme Selection
    // "in case any of the pages is accessed and resume page is not open, and the page is refreshed, switch between various themes"
    if (isReload && !isResumePage) {
        storedTheme = null; // Clear to force a new random selection
    }

    let chosenTheme;

    // Use stored theme if available (and not a forced reload-switch)
    if (storedTheme && themes.some(t => t.name === storedTheme)) {
        chosenTheme = themes.find(t => t.name === storedTheme);
    } else {
        // 3. Generate a random theme
        let availableThemes = themes;
        
        // If we are forcing a switch on reload, avoid the previously selected theme
        if (isReload && !isResumePage && sessionStorage.getItem('selected-theme')) {
            const previousTheme = sessionStorage.getItem('selected-theme');
            availableThemes = themes.filter(t => t.name !== previousTheme);
            if (availableThemes.length === 0) availableThemes = themes; // Fallback
        }

        const totalWeight = availableThemes.reduce((sum, theme) => sum + theme.weight, 0);
        const rand = Math.random() * totalWeight;
        let cumulative = 0;

        chosenTheme = availableThemes[0]; // Default fallback
        for (const theme of availableThemes) {
            cumulative += theme.weight;
            if (rand < cumulative) {
                chosenTheme = theme;
                break;
            }
        }
    }

    // 4. Apply and Persist
    sessionStorage.setItem('selected-theme', chosenTheme.name);
    document.body.className = chosenTheme.name;

    // 5. Clean up the URL (No longer checking for 'theme' param)
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

    // Update address bar if path was cleaned
    if (needsClean) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.toString() ? '?' + urlParams.toString() : '';
        const newUrl = currentPath + query + window.location.hash;
        window.history.replaceState({}, '', newUrl);
    }

    // 6. Normalize links on the page (Ensure index.html is replaced by /)
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        try {
            const url = new URL(link.href, window.location.href);
            if (url.origin === window.location.origin) {
                if (url.pathname.endsWith('/index.html')) {
                    url.pathname = url.pathname.replace('/index.html', '/');
                    link.href = url.toString();
                } else if (url.pathname === 'index.html' || url.pathname.endsWith('/index.html')) {
                    link.href = './';
                }
            }
        } catch (e) {}
    });
});
