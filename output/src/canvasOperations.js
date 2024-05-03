// canvasOperations.js
export function setupCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.onload = function() {
        const imgWidth = 300;
        const imgHeight = 300;
        const imgX = canvas.width / 2 - imgWidth / 2;
        const imgY = canvas.height / 2 - imgHeight / 2;

        ctx.drawImage(image, imgX, imgY, imgWidth, imgHeight);
        wrapText(ctx, "This is some example text that needs to wrap around an image...", imgX, imgY, imgWidth, imgHeight, 20, 400, 14);
    };
    image.src = 'path_to_your_image.jpg';
}

function wrapText(ctx, text, imgX, imgY, imgWidth, imgHeight, lineHeight, maxWidth, fontSize) {
    ctx.font = `${fontSize}px Arial`;
    let words = text.split(' ');
    let line = '';
    let y = lineHeight;

    for (let word of words) {
        let testLine = line + word + ' ';
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;

        if (testWidth > maxWidth && line) {
            ctx.fillText(line, imgX, y);
            line = word + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }

    if (line) {
        ctx.fillText(line, imgX, y);
    }
}
