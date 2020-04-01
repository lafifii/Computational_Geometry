var P = [], Pn = [], n = 0, s = [], D = [], ii = 2;
function dis(a,b){
	return sqrt((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y));
}
function angulo(a, b, c){
  var ab = point(b.x-a.x,b.y-a.y,0);
  var bc = point(c.x-b.x,c.y-b.y,0);
	
  var dotabbc = (ab.x * bc.x + ab.y * bc.y);
  var lenab = sqrt(ab.x * ab.x + ab.y * ab.y);
  var lenbc = sqrt(bc.x * bc.x + bc.y * bc.y);
  
  return Math.acos(dotabbc/(lenab*lenbc)) < Math.acos(-1);
}
function cmp(a, b){ 
  if(a.y == b.y){ 
    if(a.x < b.x) return -1;
    return 1;
  }
  if(a.y > b.y) return -1;
  return 1;
}
function ady(a,b){
	return (a.id + 1)%n == b.id || (b.id + 1)%n == a.id;
}
function init(){
  start = 1;
  n = txt.length;
  for(var i = 0; i < n; ++i){
    var aux = txt[i].split(" ");
    P.push({x:parseInt(aux[0],10),y:parseInt(aux[1],10),id: i});
    Pn.push(P[i]);
  }
  for(i = 0; i < n; ++i) P[i].id = i;
  P.sort(cmp);
  s.push(P[0]);
  s.push(P[1]);
}
function triangulateMonotone(){
  var a2 = ady(P[ii],s[0]);
  var a1 = ady(P[ii],s[s.length - 1]);
  if(a1 && !a2){
    while(s.length > 1){
	  var st = s[s.length - 1]; s.pop();
      var st1 = s[s.length - 1]; s.push(st);
      if(!angulo(P[ii],st,st1)) break;
	  s.pop();
      D.push({p1: P[ii], p2: st1});
    }
	s.push(P[ii]);
  }
  else if(!a1 && a2){
    var aux = s[s.length - 1];
    while(s.length > 1){
      D.push({p1:P[ii],p2:s[s.length - 1]});
      s.pop();
	}
	s.pop();
	s.push(aux);
	s.push(P[ii]);
  }
  else{
    s.pop();
	while(s.length > 2){
      D.push({p1:P[ii],p2:s[s.length - 1]});
      s.pop();
	}
  }
}