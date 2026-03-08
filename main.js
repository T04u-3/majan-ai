function log(t){

const div=document.getElementById("log");

div.innerHTML+=t+"<br>";

div.scrollTop=div.scrollHeight;

}

function parsePersonality(text){

return{

aggression:text.includes("攻撃")?0.9:0.4,
defense:text.includes("守備")?0.9:0.4,
call:text.includes("鳴き")?0.8:0.2,
reach:text.includes("リーチ")?0.8:0.3,
beginner:text.includes("初心者")

};

}

function createNPC(name,text){

const personality=parsePersonality(text);

return{

name,
text,
personality

};

}

function speak(player,msg){

log("💬 "+player.name+"「"+msg+"」");

}

function startGame(){

document.getElementById("log").innerHTML="";

const npc1=createNPC("NPC1",document.getElementById("npc1").value);

const npc2=createNPC("NPC2",document.getElementById("npc2").value);

const npc3=createNPC("NPC3",document.getElementById("npc3").value);

log("対局開始");

speak(npc1,"今日はツイてる気がするな…");
speak(npc2,"状況を見て打つとしよう。");
speak(npc3,"がんばります！");

}
