
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

function  spectrum(obj){
  var  mcolors = ['aqua', 'purple','aqua', 'purple'];
  var time = 300;             
  $.each(mcolors, function(index, value){
  setTimeout( 
    function(){ 
        obj.css({
          transition: 'background-color 1s ease-in-out',
          "background-color": value });
         }, time)
  time += 600;
  });
}
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

        $(".wordspart td:nth-of-type("+(tmp.dir*c+tmp.begin)+")").html(`<p style="color:white">${words[w].word[c]}</p>`)
                                                                  .addClass(words[w].word)
                                                                  .css("background-color","white");
    }
  }
  }

$(function(){

  var shuffleactive=true;
  var hintactive=false;

  setpositions();
   printletter();

   var presscount=0;
    
      $("#shuffle").on("click",function(){
        if(shuffleactive){
          shuffle(positions);
          changepos();
        }
        else{
          $(this).effect("shake");
        }
    });
   
       $("#lightbulb").on("click",function(){

        console.log("in click"+hintactive);
            if(!hintactive){
              hintactive=true;
            }
            else{
              hintactive=false;
            }
              for(var k=0;k<words.length;k++){
                if(!words[k].active){

                  $("."+words[k].word).children().each(function(){
                    if(!$(this).hasClass("activeval")){
                      if(hintactive){
                        $(this).css("display","block").css("color","rgba(0,0,0,0.5)");
                        console.log("in add hintcols");
                      }
                      else{
                        $(this).css("display","none");
                        console.log("in remove hintcols");
                      }
                    } 
                  })    
                }
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

    //when letter clicked
    $(".lets div").each(function(){
        $(this).click(function(e){
          $(".guess").css("background-color","purple");

          if(!$(this).hasClass("clicked")){
            console.log($(this).children().text()+" chosen");

            $(this).css("background-color","aqua");
            $(this).children().css("color","white");
            $(this).css("transition","none");

            shuffleactive=false;

            $(this).addClass("clicked");

            var txt=$(".guess").text();
            $(".guess").text(txt+$(this).children().text());

            e.stopPropagation();
          }
          else{
              $(this).effect("shake");
          }
        });
    });

    //prevent default context menu all page
    $("body").on("contextmenu",function(event){
      event.preventDefault();
    });

    //context menu in letters
    $(".letters").contextmenu(function(e)
    {
            e.preventDefault();
              console.log("all opened");
              $(".guess").css("background-color","rgba(0,0,0,0)");

            //reset pointer events and letters
            shuffleactive=true;
              $(".lets div").each(function(){
                $(this).css("transition","all ease 1s");
                $(this).css("background-color","inherit");
                $(this).children().css("color","black");
                $(this).removeClass("clicked");
              });

              var flag=false;
              for(var k=0;k<words.length;k++)
              {  
                if(words[k].word==$(".guess").text())
                {
                  if(!words[k].active){
                    words[k].active=true;
                    $("."+words[k].word).css("background-color","purple")
                    $("."+words[k].word).children().each(function(){
                        $(this).css("color","black").css("display","block").addClass("activeval");
                    });
                  }
                  else{
                    spectrum($("."+words[k].word));
                  }
                  flag=true;
                  break;
                }
                //console.log(k+"-"+words[k].word+"-"+$(".guess").text()+"-"+flag);
              }
              $(".guess").text("");

              if(!flag){
                  //guess divini salla
                  $(".guess").wiggle();
              }
    });
})