
var letters=["Y","E","S","L","P","A"];
var positions=[];
const words=[
  {begin:15,dir:1,word:"PLAYS",active:false},
  {begin:5,dir:7,word:"EASY",active:false},
  {begin:15,dir:7,word:"PALE",active:false},
  {begin:29,dir:1,word:"LEAP",active:false},
  {begin:26,dir:1,word:"YES",active:false},
  {begin:28,dir:7,word:"SALE",active:false},
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

  for(var w=0;w<words.length;w++)
  {
    for(var c=0;c<words[w].word.length;c++){
      var tmp=words[w];
      if(!tmp.active){
        $(".wordspart td:nth-of-type("+(tmp.dir*c+tmp.begin)+")")
                                    .css("background-color","white");
     }                                
    }
}

  for(var w=0;w<words.length;w++)
  {
    for(var c=0;c<words[w].word.length;c++){
      var tmp=words[w];
      if(tmp.active){
        $(".wordspart td:nth-of-type("+(tmp.dir*c+tmp.begin)+")").html(`<p style="color:white">${words[w].word[c]}</p>`)
                                                                  .css("background-color","purple");
      }                           
    }
  }
  }

$(function(){

  setpositions();
   printletter();

   var presscount=0;
    
    $("#shuffle").on("click",function(){
      if(presscount===0){
        shuffle(positions);
        changepos();
      }
      else{

      }
       
    });

    //prepare table
    for(var r=0;r<7;r++){
        $(".wordspart").append("<tr>");
        for(var c=0;c<7;c++){
          $(".wordspart").append("<td></td");
        }
        $(".wordspart").append("</tr>");
    }
    

      placewords();

  
    $(".lets div").each(function(){
        $(this).click(function(e){

            $(this).css("background-color","aqua");
            $(this).children().css("color","white");
            var txt=$(".guess").text();
            $(".guess").text(txt+$(this).children().text());
            $(this).css("pointer-events","none");
            $("#shuffle").css("pointer-events","none");
            e.stopPropagation();
        });
    });

    $("body").on("contextmenu",function(event){
      event.preventDefault();
    });

    $(".letters").contextmenu(function(e){
      console.log("in letters");
      e.stopPropagation();
      e.preventDefault();

        $("*").css("pointer-events","all");
        $(".lets div").each(function(){
          $(this).css("background-color","inherit");
          $(this).children().css("color","black");
        });

        var flag=false;
        for(var k=0;k<words.length;k++)
        {
          console.log(k+"-"+words[k].word+"-"+$(".guess").text());
          if(words[k].word==$(".guess").text())
          {
            if(!words[k].active){
              words[k].active=true;
              placewords();
            }
            else{
              //ilgili kelimeyi salla
            }
            flag=true;


            break;
          }
        }
        $(".guess").text("");

        if(!flag){
            //guess divini salla
        }
    });


    
       /* event.preventDefault();
        var flag=false;
        for(var k=0;k<words.length;k++){
          if(words[k].word===$(".guess").text()){
            if(!words[k].active){
              words[k].active=true;
            }
            else{

            }
            flag=true;
            $(".guess").text("");
            placewords();
            break;
          }
        }

        if(!flag){

        }*/



    


})