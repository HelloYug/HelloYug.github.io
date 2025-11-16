window.addEventListener("load", function() {
  // Use config if available, otherwise fallback to defaults
  const config = typeof PortfolioConfig !== 'undefined' ? PortfolioConfig.profilePictures : {
    weights: [1, 1, 1, 0, 3],
    basePath: 'assets/img/',
    filePattern: 'YugAgarwalPFP ({index}).{ext}',
    extensions: { 1: 'jpg', 2: 'jpg', 3: 'jpg', 4: 'jpg', 5: 'png' }
  };
  
  const weights = config.weights;
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

  // Get extension from config
  const extension = config.extensions[chosen];

  // Build filename from pattern
  const fileName = encodeURIComponent(`YugAgarwalPFP (${chosen}).${extension}`);

  // Build image path and set it
  const img = document.getElementById("profile-pic");
  if (img) {
    img.src = `${config.basePath}${fileName}`;
  }
});
