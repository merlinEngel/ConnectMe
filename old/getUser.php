<?php
$servername = "localhost";
$username = "root";
$password = "";
$databaseName = "connectme";

$conn = new mysqli($servername, $username, $password, $databaseName);

$value = $_POST['value'];
$type = $_POST['type'];

if ($conn->connect_error) {
    die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
}

$sql = "SELECT * FROM `user` WHERE $type='$value'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $offers = array();
    while ($row = $result->fetch_assoc()) {
        $offers[] = $row;
    }
    echo json_encode($offers);
} else {
    echo "Keine Angebote gefunden.";
}

$conn->close();
?>
