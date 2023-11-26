const gradients = [
    /* https://colordesigner.io/gradient-generator */
    [
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
    ],
    [
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
    ],
];
const colors = gradients[0];
const audioURL = "https://ia800106.us.archive.org/13/items/24-piano-keys/"; // beginning of the piano notes URL
const velocityEquation = (index) => (2 * Math.PI * (60 - index)) / 900; // 900s = 15min, until all circles realign
let startTime = new Date().getTime();

const paper = document.querySelector("#paper");
pen = paper.getContext("2d");
paper.addEventListener("click", () => {
    toggleFullscreen();
});

const arcs = colors.map((color, index) => {
    return {
        color: color,
        audio: new Audio(
            audioURL +
                "key" +
                Math.min(index + 1, 24)
                    .toString()
                    .padStart(2, "0") +
                ".mp3"
        ), //audio.play() zum Abspielen
        velocity: velocityEquation(index),
    };
});

const draw = () => {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000;

    /* update paper size */
    paper.width = paper.clientWidth;
    paper.height = paper.clientHeight;

    const start = { x: paper.width * 0.1, y: paper.height * 0.9 };
    const end = { x: paper.width * 0.9, y: paper.height * 0.9 };
    const center = { x: paper.width * 0.5, y: paper.height * 0.9 };

    const length = end.x - start.x;
    const initialArcRadius = length * 0.05;
    const spacing = (length / 2 - initialArcRadius) / arcs.length;
    const maxAngle = 2 * Math.PI;

    pen.strokeStyle = "white";
    pen.lineWidth = 6;

    /** baseline */
    pen.beginPath();
    pen.moveTo(start.x, start.y);
    pen.lineTo(end.x, end.y);
    pen.stroke();

    arcs.forEach((arc, index) => {
        const arcRadius = initialArcRadius + index * spacing;

        /** arc */
        pen.beginPath();
        pen.strokeStyle = arc.color;
        pen.arc(center.x, center.y, arcRadius, Math.PI, Math.PI * 2);
        pen.stroke();

        /** circle */
        const distance = Math.PI + elapsedTime * arc.velocity;
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

/* minor helper functions */
let fullScreen = false;
const toggleFullscreen = () => {
    if (fullScreen) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen();
        }
        fullScreen = false;
    } else {
        if (paper.requestFullscreen) {
            paper.requestFullscreen();
        } else if (paper.webkitRequestFullscreen) {
            /* Safari */
            paper.webkitRequestFullscreen();
        } else if (paper.msRequestFullscreen) {
            /* IE11 */
            paper.msRequestFullscreen();
        }
        fullScreen = true;
    }
};
