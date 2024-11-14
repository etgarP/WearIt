fs = require('fs');
const imageBuffer = fs.readFileSync('model.png');

// Convert the image buffer to a Base64 string
const base64Image = imageBuffer.toString('base64');

// Save the Base64 string to a file
fs.writeFileSync('output.txt', `data:image/png;base64,${base64Image}`);
