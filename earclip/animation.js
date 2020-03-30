
function findEars(){
  for(var i = 0; i < n; ++i){
    ear[i] = diagonal((i-1+n)%n,(i+1)%n);
    if(ear[i]) puntas[(i-1+n)%n] = (i+1)%n;
    else puntas[(i-1+n)%n] = n - 1;
  }
}
function printstep(){
  strokeWeight(0.1);
  stroke(255);
  textSize(32);
  fill(255);
  text(sdone, width - 15*(sdone.length), height - 40);
}
function showdiag(){
  stroke(random(255),random(255),random(255));
  if(diags.length > 0){
    id1 = diags[diags.length - 1];
    id2 = diags[diags.length - 2];
    line(P[id1].x*ex, P[id1].y*ey, P[id2].x*ex, P[id2].y*ey);
    diags.pop();
    diags.pop();
  }
}
function showears(){
  stroke(180,25,25);
  line(P[(s1-1+n)%n].x*ex, P[(s1-1+n)%n].y*ey, P[(s1+1)%n].x*ex, P[(s1+1)%n].y*ey);
  
  if(ear[s1] == -1) 
    ear[s1] = diagonal((s1-1+n)%n,(s1+1)%n);
  if(delta) 
    showdiag();
  
  stroke(255);
  for(var i = 0; i <= s1 - (diagonal.length > 0); ++i){
    if(ear[i] == true){
      var pr = (i-1+n)%n;
      var nx = (i+1)%n;
      line(P[pr].x*ex,P[pr].y*ey,P[nx].x*ex,P[nx].y*ey);
    }
  }
}
function showtriangulation(){
  if(naux == 0){ 
    stroke(0);
    fill(random(255),random(255),random(255));
  }
  else fill(0);
  var p1,p2,p3,id;
  for(var i = 0; i < ears_draw.length; i+=3){
    p1 = ears_draw[i];
    p2 = ears_draw[i+1];
    p3 = ears_draw[i+2];
    triangle(p1.x*ex,p1.y*ey,p2.x*ex,p2.y*ey,p3.x*ex,p3.y*ey);
  }
  up_ears();
}
function up_ears(){
  if(probar >= 0){
    stroke(180,25,25);
    if(probar < 2){
      p1 = prb[probar][0];
      p2 = prb[probar][1];
      line(p1.x*ex,p1.y*ey,p2.x*ex,p2.y*ey);
      showdiag();
      if(diags.length == stop){
        probar--;
        stop = 0; 
      }
    }
    else probar--;
  }
  fill(255);
  stroke(255);
  for(i = 0; i < naux; ++i)
    if(ear[i]) circle(P[i].x*ex, P[i].y*ey,10);
}
