var button,slider,dropzone;
function setup() {
  createCanvas(600, 600);
  
  button = createButton("start");
  button.style('background-color', '#27E7EA')
  button.style('border-radius','20px');
  button.style('border','none');
  button.style('font-family','arial');
  button.style('font-size','18px');
  button.style('margin-left', '40px');
  button.mousePressed(stop_it);
  
  slider = createSlider(1,20,3);
  
  dropzone = select('#dropzone');
  dropzone.dragOver(load_points);
  dropzone.dragLeave(unhigh);
  dropzone.drop(gotFile,unhigh);
}
function gotFile(file){
  
  txt = file.data.split("\n").filter(function (el) { return el != "";});
  if(ok == 0){ 
    var upl = confirm("You are going to upload '" + 
                      file.name + "', is that okay?"); 
    if(upl == true){ 
      if(txt.length < 4) alert("You need at least 4 vertices");
      else init();
    }
  }
  else alert("Reload the page to try a new polygon");
}
function load_points(){
  dropzone.style('background-color', '#ccc');
}
function unhigh(){
  dropzone.style('background-color', '#fff');
}
function camera_things(){
  scale(1, -1);
  translate(0, -height);
  translate(width/2, height/2);
  translate(movx, movy);
  strokeWeight(2);
}
function draw() {
  frameRate(slider.value());
  background(0);
  stroke(255);
  printstep();
  camera_things();
  for(var i = 0; i < n; ++i){  
    var j = (i+1)%n;
    line(Paux[i].x*ex,Paux[i].y*ey,Paux[j].x*ex,Paux[j].y*ey);
  }
  if(s1 != -1)
    animar();
}
function animar(){
  if(s1 < n){ 
    sdone = "find ears of the polygon";
    showears();
    if(diags.length == 0) s1++;
  }
  else{ 
    if(naux > 0 ) sdone = "triangulation by removing ears";
    else sdone = "triangulation done!";
    triangulacion();
  }
}
function stop_it(){
  if(s1 == -1){ 
    if(ok == 0){
      button.html("play");
      txt = normal;
      init();
    }
    else{ 
      button.html("pause");
      s1 = 0;
    }
  }
  else if(delta == 1){ 
    delta = 0;
    button.html("play");
  }
  else{ 
    delta = 1;
    button.html("pause");
  }
}
function keyPressed() {
  if (keyCode === LEFT_ARROW)
    movx-=5;   
  else if (keyCode === RIGHT_ARROW)
    movx+=5;
  else if (keyCode === UP_ARROW)
    movy+=5;   
  else if (keyCode === DOWN_ARROW)
    movy-=5;
  else if (keyCode == 65 || keyCode == 97)
    ex++, ey++;
  else if (keyCode == 115 || keyCode == 83)
    ex--, ey--;
}
