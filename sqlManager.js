function query(sql){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "executeSql.php", false);
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

function toJSON(xhr){
    try{
        return JSON.parse(xhr);
    }catch{
        return "Keine Angebote gefunden."
    }
}

function getAllItemsFromTable(table, condition){
    if(!condition){condition = "";}
    return query("SELECT * FROM `"+table+"`"+condition);
}

function checkSignIn(fullName, emailAddress, password){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "checkSignIn.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
    var data = {
        fullName: fullName,
        emailAddress: emailAddress,
        password: password
    };

    var params = Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }).join("&");

    xhr.send(params);

    return xhr;
}
