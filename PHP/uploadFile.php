<?php
if ($_FILES['datei']['error'] === UPLOAD_ERR_OK) {
    $dateiName = basename($_FILES['datei']['name']);
    $zielverzeichnis = "../" . $_POST["pfad"] . "/";
    $pfadTeile = pathinfo($dateiName);
    $dateiErweiterung = $pfadTeile['extension'];

    if (!file_exists($zielverzeichnis)) {
        mkdir($zielverzeichnis, 0777, true);
    }
    
    
    $zielDatei = $zielverzeichnis . $dateiName;
    
    
    if(isset($_POST['fileName'])){
        $fileName = $_POST['fileName'];
    }else{
        $fileName = $pfadTeile['fileName'];
    }
    
    // $files = glob($zielverzeichnis . $fileName . ".*");

    // if(!empty($files)){
    //     foreach ($files as $file){
    //         unlink($file);
    //     }
    // }
    if ($handle = opendir($zielverzeichnis)) {
        while (false !== ($file = readdir($handle)) && $file !== false) {
            if ($file != "." && $file != "..") {
                if (strpos($file, "profilePicture") !== false) {
                    $filepath = $zielverzeichnis . $file;
                    unlink($filepath);
                }
            }
        }
        closedir($handle);
    }
    
    if (move_uploaded_file($_FILES['datei']['tmp_name'], $zielDatei)) {
        echo 'Die Datei wurde erfolgreich hochgeladen und gespeichert: ' . $dateiName;
        if(isset($_POST['fileName'])){
            rename( $zielverzeichnis . $dateiName, 
                    $zielverzeichnis . $_POST['fileName'] . "." . $dateiErweiterung);
        }
    } else {
        echo 'Es gab ein Problem beim Hochladen der Datei.';
    }
} else {
    echo 'Fehler beim Dateiupload. Code: ' . $_FILES['datei']['error'];
}
?>
