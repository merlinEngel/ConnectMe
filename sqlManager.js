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
    xhr.open("POST", "PHP/createUser.php", true);
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
    xhr.open("POST", "PHP/addUserRating.php", true);
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




function getUUID(seed) {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

    return uuid.replace('4', seed % 16);
}
