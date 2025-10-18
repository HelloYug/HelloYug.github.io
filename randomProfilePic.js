window.addEventListener("load", function() {
  // Define weights (higher number = higher chance)
  const weights = [1, 1, 1, 0, 3]; // Corresponds to pics 1-5
  const total = weights.reduce((a, b) => a + b, 0);

  // Generate weighted random number
  const rand = Math.random() * total;
  let cumulative = 0;
  let chosen = 1;

  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (rand < cumulative) {
      chosen = i + 1;
      break;
    }
  }

  // Determine extension (jpg for 1–4, png for 5)
  const extension = (chosen === 5) ? "png" : "jpg";

  // Encode filename (handles spaces/parentheses)
  const fileName = encodeURIComponent(`YugAgarwalPFP (${chosen}).${extension}`);

  // Build image path and set it
  const img = document.getElementById("profile-pic");
  if (img) {
    img.src = `assets/img/${fileName}`;
  }
});
