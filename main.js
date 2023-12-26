/* global variables */
const gradientColorSamples = [
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

const gradientColorSampleRGB = [
    [250, 250, 110],
    [240, 241, 109],
    [229, 232, 108],
    [219, 223, 107],
    [208, 214, 106],
    [198, 206, 105],
    [188, 197, 103],
    [177, 188, 102],
    [167, 179, 101],
    [156, 170, 100],
    [146, 161, 99],
    [136, 152, 98],
    [125, 143, 97],
    [115, 134, 96],
    [104, 125, 95],
    [94, 117, 94],
    [84, 108, 92],
    [73, 99, 91],
    [63, 90, 90],
    [52, 81, 89],
    [42, 72, 88],
];

const rgbArrayToString = (rgbArray) => {
    return "rgb(" + rgbArray[0] + "," + rgbArray[1] + "," + rgbArray[2] + ")";
};

const colors = gradientColorSampleRGB;
const audioURL = "https://ia800106.us.archive.org/13/items/24-piano-keys/"; // beginning of the piano notes URL
const velocityEquation = (index) => (2 * Math.PI * (60 - index)) / 900; // 900s = 15min, until all circles realign
let startTime = new Date().getTime();

const paper = document.querySelector("#paper");
pen = paper.getContext("2d");
paper.onclick = () => {
    toggleFullscreen();
};

console.log(paper.clientWidth);

/* array of arcs with their color, key and velocity */
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
        rememberDistance: 0,
        arcHighlightIntensity: 0,
    };
});

/* main looping draw function */
const draw = () => {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000;

    /* update paper size */
    paper.width = paper.clientWidth;
    paper.height = paper.clientHeight;

    /* line at the base coordinates */
    const start = { x: paper.width * 0.1, y: paper.height * 0.9 };
    const end = { x: paper.width * 0.9, y: paper.height * 0.9 };
    const center = { x: paper.width * 0.5, y: paper.height * 0.9 };

    const length = end.x - start.x;
    const innerArcRadius = length * 0.05;
    /**
     * First we determin the space that is left between the inner arc and the end of the baseline
     * then we divide that leftover space by the amount of acrs that need to be drawn
     */
    const spacing = (length / 2 - innerArcRadius) / arcs.length;
    const maxAngle = 2 * Math.PI;

    pen.strokeStyle = "white";
    pen.lineWidth = 6;

    /** baseline */
    pen.beginPath();
    pen.moveTo(start.x, start.y);
    pen.lineTo(end.x, end.y);
    pen.stroke();

    arcs.forEach((arc, index) => {
        const arcRadius = innerArcRadius + index * spacing;

        /**
         * distance grows and grows with the growth of elapsed time
         * so it's always reduced by maxAngle, which is 2*Pi, meaning on rotation to the right and back
         * then, if that new distance, between 0 and 2*Pi is smaller than Pi, we find ourselfs going to the right
         * then we turn around going back to the left when it's bigger than Pi
         */
        const distance = Math.PI + elapsedTime * arc.velocity;
        modDistance = distance % maxAngle;
        adjustedDistance = modDistance >= Math.PI ? modDistance : maxAngle - modDistance;

        const x = center.x + arcRadius * Math.cos(adjustedDistance);
        const y = center.y + arcRadius * Math.sin(adjustedDistance);

        /** audio */
        /**
         * TODO:
         * currently the circles are colored white for one frame and their original rgb color in the others
         * the prefered way is to have it colored white and then fade back to the original color within the following 10 to 20 or so frames
         *
         * also, these nested ifs might be reorganised to be more readable and also just make more sense in general
         */
        if (document.visibilityState === "visible") {
            if (distance % Math.PI < arc.rememberDistance) {
                pen.strokeStyle = "white";
                arc.audio.playbackRate = 2.0;
                arc.audio.play();
            } else {
                pen.strokeStyle = rgbArrayToString(arc.color);
            }
        }
        arc.rememberDistance = distance % Math.PI;

        /** colorful arcs */
        pen.beginPath();
        // pen.strokeStyle = rgbArrayToString(arc.color);
        pen.arc(center.x, center.y, arcRadius, Math.PI, Math.PI * 2);
        pen.stroke();

        /** white circle */
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

/** next steps
 * 1. add audio at correct time
 * 2. maybe change keys or scale of notes (https://www.musictheory.net/lessons/21)
 */
