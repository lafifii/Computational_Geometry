class Box{
  constructor(x,y,h,w,dr,txt,c){
    this.x = x;
    this.y = y;
    this.h = h;
    this.dr = dr;
    this.txt = txt;
    this.w = textWidth(this.txt)
    this.c = c;
    this.pressed = 0;
  }
  clicked(){
    var x = mouseX - width/2;
    var y = mouseY - height/2;
    if(abs(this.x - x) < this.w &&abs(this.y - y) < this.h){
      window.open(this.dr);
      return true;
    }
    return false;  
  }
  mouseOver(){
    var x = mouseX - width/2;
    var y = mouseY - height/2;
    if(abs(this.x - x) < this.w &&abs(this.y - y) < this.h){
      this.pressed = 1;
    }
    else this.pressed = 0;
  }
  show(){
    this.mouseOver();
    beginShape(QUADS);
    if(this.pressed) fill('#ED0A3F');
    else fill(this.c);
    
    stroke(0);
    vertex(this.x - this.w, this.y - this.h);
    vertex(this.x + this.w, this.y - this.h);
    vertex(this.x + this.w, this.y + this.h);
    vertex(this.x - this.w, this.y + this.h);
    endShape(CLOSE);
    
    strokeWeight(1);
    fill('black');
    
    
    textSize(30);
    text(this.txt, this.x - this.w/2, this.y + 5);
  }
}