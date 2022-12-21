
var letters=["Y","E","S","I","P","A"];
var positions=[];
//var words=["PLAYS","EASY","PALE","LEAP","YES","SALE"];
const words=[
  {begin:15,dir:1,word:"PLAYS",active:false},
  {begin:5,dir:7,word:"EASY",active:true},
  {begin:15,dir:7,word:"PALE",active:true},
  {begin:29,dir:1,word:"LEAP",active:true},
  {begin:26,dir:1,word:"YES",active:true},
  {begin:28,dir:7,word:"SALE",active:true},
];

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

  function placewords(){

  }

$(function(){

  setpositions();
   printletter();
    
    $("#shuffle").on("click",function(){
        shuffle(positions);
        changepos();
    });


    for(var r=0;r<7;r++){
        $(".wordspart").append("<tr>");
        for(var c=0;c<7;c++){
          $(".wordspart").append("<td></td");
        }
        $(".wordspart").append("</tr>");
    }
    
      for(var w=0;w<words.length;w++){
          for(var c=0;c<words[w].word.length;c++){
            var tmp=words[w];
            if(tmp.active){
              $(".wordspart td:nth-of-type("+(tmp.dir*c+tmp.begin)+")").html(`<p style="color:white">${words[w].word[c]}</p>`)
                                                                        .css("background-color","purple");
            }
           else{
            $(".wordspart td:nth-of-type("+(tmp.dir*c+tmp.begin)+")").css("background-color","white");

           }
                                                
                                                
          }
      }




    


})