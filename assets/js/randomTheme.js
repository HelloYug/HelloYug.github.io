document.addEventListener("DOMContentLoaded", function () {
    // --- CONFIGURATION ---
    const ENABLE_RANDOM_THEME = true; // Set to false to always use the default theme
    const DEFAULT_THEME = "theme-blue"; // Fallback theme if randomization is off

    // Array of themes with their respective weights (higher weight = more likely to be chosen)
    const themes = [
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

    // 1. Check if a theme was passed in the URL (when navigating between linked pages)
    const urlParams = new URLSearchParams(window.location.search);
    const passedTheme = urlParams.get('theme');

    let chosenTheme;

    // Validate the passed theme against our array
    if (passedTheme && themes.some(t => t.name === passedTheme)) {
        chosenTheme = themes.find(t => t.name === passedTheme);
    } else {
        // 2. Otherwise, generate a completely random theme for this visit
        const totalWeight = themes.reduce((sum, theme) => sum + theme.weight, 0);
        const rand = Math.random() * totalWeight;
        let cumulative = 0;

        chosenTheme = themes[0]; // Default to first
        for (const theme of themes) {
            cumulative += theme.weight;
            if (rand < cumulative) {
                chosenTheme = theme;
                break;
            }
        }
    }

    // Apply the chosen theme (overwriting the hardcoded HTML class)
    document.body.className = chosenTheme.name;

    // 3. Find any internal links to our portfolio pages and attach the current theme to them
    // This allows the user to navigate back and forth without losing their color, entirely statelessly.
    const internalLinks = document.querySelectorAll('a[href^="resume.html"], a[href^="index.html"]');
    internalLinks.forEach(link => {
        const url = new URL(link.href, window.location.href);
        url.searchParams.set('theme', chosenTheme.name);
        link.href = url.toString();
    });

    // Apply the chosen theme (overwriting the hardcoded HTML class)
    document.body.className = chosenTheme.name;
});
