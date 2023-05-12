/*
할일
1. is_login  ->쿠키로 변경 해야됨 
2. 쿠키에 name, pw,username 집어넣기
3. log_in/out 함수 완성
*/
let is_login=false;

$(document).ready(function(){
  // ADD / REMOVE COMPONENTS depends on the login status
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
});