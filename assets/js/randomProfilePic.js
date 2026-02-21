document.addEventListener("DOMContentLoaded", function () {
  // --- CONFIGURATION ---
  const ENABLE_RANDOM_PIC = true; // Set to false to always show the default picture
  const DEFAULT_PIC = "YugAgarwalPFP (1).jpg"; // Fallback picture if randomization is off

  // Array of profiles makes it much easier to manage extensions and weights
  const profiles = [
    { file: "YugAgarwalPFP (1).jpg", weight: 1 },
    { file: "YugAgarwalPFP (2).jpg", weight: 1 },
    { file: "YugAgarwalPFP (3).jpg", weight: 1 },
    { file: "YugAgarwalPFP (4).jpg", weight: 0 }, // 0% chance
    { file: "YugAgarwalPFP (5).png", weight: 2 }
  ];

  const img = document.getElementById("profile-pic");
  if (!img) return;

  // If randomization is disabled, set default and exit
  if (!ENABLE_RANDOM_PIC) {
    img.src = `assets/img/${DEFAULT_PIC}`;
    return;
  }

  // Calculate total weight
  const totalWeight = profiles.reduce((sum, profile) => sum + profile.weight, 0);

  // Generate weighted random number
  const rand = Math.random() * totalWeight;
  let cumulative = 0;
  let chosenProfile = profiles[0]; // Default to first

  for (const profile of profiles) {
    cumulative += profile.weight;
    if (rand < cumulative) {
      chosenProfile = profile;
      break;
    }
  }

  // Set the image source (browser handles URL encoding automatically natively)
  img.src = `assets/img/${chosenProfile.file}`;
});
