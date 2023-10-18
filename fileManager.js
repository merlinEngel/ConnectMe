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
