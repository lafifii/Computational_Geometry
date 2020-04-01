var stars = [], speed = 4;
var B = [], f;
var title = "Computational Geometry Algorithms";
function setup() {
  f = loadFont('CoderC.ttf');
  textFont(f);
  textSize(25);
  stars = new Array(800);
  for(var i = 0; i < stars.length; ++i){
    stars[i] = {x: random(-width,width), y : random(-height,height),
                z: random(0,width), pz: 1};
    stars[i].pz = stars[i].z;
  }
  createCanvas(windowWidth,windowHeight);
  B.push(new Box(0,height/40*3,height/40,width/20,'clos2d/index.html',"sweep line: closest points",'#FF6EFF'));
  B.push(new Box(0,0,height/40,width/20, 'earclip/index.html',"ear clipping triangulation",'#50BFE6'));
  B.push(new Box(0,height/40*6,height/40,width/20, 'monopol/index.html',"triangulation y-monotone polygon",'#EE34D2'));
  var mx = 0;
  for(i = 0; i < B.length; ++i) mx = max(mx, B[i].w);
  for(i = 0; i < B.length; ++i) B[i].w = mx*2;
}
function draw() {
  background(0);
  translate(width/2,height/2);
  showStars();
  textSize(42);
  fill('white');
  var sWidth = textWidth(title);
  text(title, -sWidth/2,-height/10);
  textSize(20);
  sWidth = textWidth("by fiorella barrientos");
  text("by fiorella barrientos", -sWidth/2,-height/17);
}
function showStars(){
  fill(255);
  // noprotect
  for(var i = 0; i < stars.length; ++i){
    var sx = map(stars[i].x/stars[i].z,0,1,0,width);
    var sy = map(stars[i].y/stars[i].z,0,1,0,height);
    var px = map(stars[i].x/stars[i].pz,0,1,0,width);
    var py = map(stars[i].y/stars[i].pz,0,1,0,height);
    var r = map(stars[i].z,0,width,16,0);
    stroke(80);
    strokeWeight(2);
    line(sx,sy,px,py);
  }
  updateStars();
  for(i = 0; i < B.length; ++i){
    B[i].show();
  }
}
function updateStars(){
  for(var i = 0; i < stars.length; ++i){
    stars[i].pz = stars[i].z;
    stars[i].z-=20;
    if(stars[i].z < 0){
      stars[i].z = random(0,width);
      stars[i].pz= stars[i].z;
      stars[i].x = random(-width,width);
      stars[i].y = random(-height,height);
    }
  }
}
function mousePressed(){
  for(var i = 0; i < B.length; ++i){
    if(B[i].clicked()){
      break;
    }
  }
}
