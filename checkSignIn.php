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

$sql = "SELECT * FROM user WHERE fullName = '$fullName' AND emailAddress = '$emailAddress'";

$result = $conn->query($sql);

$user = $result->fetch_assoc();

if ($result->num_rows > 0) {
    if (password_verify($password, $user['password'])){
        echo true;
    }
    else{
        echo false;
    }
} else {
    echo false;
}
$conn->close();
?>
