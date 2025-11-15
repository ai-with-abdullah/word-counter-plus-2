#!/bin/bash
# This script converts the SVG icon to PNG files of different sizes
# Requires ImageMagick or similar tool

# If you have ImageMagick installed, uncomment and run:
# convert icon.svg -resize 16x16 icon16.png
# convert icon.svg -resize 32x32 icon32.png
# convert icon.svg -resize 48x48 icon48.png
# convert icon.svg -resize 128x128 icon128.png

echo "To create PNG icons, you can:"
echo "1. Use an online SVG to PNG converter (e.g., cloudconvert.com)"
echo "2. Use ImageMagick: brew install imagemagick (Mac) or apt-get install imagemagick (Linux)"
echo "3. Use a design tool like Figma, Canva, or Photoshop"
echo ""
echo "Required sizes: 16x16, 32x32, 48x48, 128x128 pixels"
