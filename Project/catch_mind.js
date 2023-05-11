
let text = document.getElementsByTagName("p");

function fn_change(){
  if(text[0].style.color=="grey"){
    text[0].style.color="white";
  } else {
    text[0].style.color="grey";
  }
}

setInterval(fn_change, 1000);
