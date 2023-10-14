<?php
$servername = "localhost";
$username = "root";
$password = "";
$databaseName = "connectme";

$conn = new mysqli($servername, $username, $password, $databaseName);

if ($conn->connect_error) {
    die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
}

$clientId = $_POST['clientId'];
$providerId = $_POST['providerId'];
$orderId = $_POST['orderId'];
$isOffer = $_POST['isOffer'];

$password = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO orders (clientId, providerId, itemId, isOffer) VALUES ('$clientId', '$providerId', '$orderId', '$isOffer')";

if ($conn->query($sql) === TRUE) {
    echo "Eintrag erfolgreich erstellt!";
} else {
    echo "Fehler beim Erstellen des Eintrags: " . $conn->error;
}

$conn->close();
?>
