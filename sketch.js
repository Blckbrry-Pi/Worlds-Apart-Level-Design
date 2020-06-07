let previewLevel = 0;
let globalEditZoom = 1.0;

let zoomConstraints = {
    edit:[0.1, 2]
}

let scaleAmount = 0;
let translationAmount;

let editOffsetX = 0;
let editOffsetY = 0;

function setup() {
    createCanvas(innerWidth, innerHeight);
    translationAmount = createVector(40, 50);
}

function draw() {
    createCanvas(innerWidth, innerHeight);
    frameRate(30);
    background(255);
    
    if (previewLevel) {
        levelDraw()
    } else {
        //cookiesEncode("test123456, my face hurts");
        //console.log(cookiesGet());
        
        translationAmount.x = width / 2;
        translationAmount.y = height / 2
        translate(translationAmount.x, translationAmount.y);
        scaleAmount = height / (400 * globalEditZoom);
        scale(scaleAmount);
        translate(editOffsetX, editOffsetY);
        for(let yInd = 0; yInd < 20; yInd ++) {
            for(let xInd = 0; xInd < 20; xInd ++ ) {
                rect((xInd - 10) * 20, (yInd - 10) * 20, 20, 20)
            }
        }
        
        translate(-editOffsetX, -editOffsetY);
        scale(1/scaleAmount);
        translate(-translationAmount.x, -translationAmount.y);
    }
    
    text("Zoom: " + (1/globalEditZoom * 100 + "").substr(0, 5) + "%", width - 80, height - 5);
}

function editDraw(levelObject, type, pallete, objectsObject){
    
}

function levelDrawWebGL(levelObject, type, pallete, objectsObject){
    
}







function mouseWheel(event) {
    globalEditZoom += globalEditZoom * 0.0005 * event.delta; 
    globalEditZoom = constrain(globalEditZoom, zoomConstraints.edit[0], zoomConstraints.edit[1]);
    return false;
}



function mouseDragged(event) {
    scaleAmount = height / (400 * globalEditZoom);
    editOffsetX += event.movementX / scaleAmount;
    editOffsetY += event.movementY / scaleAmount;
    editOffsetX = constrain(editOffsetX, -190, 190)
    editOffsetY = constrain(editOffsetY, -190, 190)
    return(false);
}










function cookiesEncode(levelString){
    encodedString = encodeURIComponent(levelString);
    document.cookie = "levelAutosave1=" + encodedString;
    document.cookie = "levelAutosave2=" + encodedString;
}

function cookiesGet(){
    let outputArray = [];
    let cookieString = decodeURIComponent(document.cookie) + ";";
    
    let cookieIndex = cookieString.indexOf("levelAutosave1=");
    if(cookieIndex > -1){
        outputArray.push(  cookieString.substring(cookieIndex + "levelAutosave1".length + 1, cookieString.indexOf(";", cookieIndex))  );
    } else {
        outputArray.push("");
    }
    
    
    cookieIndex = cookieString.indexOf("levelAutosave2=");
    if(cookieIndex > -1){
        outputArray.push(cookieString.substring(cookieIndex + "levelAutosave2".length + 1, cookieString.indexOf(";", cookieIndex)));
    } else {
        outputArray.push("");
    }
    
    return(outputArray);
}