status = "";
bedroom = ""
objects = [];

function back(){
    window.location = "index.html";
}

function preload(){
    bedroom = loadImage("dining room.jpg");
}

function setup(){
    canvas = createCanvas(400, 400);
    canvas.position(475, 180);

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    status = true;
    objectDetector.detect(bedroom, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(bedroom, 0, 0, 400, 400);
    if(status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number").innerHTML = "There are 5 big objects in this image out of which COCOSSD model have guessed 4 objects";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}