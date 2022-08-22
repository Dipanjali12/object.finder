img = "";
status = "";
objectDetector = "";
objects = [];
sound="";

function setup() {
    canvas = createCanvas(550, 350);
    canvas.center();
   video=createCapture(VIDEO);
video.hide();
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object "
}

function draw() {
    image(video, 0, 0, 550, 350);
    if (status) {
        if (objects[0].label==document.getElementById("object").value){
            sound.play();
        }
        for(var i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML = "Status : Object  Detected"
        fill("red");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%", objects[i].x+10, objects[i].y+10);
        noFill();
        stroke("red");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function preload(){
sound=loadSound("music.mp3")
}


function modelLoaded() {
    console.log("modelLoaded");
    objectDetector.detect(img, gotResult);

}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        status = true;
        console.log(result);
        objects = result;
    }
}