
const canvas = document.getElementById('canvas');
let context = canvas.getContext("2d");

const boxHeight = 10;
const boxWidth = 10;

const columns = 10;
const rows = 10;


let speed = 1;
let xCoord = 0.005;

for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
        if(i & 2) {
            context.fillRect(5+20*i, 5+20*j+100, boxWidth, boxHeight);
        }
        if(j & 8) {
            context.fillRect(5+20*i, 5+20*j+100, boxWidth, boxHeight);
        }

    }
}
context.lineCap = "round";

function animate() {
    context.clearRect(0, 0, 1000, 800);

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < columns; i++) {
            if(i & 2) {
                context.fillRect(xCoord+20*i, 100*Math.sin(xCoord/20)+20*j+100, boxWidth, boxHeight);
                context.lineCap = "round";
            }
            if(j & 8) {
                context.fillRect(xCoord+20*i, 100*Math.sin(xCoord/20)+20*j+100, boxWidth, boxHeight);
                context.lineCap = "round";
            }

        }
    }

    xCoord += speed;
    if (xCoord > canvas.width - 195 || xCoord < 0) {
        speed = -speed;
    }



    requestAnimationFrame(animate);
}

animate();


