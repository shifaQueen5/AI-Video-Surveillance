objects = [];
status1 = "";

function preload(){
    video = createVideo("video.mp4");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.position(375,200);
    video.hide();
}
function draw(){
    image(video,0,0,600,500);
    if(status1 != ""){
        objectDetector.detect(video,gotResults);
        console.log("Length"+objects.length);
        if(objects.length>0){
            document.getElementById("status").innerHTML= "Status : Object Detected";
            document.getElementById("num_of_objects").innerHTML= "Number of objects: "+ objects.length;
            for(i = 0 ; i<objects.length; i++){
                confidence = floor(objects[i].confidence*100);
                x = objects[i].x;
                y = objects[i].y;
                label = objects[i].label;
                width = objects[i].width;
                height = objects[i].height;
                fill("#ff0000")
                text(label + " "+ confidence+"%",x+15,y+15);
                noFill();
                stroke("#ff0000");
                rect(x,y,width,height);
            }
        }
    }
}
function gotResults(error,results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model is Loaded!");
    video.loop();
    video.speed(1);
    video.volume(0);
    status1 = true;
}
