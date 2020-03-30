function setup() {

  button = createButton("start");
  button.style('background-color', '#27E7EA')
  button.style('border-radius','20px');
  button.style('border','none');
  button.style('font-family','arial');
  button.style('font-size','18px');
  button.style('margin-left', '10px');
  button.style('margin-bottom', '10px');
  button.mousePressed(animation);

  slider = createSlider(1,20,3);

  dropzone = select('#dropzone');
  dropzone.dragOver(load_points);
  dropzone.dragLeave(unhigh);
  dropzone.drop(gotFile,unhigh);

  createCanvas(500, 500);
  frameRate(3);
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
    load_file();
  }
  else alert("Reload the page to try a new set of points");
}
function animation(){
  if(!start) create_points();
}
function draw() {
  background(0);
  frameRate(slider.value());
  fill(255);
  printstep();
  scale(1, -1);
  translate(0, -height);

  if(start){
    strokeWeight(2);
    if(lines_p.length > 0){
      var lpl = lines_p.length;
      stroke('white');
      line(lines_p[lpl-4],lines_p[lpl-3],lines_p[lpl-2],lines_p[lpl-1]);
      lines_p.pop();
      lines_p.pop();
      lines_p.pop();
      lines_p.pop();
    }
    sweepline();
    stroke(random(255),random(255), random(255));
    line(rpt[0],rpt[1],rpt[2],rpt[3]);
    strokeWeight(1);
    stroke('black');
    fill('white');

    for(var i = 0; i < n; i++)
      circle(P[i].x,P[i].y,10);

    fill('red');
    circle(rpt[0],rpt[1],10);
    circle(rpt[2],rpt[3],10);
    stroke(255);

  }
}
function printstep(){
  strokeWeight(0.1);
  stroke(255);
  textSize(20);
  fill(255);
  if(best_dist == oo) text("best distance: inf", 10, height - 20);
  else text("best distance: " + sqrt(best_dist).toFixed(2), 10, height - 20);
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
