function saveUserCookie(id, exDays){
    console.log(id)
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
    return toJSON(query("SELECT * FROM `user` WHERE id=" + userId).responseText)[0];
}
function getUserByName(name){
    return toJSON(query("SELECT * FROM `user` WHERE fullName='"+name+"'").responseText);
}
function getUserByEmail(email){
    console.log(query("SELECT * FROM `user` WHERE emailAddress="+email).responseText)
    return toJSON(query("SELECT * FROM `user` WHERE emailAddress='"+email+"'").responseText);
}
function removeUserCookie(){
    document.cookie = "userId=;"
}
function registerUser(fullName, emailAddress, password){
    createUser(fullName, emailAddress, password)
}


function signUp(){
    firstName = document.querySelector(".signUpSection #firstName").value;
    lastName = document.querySelector(".signUpSection #lastName").value;
    emailAddress = document.querySelector(".signUpSection #emailAddress").value.replace(" ", "");
    password = document.querySelector(".signUpSection #password").value;

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
            registerUser(firstName + " " + lastName, emailAddress, password, saveCookies)
            window.alert("Successfully signed up!")

            if(saveCookies){
                saveUserCookie()
            }
        }
    }

    signIn(emailAddress, password)
    query("UPDATE `user` SET 'uuid='"+getUUID(getUser().id) + "' WHERE 'id'="+getUser().id);
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


function signIn(emailAddress, password){
    if(!emailAddress)
        emailAddress = document.querySelector(".signInSection #emailAddress2").value.replace(" ", "");

    if(!password)
        password = document.querySelector(".signInSection #password2").value;
    if(checkSignIn(emailAddress, password)){
        console.log(getUserByEmail(emailAddress)[0])
        saveUserCookie(getUserByEmail(emailAddress)[0].id);
        var url = new URL(window.location.href);
        var from = url.searchParams.get("from");
        if(from == "explore"){
            window.location.href = "explore.html"
        }else if(from == "userSettings"){
            window.location.href = "userSettings.html"
        }
        
        else{
            window.location.href ="index.html"
        }
    }
}

function logOut(){
    removeUserCookie();
    window.location.href = "index.html"
}

function getAverageRating(id){
    var ratings = toJSON(getUserRatings(id), true);
    if(ratings.length == 0) return 0;
    else{
        var ratingSum = 0;
        var ratingAmount = ratings.length;
        ratings.forEach(element =>{
            var rating = parseInt(element);
            if(!rating){
                rating = 0;
                ratingAmount -= 1;
            }
            ratingSum+=rating;
        });
        var averageRating = ratingSum/ratingAmount;
        return Math.round(averageRating * 2) / 2;;
    }
}

function getQeuedOrders(id){
    var orders = toJSON(getAllItemsFromTable("orders", " WHERE providerId="+id).responseText, true)
    return orders.length;
}

function getProfilePicturePath(id){
    var user = getUser(id);

    return user.profilePicturePath;
}
