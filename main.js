const SUITS = ["m","p","s"];
const HONORS = ["E","S","W","N","P","F","C"];

let wall=[];
let players=[];
let turn=0;

function log(t){

const div=document.getElementById("log");

div.innerHTML+=t+"<br>";

div.scrollTop=div.scrollHeight;

}

function speak(p,msg){

log("💬 "+p.name+"「"+msg+"」");

}

function parsePersonality(text){

return{

aggression:text.includes("攻撃")?0.9:0.4,
defense:text.includes("守備")?0.9:0.8,
call:text.includes("鳴き")?0.8:0.2,
reach:text.includes("リーチ")?0.9:0.3,
beginner:text.includes("初心者")

};

}

function createNPC(name,text){

return{

name,
text,
hand:[],
discards:[],
personality:parsePersonality(text)

};

}

function createWall(){

wall=[];

for(let s of SUITS){

for(let n=1;n<=9;n++){

for(let i=0;i<4;i++){

wall.push(n+s);

}

}

}

for(let h of HONORS){

for(let i=0;i<4;i++){

wall.push(h);

}

}

shuffle(wall);

}

function shuffle(a){

for(let i=a.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1));

[a[i],a[j]]=[a[j],a[i]];

}

}

function drawTile(){

return wall.pop();

}

function deal(){

for(let i=0;i<13;i++){

for(let p of players){

p.hand.push(drawTile());

}

}

}

function randomDiscard(hand){

let i=Math.floor(Math.random()*hand.length);

return hand.splice(i,1)[0];

}

function aiDiscard(p){

let hand=p.hand;

if(p.personality.defense>0.8){

hand.sort();

return hand.shift();

}

if(p.personality.aggression>0.8){

hand.sort();

return hand.pop();

}

return randomDiscard(hand);

}

function checkPon(player,tile){

let count=player.hand.filter(t=>t===tile).length;

return count>=2;

}

function tryCall(tile,from){

for(let p of players){

if(p===from) continue;

if(Math.random()<p.personality.call){

if(checkPon(p,tile)){

speak(p,"ポン！");

p.hand=p.hand.filter(t=>t!==tile);

p.hand=p.hand.filter(t=>t!==tile);

p.hand.push(tile);

return p;

}

}

}

return null;

}

function nextTurn(){

if(wall.length===0){

log("流局");

return;

}

let p=players[turn%4];

let tile=drawTile();

p.hand.push(tile);

log(p.name+" ツモ "+tile);

let discard;

if(p.name==="あなた"){

discard=randomDiscard(p.hand);

}else{

discard=aiDiscard(p);

}

p.discards.push(discard);

log(p.name+" 打 "+discard);

let caller=tryCall(discard,p);

if(caller){

turn=players.indexOf(caller);

}else{

turn++;

}

setTimeout(nextTurn,600);

}

function startGame(){

document.getElementById("log").innerHTML="";

players=[];

players.push({

name:"あなた",
hand:[],
discards:[],
personality:{}

});

players.push(createNPC("NPC1",document.getElementById("npc1").value));

players.push(createNPC("NPC2",document.getElementById("npc2").value));

players.push(createNPC("NPC3",document.getElementById("npc3").value));

createWall();

deal();

log("対局開始");

for(let p of players){

speak(p,"よろしく。");

}

turn=0;

nextTurn();

}
