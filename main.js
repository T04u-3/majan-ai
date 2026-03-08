const tiles = [];

//牌生成
function createTiles(){

const suits = ["m","p","s"];

for(let s of suits){
for(let n=1;n<=9;n++){
for(let i=0;i<4;i++){
tiles.push(n+s);
}
}
}

const honors=["E","S","W","N","P","F","C"];

for(let h of honors){
for(let i=0;i<4;i++){
tiles.push(h);
}
}

}

//シャッフル
function shuffle(array){

for(let i=array.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1));

[array[i],array[j]]=[array[j],array[i]];
}

}

//キャラ解析
function parseCharacter(text){

return{

aggressive:text.includes("攻撃"),
defensive:text.includes("守備"),
call:text.includes("鳴き"),
beginner:text.includes("初心者")

};

}

//手牌評価
function randomDiscard(hand){

let i=Math.floor(Math.random()*hand.length);
return hand.splice(i,1)[0];

}

//守備型
function defensiveDiscard(hand){

hand.sort();

return hand.shift();

}

//攻撃型
function aggressiveDiscard(hand){

hand.sort();

return hand.pop();

}

//AI判断
function aiDiscard(player){

let style=player.style;
let hand=player.hand;

if(style.defensive) return defensiveDiscard(hand);

if(style.aggressive) return aggressiveDiscard(hand);

if(style.beginner) return randomDiscard(hand);

return randomDiscard(hand);

}

//ログ
function log(text){

let logDiv=document.getElementById("log");

logDiv.innerHTML+=text+"<br>";

logDiv.scrollTop=logDiv.scrollHeight;

}

//ゲーム開始
function startGame(){

document.getElementById("log").innerHTML="";

tiles.length=0;

createTiles();

shuffle(tiles);

let players=[

{name:"あなた",hand:[],style:{}},

{name:"NPC1",hand:[],style:parseCharacter(document.getElementById("npc1").value)},

{name:"NPC2",hand:[],style:parseCharacter(document.getElementById("npc2").value)},

{name:"NPC3",hand:[],style:parseCharacter(document.getElementById("npc3").value)}

];


//配牌
for(let i=0;i<13;i++){
for(let p of players){

p.hand.push(tiles.pop());

}
}

//対局
gameLoop(players);

}

//ゲームループ
function gameLoop(players){

let turn=0;

function nextTurn(){

if(tiles.length==0){

log("流局");
return;

}

let player=players[turn%4];

player.hand.push(tiles.pop());

let discard;

if(player.name==="あなた"){

discard=randomDiscard(player.hand);

}else{

discard=aiDiscard(player);

}

log(player.name+" ツモ → "+discard+"切り");

turn++;

setTimeout(nextTurn,500);

}

nextTurn();

}
