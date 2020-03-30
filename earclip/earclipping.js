function init(){
  s1 = -1; nst = 0;
  probar = -1; stop = 0
  delta = 1; ii = 0;
  
  n = txt.length;
  naux = n;
  ear = new Array(n);
  for(var i = 0; i < n; ++i) ear[i] = -1;
  prb = new Array(4);
  for(i = 0; i < n; ++i){
    var aux = txt[i].split(" ");
    P.push({ x: parseInt(aux[0],10), y: parseInt(aux[1],10)})
    Paux.push(P[i]);
  }
  ok = 1;
}
function area2(a,b,c){
	return ((a.x - c.x) * (b.y - c.y)) - ((a.y - c.y) * (b.x - c.x));
}

function izquierdaOn(a,b,c){
	return area2(a,b,c) > 0;
}

function izquierda(a,b,c){
	return area2(a,b,c) >= 0;
}

function colinear(a,b,c){
	return area2(a,b,c) == 0; 
}

function entre(a,b,c){
	if(!colinear(a,b,c)) return false;
	else if(a.x != b.x)
		return (a.x <= c.x && c.x <= b.x) || (a.x >= c.x && c.x >= b.x);
	return (a.y <= c.y && c.y <= b.y) | (a.y >= c.y && c.y >= b.y);
}

function intersectaP(a,b,c,d){
	if(colinear(a,b,c) || colinear(a,b,d)) return false;
	if(colinear(c,d,a) || colinear(c,d,b)) return false;
	var e1 = izquierdaOn(a,b,c) ^ izquierdaOn(a,b,d);
	var e2 = izquierdaOn(c,d,a) ^ izquierdaOn(c,d,b);
	return (e1 && e2);
}

function intersecta(a,b,c,d){
	if(intersectaP(a,b,c,d)) return true;
	return (entre(a,b,c) || entre(a,b,d) || entre(c,d,a) || entre(c,d,b));
}

function incone(i,j){
	var u = ((i - 1)+ n)%n, w = (i + 1)%n;
	if(izquierda(P[u], P[i],P[w])) 
		return izquierdaOn(P[i],P[j],P[u]) && izquierdaOn(P[j],P[i],P[w]); 
	return !(izquierda(P[i],P[j],P[w]) && izquierda(P[j],P[i],P[u]));
}

function diagonal(i,j){
	for(var k = 0; k < n; ++k){      
		var l = (k + 1)%n;
		if(k == i || k == j) continue;
		if(l == i || l == j) continue;
        
        diags.push(k);
        diags.push(l);
      
		if(intersecta(P[i],P[j],P[k],P[l]))
			return false;
	}
	return incone(i,j) && incone(j,i);
}


function triangulacion(){ 
  if(probar < 0){
    if(naux == 3){
      ears_draw.push(P[0]);
      ears_draw.push(P[1]);
      ears_draw.push(P[2]);
      naux = 0;
    }
    else if(naux > 3){
      for(; ear[ii] == 0; ++ii){} 
      ears_draw.push(P[(ii-1+naux)%naux]);
      ears_draw.push(P[ii]);
      ears_draw.push(P[(ii+1)%naux]);

      for(var j = ii + 1; j < naux; ++j){ 
        ear[j - 1] = ear[j];
        P[j - 1] = P[j];
      }
      naux--;
      var id1 = (ii-1+naux)%naux, id2 = (ii+1)%naux;
      var id4 = (ii-2+naux)%naux;

      // add orejas a probar

      ear[ii] = diagonal((ii-1+naux)%naux, (ii + 1)%naux);
      stop = diags.length;
      ear[(ii-1+naux)%naux] = diagonal((ii-2+naux)%naux, ii);

      prb[0] = [ P[(ii-1+naux)%naux],P[(ii + 1)%naux] ];
      prb[1] = [ P[(ii-2+naux)%naux], P[ii] ];
      probar = 3;
    }
}
  showtriangulation();
}
