function setup() {
    createCanvas(innerWidth, innerHeight);
}

let previewLevel = 0;
let no = 0;
let globalEditZoom = 1.0;

let zoomConstraints = {
    edit:[0.1, 2]
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
        
        console.log(1 / globalEditZoom);
        translate(width / 2, height / 2);
        
        scale(1/globalEditZoom * height / 400);
        
        for(let yInd = 0; yInd < 20; yInd ++) {
            for(let xInd = 0; xInd < 20; xInd ++ ) {
                rect((xInd - 10) * 20, (yInd - 10) * 20, 20, 20)
            }
        }
        
        scale(globalEditZoom * 400 / height);
    }
    
    translate(width / 2, height / 2)
    text("Zoom: " + (1/globalEditZoom * 100 + "").substr(0, 5) + "%", -80, -5)
}

function editDraw(levelObject, type, pallete, objectsObject){
    
}

function levelDrawWebGL(levelObject, type, pallete, objectsObject){
    
}







function mouseWheel(event) {
    globalEditZoom += globalEditZoom * 0.0004 * event.delta; 
    globalEditZoom = constrain(globalEditZoom, zoomConstraints.edit[0], zoomConstraints.edit[1]);
    return false;
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