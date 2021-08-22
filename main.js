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
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        ScoreRightWrist = results[0].pose.keypoints[10].score;
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    noStroke();
    if (ScoreRightWrist > 0.2) {
        circle(RightWristX, RightWristY, 20);
        if (RightWristY > 0 && RightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed: 0.5x";
            song.rate(0.5);
        } else if (RightWristY > 100 && RightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed: 1x";
            song.rate(1);
        } else if (RightWristY > 200 && RightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed: 1.5x";
            song.rate(1.5);
        } else if (RightWristY > 300 && RightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed: 2x";
            song.rate(2);
        } else if (RightWristY > 400) {
            document.getElementById("speed").innerHTML = "Speed: 2.5x";
            song.rate(2.5);
        }
    }

    if (ScoreLeftWrist > 0.2) {
        circle(LeftWristX, LeftWristY, 20);
        StringToNumber = Number(LeftWristY);
        RemovedDecimals = floor(StringToNumber);
        Volume = RemovedDecimals / 500;
        song.setVolume(Volume);
        document.getElementById("volume").innerHTML = "Volume: " + Volume;
    }
}

function modelLoaded() {
    console.log("Model Successfully Loaded!");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}