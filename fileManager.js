function uploadFile(file, path, fileName=null) {

    var formData = new FormData();
    formData.append("datei", file);
    formData.append("pfad", path);
    if(fileName != null){
        formData.append("fileName", fileName);
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "PHP/uploadFile.php", false);
    xhr.send(formData);
    return xhr.responseText;
}

function splitFileName(fileName){
    var fileSplit = fileName.split(".");
    
    var baseName = "";
    var extension = "";
    for(var i = 0; i < fileSplit.length; i++){
        if(i < fileSplit.length-1){baseName += fileSplit[i]}else{
            extension = fileSplit[i];
        }
    }
    
    return [baseName, extension];
}

function getFileNameFromPath(path){
    var fileName = path.replace(/^.*[\\/]/, '')
    return fileName;
}

function getAllFilesInDirectory(path){
    path="../"+path;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "PHP/getAllFiles.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = {
        path:path
    };

    var params = Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }).join("&");

    xhr.send(params);
    return toJSON(xhr.responseText);
}