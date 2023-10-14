<?php
$servername = "localhost";
$username = "root";
$password = "";
$databaseName = "connectme";

$conn = new mysqli($servername, $username, $password, $databaseName);

$id = $_POST['id'];

if ($conn->connect_error) {
    die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
}

$sql = "DELETE FROM `user` WHERE id=$id";

$result = $conn->query($sql);

$conn->close();
?>
