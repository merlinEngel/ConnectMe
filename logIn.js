var logInShown = false;
function switchDisplay(){
    var signUpMenu = document.querySelector(".signUpSection");
    var logInMenu = document.querySelector(".signInSection");
    if(logInShown){
        logInMenu.style.display = "none";
        signUpMenu.style.display = "";
        logInShown = false;
    }else{
        logInMenu.style.display = "";
        signUpMenu.style.display = "none";
        logInShown = true;
    }
}
switchDisplay();