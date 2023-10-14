try{
  var menu = document.querySelector(".menu");

function switchMenu(){
    if(menu.style.width == "0vw"){
        menu.style.width = "0vw";
    }else{
        menu.style.width = "20vw";
    }
}

function scrollHandler() {
  if (window.scrollY >= 5) {
    if(menu.style.width != "0vw"){
        menu.style.width = "0vw";
    }
  }
}

passwordInput = document.querySelector(".password .field input");
eye = document.querySelector("#eye");

eye.addEventListener("click", function(){
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

}catch{}