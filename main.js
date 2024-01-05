/**
 * TODO:
 *
 * - switch gradients with keyboard press (maybe f for "Farbe") (done)
 * - find more beautiful sound, piano sounds a little harsh (done)
 * - the baseline is still very white and can clash with the tranquility of the rest of the picture (done)
 *
 * - add more gradients (2 more, if possible with more variation to the ones that already exist)
 * - make modal prettier (different font, maybe a drop shadow, some layout tweaks potentially)
 * - make a function that filters the sounds to contain only major keys (https://www.piano-keyboard-guide.com/piano-music-scales.html)
 *
 * better sounds:
 * https://freesound.org/search/?f=grouping_pack:%2223108_Celesta%22&s=Date+added+(newest+first)&g=1
 * https://freesound.org/search/?f=grouping_pack:%221142_Chimes%2C%20no%20delay%22&s=Date+added+(newest+first)&g=1
 * https://freesound.org/search/?f=grouping_pack:%2212247_metallophone%22&s=Date+added+(newest+first)&g=1
 * https://freesound.org/people/Carlos_Vaquero/packs/9528/
 *
 */

const gradientColorSampleRGB = [
    /* https://colordesigner.io/gradient-generator
     * https://uigradients.com
     */
    // green-yellow-turquoise gradient
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
    // sunset gradient
    [
        [245, 98, 25],
        [233, 97, 29],
        [222, 95, 33],
        [210, 94, 37],
        [198, 93, 41],
        [187, 91, 45],
        [175, 90, 49],
        [163, 89, 53],
        [151, 87, 57],
        [140, 86, 61],
        [128, 85, 66],
        [116, 83, 70],
        [105, 82, 74],
        [93, 80, 78],
        [81, 79, 82],
        [70, 78, 86],
        [58, 76, 90],
        [46, 75, 94],
        [34, 74, 98],
        [23, 72, 102],
        [11, 71, 106],
    ],
    // sweet morning gradient
    [
        [255, 97, 110],
        [255, 102, 110],
        [255, 107, 110],
        [255, 112, 110],
        [255, 117, 110],
        [255, 122, 111],
        [255, 126, 111],
        [255, 131, 111],
        [255, 136, 111],
        [255, 141, 111],
        [255, 146, 111],
        [255, 151, 111],
        [255, 156, 111],
        [255, 161, 111],
        [255, 166, 111],
        [255, 171, 112],
        [255, 175, 112],
        [255, 180, 112],
        [255, 185, 112],
        [255, 190, 112],
        [255, 195, 112],
    ],
    // forest
    [
        [89, 62, 54],
        [87, 65, 55],
        [85, 68, 55],
        [82, 71, 56],
        [80, 73, 57],
        [78, 76, 58],
        [76, 79, 58],
        [73, 82, 59],
        [71, 85, 60],
        [69, 88, 60],
        [67, 91, 61],
        [64, 93, 62],
        [62, 96, 62],
        [60, 99, 63],
        [58, 102, 64],
        [55, 105, 65],
        [53, 108, 65],
        [51, 110, 66],
        [49, 113, 67],
        [46, 116, 67],
        [44, 119, 68],
    ],
    // dolphins
    [
        [78, 161, 177],
        [85, 161, 171],
        [91, 161, 165],
        [98, 160, 159],
        [105, 160, 152],
        [111, 160, 146],
        [118, 160, 140],
        [125, 159, 134],
        [131, 159, 128],
        [138, 159, 122],
        [145, 159, 116],
        [151, 158, 109],
        [158, 158, 103],
        [164, 158, 97],
        [171, 158, 91],
        [178, 157, 85],
        [184, 157, 79],
        [191, 157, 72],
        [198, 157, 66],
        [204, 156, 60],
        [211, 156, 54],
    ],
];

