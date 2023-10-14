<?php
$servername = "localhost";
$username = "root";
$password = "";
$databaseName = "connectme";

$conn = new mysqli($servername, $username, $password, $databaseName);

if ($conn->connect_error) {
    die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
}

$fullName = $_POST['fullName'];
$emailAddress = $_POST['emailAddress'];
$password = $_POST['password'];
$saveUserCookie = $_POST['saveUserCookie'];

$password = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO user (fullName, emailAddress, `password`, saveUserCookie) VALUES ('$fullName', '$emailAddress', '$password', '$saveUserCookie')";

if ($conn->query($sql) === TRUE) {
    echo "Eintrag erfolgreich erstellt!";
} else {
    echo "Fehler beim Erstellen des Eintrags: " . $conn->error;
}

$conn->close();
?>
