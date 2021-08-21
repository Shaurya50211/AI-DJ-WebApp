song = "";
LeftWristX = 0;
RightWristX = 0;
RightWristY = 0;
LeftWristY = 0;
ScoreLeftWrist = 0;
ScoreRightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.position(500, 250);

    video = createCapture(500, 400);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet initilized!");
}

function draw() {
    image(video, 0, 0, 500, 400);
    fill("#FF0000");
    noStroke();

    if (ScoreRightWrist > 0.2) {
        circle(RightWristX, RightWristY, 20);
        if (RightWristY > 0 && RightWristY <= 80) {
            document.getElementById("Speed").innerHTML = "Speed: 0.5x";
            song.rate(0.5);
        } else if (RightWristY > 80 && RightWristY <= 160) {
            document.getElementById("Speed").innerHTML = "Speed: 1x";
            song.rate(1);
        } else if (RightWristY > 160 && RightWristY <= 240) {
            document.getElementById("Speed").innerHTML = "Speed: 1.5x";
            song.rate(1.5);
        } else if (RightWristY > 240 && RightWristY <= 320) {
            document.getElementById("Speed").innerHTML = "Speed: 2x";
            song.rate(2);
        } else if (RightWristY > 320 && RightWristY <= 400) {
            document.getElementById("Speed").innerHTML = "Speed: 2.5x";
            song.rate(2.5);
        }
    }

    if (ScoreLeftWrist > 0.2) {
        circle(LeftWristX, LeftWristY, 20);

        StringToNumber = Number(LeftWristY);
        RemovedDecimals = floor(StringToNumber);
        Volume = RemovedDecimals / 400;
        song.setVolume(Volume);
        document.getElementById("volume").innerHTML = "Volume: " + Volume;
    }
}

function play() {
    song.play();
    song.rate(1);
    song.setVolume(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist's X value is " + LeftWristX + " and Left Wrist's Y value is " + LeftWristY);
        console.log("Right Wrist's X value is " + RightWristX + " and Right Wrist's Y value is " + RightWristY);
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(ScoreLeftWrist);

    }
}