<?php
$folderPath = $_POST['path'];

if (is_dir($folderPath)) {
    $files = scandir($folderPath);
    $fileList = array();

    foreach ($files as $file) {
        if (is_file($folderPath . '/' . $file)) {
            $fileList[] = $file;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($fileList);
} else {
    // http_response_code(404);
    echo "Der angegebene Ordner existiert nicht.";
}
?>