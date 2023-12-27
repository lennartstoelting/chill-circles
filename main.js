const gradientColorSampleRGB = [
    /* https://colordesigner.io/gradient-generator */
    [
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
    ],
];

const paper = document.querySelector("#paper");
pen = paper.getContext("2d");
paper.onclick = () => {
    toggleFullscreen();
};

let startTime = new Date().getTime();

const colors = gradientColorSampleRGB[0];
const white = [255, 255, 255];
const whiteIntensity = 20; // 0 (original color) to 20 (white)
const fadingFrames = 20; // 1 (ein Frame weiß) to e.g. 40 (40 Frames fade oud) or more

const arcs = colors.map((color, index) => {
    return {
        color: color,
        audio: new Audio(
            "https://ia800106.us.archive.org/13/items/24-piano-keys/key" +
                Math.min(index + 1, 24)
                    .toString()
                    .padStart(2, "0") +
                ".mp3"
        ),
        velocity: (2 * Math.PI * (60 - index)) / 900, // 900s = 15min, until all circles realign
        traveledDistance: 0,
        highlightIntensity: 0, // zwischen 0 (Ursprungsfarbe) und 20 (weiß)
    };
});

const addWhiteToRGB = (rgb, whiteIntensity) => {
    return white.map((colorWhite, index) => {
        return Math.floor(((whiteIntensity / 10) * colorWhite + rgb[index]) / (whiteIntensity / 10 + 1));
    });
};

const rgbArrayToString = (rgbArray) => {
    return "rgb(" + rgbArray[0] + "," + rgbArray[1] + "," + rgbArray[2] + ")";
};

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

    /** baseline */
    pen.strokeStyle = "white";
    pen.lineWidth = 6;
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

        /** acr.travelDistance slowly grows from 0 to the value of Pi and then from 0 again. This jump to 0 is caught by the if statement*/
        if (distance % Math.PI < arc.traveledDistance) {
            arc.highlightIntensity = whiteIntensity;

            if (document.visibilityState === "visible") {
                arc.audio.playbackRate = 2.0;
                window.playResult = arc.audio.play();
                playResult.catch((e) => {
                    window.playResultError = e;
                });
            }
        }

        /** colorful arcs */
        pen.beginPath();
        pen.strokeStyle = rgbArrayToString(addWhiteToRGB(arc.color, arc.highlightIntensity));
        pen.arc(center.x, center.y, arcRadius, Math.PI, Math.PI * 2);
        pen.stroke();

        /** white circle */
        pen.fillStyle = "white";
        pen.beginPath();
        pen.arc(x, y, length * 0.0065, 0, Math.PI * 2);
        pen.fill();

        /** remember distance and decrease intensity */
        arc.highlightIntensity = Math.max(0, arc.highlightIntensity - whiteIntensity / fadingFrames);
        arc.traveledDistance = distance % Math.PI;
    });

    requestAnimationFrame(draw);
};

draw();

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