const soundSamplesURL = [
    // piano keys
    [
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key01.mp3", // F3
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key02.mp3", // F#3
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key03.mp3", // G3
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key04.mp3", // G#3
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key05.mp3", // A3
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key06.mp3", // A#3
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key07.mp3", // B3
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key08.mp3", // C4
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key09.mp3", // C#4
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key10.mp3", // D4
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key11.mp3", // D#4
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key12.mp3", // E4
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key13.mp3", // F4
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key14.mp3", // F#4
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key15.mp3", // G4
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key16.mp3", // G#4
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key17.mp3", // A4
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key18.mp3", // A#4
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key19.mp3", // B4
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key20.mp3", // C5
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key21.mp3", // C#5
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key22.mp3", // D5
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key23.mp3", // D#5
        "https://ia800106.us.archive.org/13/items/24-piano-keys/key24.mp3", // E5
    ],
    // celesta keys
    [
        /**
         * randomly off key
         * "https://cdn.freesound.org/previews/410/410655_394391-lq.mp3", // G2
         * "https://cdn.freesound.org/previews/410/410666_394391-lq.mp3", // G#2
         * "https://cdn.freesound.org/previews/410/410659_394391-lq.mp3", // A2
         * "https://cdn.freesound.org/previews/410/410678_394391-lq.mp3", // A#2
         * "https://cdn.freesound.org/previews/410/410663_394391-lq.mp3", // B2
         */
        "https://cdn.freesound.org/previews/410/410645_394391-lq.mp3", // C3
        "https://cdn.freesound.org/previews/410/410665_394391-lq.mp3", // C#3
        "https://cdn.freesound.org/previews/410/410634_394391-lq.mp3", // D3
        "https://cdn.freesound.org/previews/410/410642_394391-lq.mp3", // D#3
        "https://cdn.freesound.org/previews/410/410630_394391-lq.mp3", // E3
        "https://cdn.freesound.org/previews/410/410670_394391-lq.mp3", // F3
        "https://cdn.freesound.org/previews/410/410638_394391-lq.mp3", // F#3
        "https://cdn.freesound.org/previews/410/410652_394391-lq.mp3", // G3
        "https://cdn.freesound.org/previews/410/410675_394391-lq.mp3", // G#3
        "https://cdn.freesound.org/previews/410/410656_394391-lq.mp3", // A3
        "https://cdn.freesound.org/previews/410/410677_394391-lq.mp3", // A#3
        "https://cdn.freesound.org/previews/410/410660_394391-lq.mp3", // B3
        "https://cdn.freesound.org/previews/410/410641_394391-lq.mp3", // C4
        "https://cdn.freesound.org/previews/413/413761_394391-lq.mp3", // C#4
        "https://cdn.freesound.org/previews/410/410635_394391-lq.mp3", // D4
        "https://cdn.freesound.org/previews/410/410648_394391-lq.mp3", // D#4
        "https://cdn.freesound.org/previews/410/410631_394391-lq.mp3", // E4
        "https://cdn.freesound.org/previews/410/410669_394391-lq.mp3", // F4
        "https://cdn.freesound.org/previews/410/410673_394391-lq.mp3", // F#4
        "https://cdn.freesound.org/previews/410/410653_394391-lq.mp3", // G4
        "https://cdn.freesound.org/previews/410/410674_394391-lq.mp3", // G#4
        "https://cdn.freesound.org/previews/410/410657_394391-lq.mp3", // A4
        "https://cdn.freesound.org/previews/410/410676_394391-lq.mp3", // A#4
        "https://cdn.freesound.org/previews/410/410661_394391-lq.mp3", // B4
        "https://cdn.freesound.org/previews/410/410640_394391-lq.mp3", // C5
        "https://cdn.freesound.org/previews/410/410644_394391-lq.mp3", // C#5
        "https://cdn.freesound.org/previews/410/410636_394391-lq.mp3", // D5
        "https://cdn.freesound.org/previews/410/410647_394391-lq.mp3", // D#5
        "https://cdn.freesound.org/previews/410/410632_394391-lq.mp3", // E5
        "https://cdn.freesound.org/previews/410/410668_394391-lq.mp3", // F5
        "https://cdn.freesound.org/previews/410/410672_394391-lq.mp3", // F#5
        "https://cdn.freesound.org/previews/410/410649_394391-lq.mp3", // G5
        "https://cdn.freesound.org/previews/410/410654_394391-lq.mp3", // G#5
        "https://cdn.freesound.org/previews/410/410662_394391-lq.mp3", // A5
        "https://cdn.freesound.org/previews/410/410658_394391-lq.mp3", // A#5
        "https://cdn.freesound.org/previews/410/410664_394391-lq.mp3", // B5
        "https://cdn.freesound.org/previews/410/410643_394391-lq.mp3", // C6
        "https://cdn.freesound.org/previews/410/410646_394391-lq.mp3", // C#6
        "https://cdn.freesound.org/previews/410/410629_394391-lq.mp3", // D6
        "https://cdn.freesound.org/previews/410/410633_394391-lq.mp3", // D#6
        "https://cdn.freesound.org/previews/410/410637_394391-lq.mp3", // E6
        "https://cdn.freesound.org/previews/410/410667_394391-lq.mp3", // F6
        "https://cdn.freesound.org/previews/410/410671_394391-lq.mp3", // F#6
        "https://cdn.freesound.org/previews/410/410651_394391-lq.mp3", // G6
    ],
];

