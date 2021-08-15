song = "";
LeftWristX = 0;
RightWristX = 0;
RightWristY = 0;
LeftWristY = 0;
ScoreLeftWrist = 0;

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
        console.log(ScoreLeftWrist);

    }
}