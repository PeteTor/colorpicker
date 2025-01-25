// Select elements
const colorInput = document.getElementById('color-input');
const hexValue = document.getElementById('hex-value');
const rgbValue = document.getElementById('rgb-value');
const hslValue = document.getElementById('hsl-value');
const previewBox = document.getElementById('preview-box');

// Event listener for color input
colorInput.addEventListener('input', (event) => {
  const selectedColor = event.target.value;

  // Update the preview box background
  previewBox.style.backgroundColor = selectedColor;

  // Update HEX value
  hexValue.textContent = selectedColor;

  // Convert HEX to RGB and HSL
  const rgb = hexToRgb(selectedColor);
  rgbValue.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hslValue.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
});

// Helper function: Convert HEX to RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

// Helper function: Convert RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l;

  l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return { h, s, l };
}
