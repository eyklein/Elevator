var elevator;
var ball;
var scalePix = 100; //pix/m
var timeScale=.1;
var elevatorOpacity
var fixxed=0
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  elevatorOpacity
  
  var sliderOpacity = createSlider(0, 100, 50);
  sliderOpacity.changed(function(){
    
    elevatorOpacity=sliderOpacity.value();
  })

  widthElevator = 1.5;
  heightElevator = 1.2;
  elevator = new PhysicalObject(
    null,
    createVector(width / 2 / scalePix, height / scalePix - heightElevator / 2), //pos
    createVector(0, -2), //vel
    createVector(0, 0), //acc
    elevatorDrawing
  )
  
  ball = new PhysicalObject(
    elevator,
    createVector(widthElevator / 2, heightElevator), //pos
    createVector(0, -4.24), //vel
    createVector(0, 9.8), //acc
    ballDrawing,
    heightElevator
  )

}

function draw() {
  if(frameRate()){
    background(0);
    elevator.update();
    elevator.display();
    
    ball.update()
    ball.display()
    //console.log(elevator.pos.y)
    if(elevator.pos.y<0){
      elevator.reset();
    }
  }
}



function PhysicalObject(_parent, _pos, _vel, _acc, _shapeCallback,_floor) {
  this.pos = _pos;
  
  this.vel = _vel;
  this.pvel = _vel;
  this.acc = _acc;
  this.parent = _parent;
  this.shape = _shapeCallback;
  this.myFloor=_floor;
  
  this.ipos = createVector(_pos.x,_pos.y);
  this.ivel = createVector(_vel.x,_vel.y);
  this.ipvel = createVector(_vel.x,_vel.y);
  this.iacc = createVector(_acc.x,_acc.y);
  
  
  
  
  this.getMaterPos=function(){
    if(this.parent==null){
      return this.pos;
    }else{
      var parentMasterPos=this.parent.getMaterPos();
      return createVector(this.pos.x+parentMasterPos.x,this.pos.y+parentMasterPos.y);
    }
  }
  this.getMaterVel=function(){
    if(this.parent==null){
      return this.vel;
    }else{
      var parentMasterVel=this.parent.getMaterVel();
      return createVector(this.vel.x+parentMasterVel.x,this.vel.y+parentMasterVel.y);
    }
  }
  
  this.reset=function(){
    this.pos = createVector(this.ipos.x,this.ipos.y);
    this.vel = createVector(this.ivel.x,this.ivel.y);
    this.pvel = createVector(this.ivel.x,this.ivel.y);
    this.acc = createVector(this.iacc.x,this.iacc.y);
    
    
    
    console.log(this.ipos)
    
  }
 
  this.update = function() {
    this.pvel=createVector(this.vel.x,this.vel.y);
    this.vel.y += this.acc.y / frameRate()*timeScale;
    this.pos.y += (this.vel.y +this.pvel.y)/2/ frameRate()*timeScale;
    
    this.bounce();
  }
  
  this.bounce = function(){
    if(this.pos.y>this.myFloor){
      this.vel.y=-abs(this.vel.y);
    }
  }
  
  this.display = function() {
    push()

    this.shape(this);
    pop();
    
    
  }
}

function elevatorDrawing(_this) { //shape
push()
if(fixxed==1){
  translate(0,-elevator.pos.y*scalePix+height/2)
}
  push()
  fill(50,elevatorOpacity);
  //stroke(255, 0, 0,elevatorOpacity);
  //console.log(_this.pos.y)
  var absPos=_this.getMaterPos();
  rect(absPos.x * scalePix,
    absPos.y * scalePix,
    widthElevator * scalePix,
    heightElevator * scalePix
  )
  pop()
  pop()
}
function ballDrawing(_this) { //shape
push()
if(fixxed==1){
  translate(0,-elevator.pos.y*scalePix+height/2)
}
  push()
  fill(255,0,0);
  stroke(255, 0, 0);
  //console.log(_this.pos.y)
  var absPos=_this.getMaterPos();
  ellipse(absPos.x * scalePix,
    absPos.y * scalePix,
    .1 * scalePix,
    .1 * scalePix
  )
  pop()
  
  if(true){
      
        fill(200)
        noStroke()
        text(round(this.getMaterVel().y*-100)/100,
        absPos.x * scalePix+15,
        absPos.y * scalePix);
        
        stroke(200)
        
        arrow(absPos.x * scalePix,
        absPos.y * scalePix,
        absPos.x * scalePix,
        absPos.y * scalePix+this.getMaterVel().y*10)
        
        
        
        
        
        fill(0,0,200)
        noStroke()
        text(round(this.vel.y*-100)/100,
        absPos.x * scalePix-40,
        absPos.y * scalePix);
        stroke(0,0,200)
        arrow(absPos.x * scalePix,
        absPos.y * scalePix,
        absPos.x * scalePix,
        absPos.y * scalePix+this.vel.y*10)

  }
  pop()
}



function arrow(_x,_y,_x2,_y2,_graphics){
  if(_graphics){
    
    
  }else{
    
    line(_x,_y,_x2,_y2);
    var direction=createVector(_x-_x2,_y-_y2);
    direction.normalize();
    //if(dist(_x,_y,_x2,_y2)>5){
      triangle(_x2,_y2,
      _x2+direction.y*5+direction.x*10,_y2+direction.x*-5+direction.y*10,
      _x2+direction.y*-5+direction.x*10,_y2+direction.x*5+direction.y*10)
    //}
    
  }
}
function keyPressed(){
  
  fixxed=(fixxed+1)%2;
}
