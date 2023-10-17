function query(sql){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "PHP/executeSql.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = {
        sql:sql
    };

    var params = Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }).join("&");

    xhr.send(params);
    return xhr;
}

function toJSON(xhr, returnArray=false){
    try{
        return JSON.parse(xhr);
    }catch{
        if(returnArray){
            return [];
        }else{
            return "Keine Angebote gefunden."
        }
    }
}

function getAllItemsFromTable(table, condition){
    if(!condition){condition = "";}
    var sql = "SELECT * FROM `"+table+"`"+condition;
    return query(sql);
}

function checkSignIn(emailAddress, password){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "PHP/checkSignIn.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
    var data = {
        emailAddress: emailAddress,
        password: password
    };

    var params = Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }).join("&");

    xhr.send(params);

    return xhr;
}

function createUser(fullName, emailAddress, password){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "PHP/createUser.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
    var data = {
        fullName: fullName,
        emailAddress: emailAddress,
        password: password,
        saveUserCookie:true
    };

    var params = Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }).join("&");

    xhr.send(params);
}

function addUserRating(id, rating){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "PHP/addUserRating.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
    var data = {
        id:id,
        rating:rating
    };

    var params = Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }).join("&");

    xhr.send(params);
}

function getUserRatings(id){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "PHP/getUserRatings.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
    var data = {
        id:id
    };

    var params = Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }).join("&");

    xhr.send(params);

    return xhr.responseText;
}
