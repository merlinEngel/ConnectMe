<?php
$servername = "localhost";
$username = "root";
$password = "";
$databaseName = "connectme";

$conn = new mysqli($servername, $username, $password, $databaseName);

$fullName = $_POST['fullName'];
$emailAddress = $_POST['emailAddress'];
$phoneNumber = $_POST['phoneNumber'];
$description = $_POST['description'];
$id = $_POST['id'];

if ($conn->connect_error) {
    die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
}

$sql = "UPDATE `user` SET `fullName`='$fullName',`emailAddress`='$emailAddress',`description`='$description',`phoneNumber`='$phoneNumber' WHERE `user`.`id` = $id";

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
