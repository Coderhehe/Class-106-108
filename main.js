prediction1="";
prediction2="";

Webcam.set({
width:350,
height:350,
image_format:'png',
png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function take(){
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML="<img id='capture' src="+data_uri+">";
});
}

console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Mm6eMOBT5/model.json",modelLoaded);
function modelLoaded() {
    console.log("Model Loaded!");
}
function speak() {
    synth=window.speechSynthesis;
    speak1="The First Prediction Is"+prediction1;
    speak2="And The Second Prediction Is"+prediction2;
utter=new SpeechSynthesisUtterance(speak1+speak2);
synth.speak(utter);
}

function pre() {
    img=document.getElementById("capture");
    classifier.classify(img,gotResult);
}

function gotResult(error,result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
document.getElementById("result_emotion_name").innerHTML=result[0].label;
document.getElementById("result_emotion_name2").innerHTML=result[1].label;
prediction1=result[0].label;
prediction2=result[1].label;
speak();
if (result[0].label=="happy") {
    document.getElementById("result_emotio_name").innerHTML="&#128522;";
}
if (result[0].label=="angry") {
    document.getElementById("result_emotio_name").innerHTML="&#128545;";
}
if (result[0].label=="sad") {
    document.getElementById("result_emotio_name").innerHTML="&#128546;";
}
if (result[1].label=="happy") {
    document.getElementById("result_emotio_name2").innerHTML="&#128522;";
}
if (result[1].label=="angry") {
    document.getElementById("result_emotio_name2").innerHTML="&#128545;";
}
if (result[1].label=="sad") {
    document.getElementById("result_emotio_name2").innerHTML="&#128546;";
}
    } 
}