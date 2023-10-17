<?php
if ($_FILES['datei']['error'] === UPLOAD_ERR_OK) {
    $dateiName = basename($_FILES['datei']['name']);
    $zielverzeichnis = "../" . $_POST["pfad"] . /;

    if (!file_exists($zielverzeichnis)) {
        mkdir($zielverzeichnis, 0777, true);
    }

    $zielDatei = $zielverzeichnis . $dateiName;

    if (move_uploaded_file($_FILES['datei']['tmp_name'], $zielDatei)) {
        echo 'Die Datei wurde erfolgreich hochgeladen und gespeichert: ' . $dateiName;
    } else {
        echo 'Es gab ein Problem beim Hochladen der Datei.';
    }
} else {
    echo 'Fehler beim Dateiupload. Code: ' . $_FILES['datei']['error'];
}
?>
