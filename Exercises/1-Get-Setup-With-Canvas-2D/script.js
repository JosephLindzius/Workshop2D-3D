function drawCircle(x, y, radiusX, radiusY, rotation) {
    context.beginPath();
    context.ellipse(x, y, radiusX, radiusY, rotation, 0, 2 * Math.PI);
    context.stroke();
}
