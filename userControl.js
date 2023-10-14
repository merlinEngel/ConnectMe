function saveUserCookie(id, exDays){
    expires = "";
    if(exDays){
        date = new Date();
        date.setTime(date.getTime() + exDays * 24 * 60 * 60 * 1000);
        date = date.toUTCString();
        expires = "; expires=" + date;
    }
    document.cookie = "userId=" + (encodeURIComponent(id)) + expires;
}

function getUserCookie(){
    let ca = document.cookie.split(";");
    for(let i = 0; i < ca.length; i++){
        var c = ca[i];
        while(c.charAt(0) == " ") c = c.substring(1, c.length);
        if(c.indexOf("userId=") == 0)
        return c.substring("userId=".length, c.length);
    }
}
function getUser(id){
    var userId = getUserCookie();
    if(id){
        userId = id;
    }

    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "getItem.php", false);
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
    // var data = {
    //     id:userId,
    //     type:"user"
    // };

    // var params = Object.keys(data).map(function (key) {
    //     return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    // }).join("&");

    // xhr.send(params);

    return toJSON(query("SELECT * FROM `user` WHERE id=" + userId).responseText);
}
function getUserByName(name){
    return toJSON(query("SELECT * FROM `user` WHERE fullName='"+name+"'").responseText);
}
function getUserByEmail(email){
    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "getUser.php", false);
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    // var data = {
    //     value:email,
    //     type:"emailAddress"
    // };

    // var params = Object.keys(data).map(function (key) {
    //     return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    // }).join("&");

    // xhr.send(params);

    // return xhr.responseText;
    return toJSON(query("SELECT * FROM `user` WHERE emailAddress="+email).responseText);
}
function removeUserCookie(){
    document.cookie = "userId=;"
}
function createUser(fullName, emailAddress, password, saveUserCookie){
    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "createUser.php", false);
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
    // var data = {
    //     fullName:fullName,
    //     emailAddress:emailAddress,
    //     password:password,
    //     saveUserCookie:saveUserCookie
    // };

    // var params = Object.keys(data).map(function (key) {
    //     return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    // }).join("&");

    // xhr.send(params);
    query("INSERT INTO user (fullName, emailAddress, `password`, saveUserCookie) VALUES ('"+fullName+"', '"+emailAddress+"', '"+password+"', '"+saveUserCookie+"')")

    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "getUser.php", false);
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
    // var data = {
    //     name: fullName,
    //     type: "user"
    // };

    // var params = Object.keys(data).map(function (key) {
    //     return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    // }).join("&");

    // xhr.send(params);
    query("SELECT * FROM `user` WHERE 'fullName'='"+fullName+"'")
}


function signUp(){
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    emailAddress = document.getElementById("emailAddress").value.replace(" ", "");
    password = document.getElementById("password").value;

    saveCookies = true;

    fullName = firstName + " " + lastName

    isAlrRegistrated = false;
    
    if(firstName != undefined && lastName != undefined && isValidEmail(emailAddress)){
        if(getUserByName(fullName) == "Keine Angebote gefunden."){
            isAlrRegistrated = false;
        }else if(getUserByEmail(emailAddress) == "Keine Angebote gefunden."){
            isAlrRegistrated = true;
        }else{
            isAlrRegistrated = true;
        }

        if(!isAlrRegistrated){
            createUser(firstName + " " + lastName, emailAddress, password, saveCookies)
            window.alert("Successfully signed in!")

            if(saveCookies){
                saveUserCookie()
            }
        }
    }
}

function isValidEmail(string) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(string);
}

function signInLocal(){
    return signIn();
}
function signUpLocal(){
    return signUp();
}


function signIn(){
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    emailAddress = document.getElementById("emailAddress").value.replace(" ", "");
    password = document.getElementById("password").value;

    fullName = firstName + " " + lastName;

    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "checkSignIn.php", false);
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
    // var data = {
    //     fullName: fullName,
    //     emailAddress: emailAddress,
    //     password: password
    // };

    // var params = Object.keys(data).map(function (key) {
    //     return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    // }).join("&");

    // xhr.send(params);

    if(checkSignIn(fullName, emailAddress, password)){
        console.log(getUserByName(fullName)[0])

        saveUserCookie(getUserByName(fullName)[0].id);
        window.alert("Successfully Signed In");
        window.location.href = "/connectMe";
    }
}

function logOut(){
    removeUserCookie();
    window.location.href = "index.html"
}
