
var letters=["Y","E","S","I","P","A"];
var positions=[];
var words=["PLAYS","EASY","PALE","LEAP","YES","SALE"];

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

  }

  function printletter(){
    var x,y;

    for(var i=0;i<letters.length;i++){
            $(".lets").append(` <div style="left:${positions[i][0]}px; top:${positions[i][1]}px;"><p>${letters[i]}</p></div>`);
    }
  }

  function setpositions(){
    var x,y;
    
    for(var i=0;i<letters.length;i++){
        x=Math.cos(Math.PI*2*i/letters.length)*110+115;
        y=Math.sin(Math.PI*2*i/letters.length)*110+115;

            positions[i]=[x,y];
    }
  }

  function changepos(){
    var k=0;
        $(".lets div").each(function(){
            $(this).css("left",positions[k][0]);
            $(this).css("top",positions[k][1]);
            k++;
        })
  }

$(function(){

  setpositions();
   printletter();
    
    $("#shuffle").on("click",function(){
        shuffle(positions);
        changepos();
    });




})