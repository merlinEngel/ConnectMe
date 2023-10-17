function uploadFile(file, path) {
    var formData = new FormData();
    formData.append("datei", file);
    formData.append("pfad", path)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "PHP/uploadFile.php", false);
    xhr.send(formData);
    return xhr.responseText;
}
