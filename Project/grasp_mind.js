/*
할일
1. is_login  ->쿠키로 변경 해야됨 
2. 쿠키에 name, pw,username 집어넣기
3. log_in/out 함수 완성
*/

let is_login=false;
const images_folder = "./images/";
const images_name="pic";
const images_number = 4;
const images_ext = ".jpeg"

$(document).ready(function(){

  console.log(document.getElementById('register'));
  if(!is_login){
    $(".mdl-layout__drawer").children('.mdl-layout-title').html('Guest')
  }else{
    $(".mdl-layout__drawer").children('.mdl-layout-title').html(userName);
  }

  $("#log-in").click(function(){
    if(is_login){
      log_out();
    }else{
      log_in();
    }
  });

  $('#carousel').ready(
    // when carousel is ready reading the images from the pre-set folder
    function(){
      for(let i = 1; i<=images_number;i++){
        carouselAddImage(images_folder+images_name+i+images_ext);
      }
    }
  );

  $("#carousel").hover(
    function() {
      $(this).css(
        { 'opacity': 1, 
          'transition' : 'linear 0.5s'
        }
        );
    },
    function() {
      $(this).css({'opacity': 0.5, 'background-color': 'transparent'});
    }
  );

  $("#carousel").on('wheel',function(event){
    event.preventDefault();    
    $(this).scrollLeft($(this).scrollLeft()+event.originalEvent.deltaY);
    $(this).css({'scroll-behavior' :'smooth'});
  });

  $('#carousel').scroll(function(){
      let images = $(this).children;

  });

  function log_in(){
    $("#register").detach();
    $("#log-in").html('Log Out');
    $("#log-in").attr('href','catch_mind_login.html');
    $("#log-in")
    log_in=true;

  };

  function log_out(){
    $("#register").attach();
    $("#log-in").html('Log In');
    $("#log-in").attr('href','catch_mind_first.html');

  };

  function register(){

  };


  function carouselAddImage(path){

    newImage = document.createElement("img");
    newImage.src = path;
    document.getElementById("carousel").appendChild(newImage);

    console.log(path+" is well added !");
  };

});