function sweepline(){
  if(ii < n){
    if(best_dist != oo){
      noStroke();
      fill(20,20,180,50);
      beginShape(QUADS);
      var caj = sqrt(best_dist);
      vertex(P[ii].x - caj,0);
      vertex(P[ii].x - caj,height);
      vertex(P[ii].x + caj,height);
      vertex(P[ii].x + caj,0);
      endShape(CLOSE);
      beginShape(QUADS);
      vertex(0,P[ii].y - caj);
      vertex(width, P[ii].y - caj);
      vertex(width, P[ii].y + caj);
      vertex(0,P[ii].y + caj);
      endShape(CLOSE);
    }

    if(lines_p.length == 0){
      var d = ceil(sqrt(best_dist));
      while(jj < n && P[ii].x - P[jj].x >= best_dist) {
        delete_s(P[jj].y,P[jj].x);
        change_s();
        jj++;
      }
      var op = candidates(P[ii].y,P[ii].x,d);
      for (var it = 0; it < op.length; ++it) {
        var dx = P[ii].x - op[it].y;
        var dy = P[ii].y - op[it].x;

        lines_p.push(P[ii].x);
        lines_p.push(P[ii].y);
        lines_p.push(op[it].y);
        lines_p.push(op[it].x);

        if(dx * dx + dy * dy < best_dist){
          best_dist = dx * dx + dy * dy;
          rpt[0] = P[ii].x;
          rpt[1] = P[ii].y;
          rpt[2] = op[it].y;
          rpt[3] = op[it].x;
        }
      }
      s.add({x: P[ii].y, y: P[ii].x}); change_s();
      ++ii;
    }
  }
}
function change_s(){
  var saux = Array.from(s);
  saux.sort(cmp);
  s = new Set(saux);
}
function delete_s(xx,yy){
  var saux = Array.from(s), id = -1;
  for(var i = 0; i < saux.length; ++i){
    if(saux[i].x == xx && saux[i].y == yy){
      id = i;
      break;
    }
  }
  if(id != -1){
    for(var j = id; j < saux.length - 1; ++j)
      saux[j] = saux[j + 1];
    saux.pop();
  }
  s = new Set(saux);
}
function candidates(yy,xx,d){
  var ok1 = 0, op = [];
  var saux = Array.from(s);
  for(var i = 0; i < saux.length; ++i){
    if(abs(saux[i].x - yy) < d && abs(saux[i].y - xx) < d ){
      op.push(saux[i]);
    }
  }
  return op;
}
function prepro(){
  P.sort(cmp);
  start = 1;
}
function cmp(a,b){
  if(a.x < b.x) return -1;
  if(a.x == b.x){
    if(a.y < b.y) return -1;
    else return 1;
  }
  return 1;
}
function create_points(){
  rpt = new Array(-1,-1,-1,-1);
  s = new Set();
  n = Math.floor(Math.random()*35) + 5;
  var x_, y_;
  for(var i = 0; i < n; i++){
    x_ = (Math.floor(Math.random()*35) + 5)*10;
    y_ = (Math.floor(Math.random()*35) + 5)*12;
    P.push({x:x_, y: y_});
  }
  prepro();
}
function load_file(){
  rpt = new Array(-1,-1,-1,-1);
  s = new Set();
  n = txt.length;
  for(i = 0; i < n; ++i){
    var aux = txt[i].split(" ");
    P.push({x: parseInt(aux[0],10), y: parseInt(aux[1],10)});
  }
  prepro();
  start = 1;
}
