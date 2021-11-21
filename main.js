status = "";
objects = [];

function setup()
{
    canvas = createCanvas(370, 370);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(width, height);
}
function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        for(i = 0;i < objects.length;i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " ", percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modeLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    INPUT_VALUE = document.getElementById("input_").value;

    if(objects.label == INPUT_VALUE)
    {
        video.stop()
        objectDetector.detect(gotResult);
        document.getElementById("found").innerHTML = INPUT_VALUE + "FOUND";
        var synth = window.speechSynthesis;

        function SpeechSynthesisUtterance()
        {
            var utterThis = new SpeechSynthesisUtterance(INPUT_VALUE + "is found");
        }
    }else {
        document.getElementById("status").innerHTML = "Status: Object mentioned not found";
    }
}

function modeLoaded()
{
    console.log("MODEL LOADED");
    status = true;
}


function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}