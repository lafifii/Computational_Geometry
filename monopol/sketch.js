var start = 0, button, slider, txt, ex = 20, ey = 20;
var movx = -150, movy = -150, ml = 1;
function setup() {
  button = createButton("start");
  button.style('background-color', '#27E7EA')
  button.style('border-radius','20px');
  button.style('border','none');
  button.style('font-family','arial');
  button.style('font-size','18px');
  button.style('margin-left', '10px');
  button.style('margin-bottom', '10px');
  button.mousePressed(create);

  slider = createSlider(1,20,1);

  dropzone = select('#dropzone');
  dropzone.dragOver(load_points);
  dropzone.dragLeave(unhigh);
  dropzone.drop(gotFile,unhigh);

  createCanvas(500, 500);
  frameRate(1);
}
function load_points(){
  dropzone.style('background-color', '#ccc');
}
function unhigh(){
  dropzone.style('background-color', '#fff');
}
function gotFile(file){
  txt = file.data.split("\n").filter(function (el) { return el != "";});
  if(!start){
    init();
  }
  else alert("Reload the page to try a new set of points");
}
function linedash(x1, y1, x2, y2, delta, style = '-') {
  let distance = dist(x1,y1,x2,y2);
  let dashNumber = distance/delta;
  let xDelta = (x2-x1)/dashNumber;
  let yDelta = (y2-y1)/dashNumber;

  for (let i = 0; i < dashNumber; i+= 2) {
    let xi1 = i*xDelta + x1;
    let yi1 = i*yDelta + y1;
    let xi2 = (i+1)*xDelta + x1;
    let yi2 = (i+1)*yDelta + y1;

    if (style == '-') { line(xi1, yi1, xi2, yi2); }
    else if (style == '.') { point(xi1, yi1); }
    else if (style == 'o') { ellipse(xi1, yi1, delta/2); }
  }
}
function draw() {
  frameRate(slider.value()*ml);
  background(0);
  strokeWeight(0.5);
  stroke(255);
  textSize(20);
  fill(255);
  text("triangulation of y-monotone polygon", 10, height - 20);
  
  linedash(width/2,0,width/2,height,5);
  linedash(0,height/2,width,height/2,5);
  
  strokeWeight(1);
  fill(255);
  stroke(255);
  scale(1, -1);
  translate(0, -height);
  translate(width/2, height/2);
  translate(movx, movy);
  
  if(start && ii < n){
    triangulateMonotone();
    ii++;
  }
  var i;
  if(ii < n){
    for(i = 0; i < n; ++i){
      line(Pn[i].x*ex,Pn[i].y*ey,Pn[(i+1)%n].x*ex,Pn[(i+1)%n].y*ey);
    }
  }
  else{
    ml = 2;
    stroke(0);
    fill(random(255),random(255),random(255));
    beginShape();
    for(i = 0; i < n; ++i){
      vertex(Pn[i].x*ex,Pn[i].y*ey);
    }
    endShape();
  }
  for(i = 0; i < D.length; ++i){
    line(D[i].p1.x*ex, D[i].p1.y*ey, D[i].p2.x*ex, D[i].p2.y*ey);
  }
  stroke(0);
  for(i = 0; i < s.length && ii < n; ++i){
    fill(random(255),random(255),random(255));
    circle(s[i].x*ex, s[i].y*ey, 10);
  }
}
function create(){
  txt = ["1 2", "14 5", "12 12", "3 12", "1 10", "4 8", 
          "1 6", "2 4"];
  init();
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