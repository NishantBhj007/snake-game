let inputdir={x:0,y:0}

const foodsound=new Audio('ding.mp3')
const gameover=new Audio('gameo.mp3')
const movesound=new Audio('move.mp3')
const music=new Audio('gamem.mp3')

let speed=10;
let lastpainttime=0;
let snakearr=[{x:12,y:17}];
food={x:6,y:7};
let score=0;

//game functions
function main(ctime){
 window.requestAnimationFrame(main)
 if((ctime-lastpainttime)/1000<1/speed){
  return;
 }
 lastpainttime=ctime;
gameEngine();
} 

 function iscollide(snake){
 //bump
for(let i=1;i<snakearr.length;i++){
if(snake[i].x===snake[0].x && snake[i].y===snake[0].y ){
   return true;
}
}
//wall crash

if(snake[0].x >=18||snake[0].x<=0 || snake[0].y >=18||snake[0].y<=0 ){
   return true;
}
 }




function gameEngine(){
 //p1 updating snake array & food
if(iscollide(snakearr)){
gameover.play()
 music.pause()
 inputdir={x:0,y:0}
 alert('Game Over')
 
snakearr=[{x:13,y:10}]
music.play()
score=0;

}

//if food eaten increment the score
if(snakearr[0].x===food.x && snakearr[0].y===food.y ){
 foodsound.play();
 score+=1;


 if(score>hiscore){
   hiscore=score;
   localStorage.setItem('highscore',JSON.stringify(hiscore) )
 }

 if(score>10){
   speed=15;
 }else if(score>20){
   speed=19;
 }
 scorebox.innerHTML=`Score: ${score}`
 snakearr.unshift({x:snakearr[0].x + inputdir.x,y:snakearr[0].y + inputdir.y});
 let a=2;
 let b=16;
 food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
}

//moving snake
for(let i=snakearr.length-2;i>=0;i--){
 snakearr[i+1]={...snakearr[i]}
}
snakearr[0].x+=inputdir.x;
snakearr[0].y+=inputdir.y;



//display snake and food

board.innerHTML='';
snakearr.forEach((e,index)=>{
 snakeElement=document.createElement('div');
 snakeElement.style.gridRowStart=e.y;
 snakeElement.style.gridColumnStart=e.x;

 if(index===0){
  snakeElement.classList.add('head')
  
  
 }else{
  snakeElement.classList.add('snake')
 }
 board.appendChild(snakeElement)
})

//display food

foodElement=document.createElement('div');
  foodElement.style.gridRowStart=food.y
   foodElement.style.gridColumnStart=food.x;
 foodElement.classList.add('food')
board.appendChild(foodElement)
}

//main logic
let highscore=localStorage.getItem('highscore');
if(highscore===null){
   let hiscore=0;
   localStorage.setItem('highscore',JSON.stringify(hiscore)  )
}else{
   hiscore=JSON.parse(highscore)
   Highscorebox.innerHTML=`HighScore : ${highscore}`
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
 inputdir={x:0,y:1} //start game
 movesound.play();

 switch (e.key) {
  case "ArrowUp":
   
   inputdir.x=0;
   inputdir.y=-1;
   break;
 
   case "ArrowDown":
  
    inputdir.x=0;
    inputdir.y=1;
 break;

  case "ArrowLeft":
   
   inputdir.x=-1;
   inputdir.y=0;
   break;

   case "ArrowRight":
    
    inputdir.x=1;
    inputdir.y=0;
    break;
    default:

 }

 document.querySelector('#bt').addEventListener('click',()=>{
   location.reload()
 })
})