const paper = document.querySelector("#paper");
pen = paper.getContext("2d");

var startTime = new Date().getTime();
var soundMuted = false;

var selectedGradient = 0;
var colors = gradientColorSampleRGB[selectedGradient];
var selectedSound = 1;
var sounds = soundSamplesURL[selectedSound];

const white = [255, 255, 255];
const whiteIntensity = 20; // 0 (original color) to 20 (white)
const fadingFrames = 50; // 1 (ein Frame weiß) to e.g. 40 (40 Frames fade oud) or more

const arcs = colors.map((color, index) => {
    return {
        color: color,
        audio: new Audio(sounds[index]),
        velocity: (2 * Math.PI * (60 - index)) / 900, // 900s = 15min, until all circles realign
        traveledDistance: 0,
        highlightIntensity: 0, // zwischen 0 (Ursprungsfarbe) und 20 (weiß)
    };
});

document.addEventListener("keydown", (event) => {
    event.preventDefault();
    switch (event.key) {
        case "g":
            colors = gradientColorSampleRGB[++selectedGradient % gradientColorSampleRGB.length];
            arcs.forEach((arc, index) => {
                arc.color = colors[index];
            });
            break;
        case "h":
            colors = gradientColorSampleRGB[--selectedGradient % gradientColorSampleRGB.length];
            arcs.forEach((arc, index) => {
                arc.color = colors[index];
            });
            break;
        case "f":
            toggleFullscreen();
            break;
        case "m":
            soundMuted = !soundMuted;
            break;
    }
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
    const center = { x: paper.width * 0.5, y: paper.height * 0.9 - 3 }; // -3 to compensate for the baseline width

    const length = end.x - start.x;
    const innerArcRadius = length * 0.05;
    const spacing = (length / 2 - innerArcRadius) / (arcs.length - 0.5); // (space that is left between the inner arc and the end of the baseline) / (amount of arcs that need to be drawn (minus 0.5 so the outer most is drwan closer to the edge))
    const maxAngle = 2 * Math.PI;

    /** baseline */
    pen.strokeStyle = rgbArrayToString(colors[colors.length - 1]);
    pen.lineWidth = 6;
    pen.lineCap = "round";
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

        // acr.travelDistance slowly grows from 0 to the value of Pi and then from 0 again. This jump to 0 is caught by the if statement
        if (distance % Math.PI < arc.traveledDistance) {
            if (document.visibilityState === "visible" && !soundMuted) {
                arc.highlightIntensity = whiteIntensity;
                arc.audio.playbackRate = 2.0;
                window.playResult = arc.audio.play();
                playResult.catch((e) => {
                    window.playResultError = e;
                });
            }
        }

        /** colorful arcs */
        pen.beginPath();
        pen.lineCap = "butt";
        pen.strokeStyle = rgbArrayToString(addWhiteToRGB(arc.color, arc.highlightIntensity));
        pen.arc(center.x, center.y, arcRadius, Math.PI, Math.PI * 2);
        pen.stroke();

        /** white circle */
        pen.fillStyle = "white";
        pen.beginPath();
        pen.arc(x, y, length * 0.0065, 0, Math.PI * 2);
        pen.fill();

        /** remember distance & decrease intensity to achive fadeout*/
        arc.highlightIntensity = Math.max(0, arc.highlightIntensity - whiteIntensity / fadingFrames);
        arc.traveledDistance = distance % Math.PI;
    });

    requestAnimationFrame(draw);
};

// draw();

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

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const startUpModal = () => {
    modal.style.display = "block";
};

startUpModal();

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    startTime = new Date().getTime();
    draw();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        startTime = new Date().getTime();
        draw();
    }
};
