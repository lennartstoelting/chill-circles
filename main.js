const arcs = [
    "#D0E7F5",
    "#D9E7F4",
    "#D6E3F4",
    "#BCDFF5",
    "#B7D9F4",
    "#C3D4F0",
    "#9DC1F3",
    "#9AA9F4",
    "#8D83EF",
    "#AE69F0",
    "#D46FF1",
    "#DB5AE7",
    "#D911DA",
    "#D601CB",
    "#E713BF",
    "#F24CAE",
    "#FB79AB",
    "#FFB6C1",
    "#FED2CF",
    "#FDDFD5",
    "#FEDCD1",
];

/* https://colordesigner.io/gradient-generator */
const arcs2 = [
    "#fafa6e",
    "#e1f470",
    "#c9ee73",
    "#b2e777",
    "#9cdf7c",
    "#86d780",
    "#72cf85",
    "#5ec688",
    "#4abd8c",
    "#37b38e",
    "#23aa8f",
    "#0ba08f",
    "#00968e",
    "#008c8b",
    "#008288",
    "#007882",
    "#106e7c",
    "#1b6474",
    "#225b6c",
    "#275162",
    "#2a4858",
];

// var audio = new Audio("https://ia800106.us.archive.org/13/items/24-piano-keys/key01.mp3");
// audio.play();

const initAudio = () => {
    const array = [];
    for (let i = 1; i <= arcs.length; i++) {
        array.push(new Audio("https://ia800106.us.archive.org/13/items/24-piano-keys/key" + i.toString().padStart(2, "0") + ".mp3"));
    }
    return array;
};

const audio = initAudio();

const paper = document.querySelector("#paper");
pen = paper.getContext("2d");
pen.lineCap = "round";

let startTime = new Date().getTime();

const draw = () => {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000;

    // console.log(elapsedTime);

    /* update paper size */
    paper.width = paper.clientWidth;
    paper.height = paper.clientHeight;

    const start = { x: paper.width * 0.1, y: paper.height * 0.9 };
    const end = { x: paper.width * 0.9, y: paper.height * 0.9 };
    const center = { x: paper.width * 0.5, y: paper.height * 0.9 };

    const length = end.x - start.x;
    const initialArcRadius = length * 0.05;
    const spacing = (length / 2 - initialArcRadius) / arcs.length;
    maxAngle = 2 * Math.PI;

    pen.strokeStyle = "white";
    pen.lineWidth = 6;

    /** baseline */
    pen.beginPath();
    pen.moveTo(start.x, start.y);
    pen.lineTo(end.x, end.y);
    pen.stroke();

    arcs2.forEach((arc, index) => {
        const arcRadius = initialArcRadius + index * spacing;

        /** arc */
        pen.beginPath();
        pen.strokeStyle = arc;
        pen.arc(center.x, center.y, arcRadius, Math.PI, Math.PI * 2);
        pen.stroke();

        /** circle */
        const numberOfLoops = 50 - index;
        const velocity = (maxAngle * numberOfLoops) / 900; // 900s = 15min, until all circles realign
        const distance = Math.PI + elapsedTime * velocity;
        modDistance = distance % maxAngle;
        adjustedDistance = modDistance >= Math.PI ? modDistance : maxAngle - modDistance;

        const x = center.x + arcRadius * Math.cos(adjustedDistance);
        const y = center.y + arcRadius * Math.sin(adjustedDistance);

        pen.fillStyle = "white";
        pen.beginPath();
        pen.arc(x, y, length * 0.0065, 0, Math.PI * 2);
        pen.fill();
    });

    requestAnimationFrame(draw);
};

draw();
