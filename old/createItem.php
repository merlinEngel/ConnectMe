<?php
$servername = "localhost";
$username = "root";
$password = "";
$databaseName = "connectme";

$conn = new mysqli($servername, $username, $password, $databaseName);

if ($conn->connect_error) {
    die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
}

$offerTitle = $_POST['title'];
$offerPrice = $_POST['price'];
$offerUser = $_POST['user'];
$offerCategoryShort = $_POST['categoryShort'];
$offerDescription = $_POST['description'];

$itemType = $_POST['type'];

if($itemType == "offers"){
    $sql = "INSERT INTO '$itemType' ('title', 'userName', 'categoryShort', 'price', 'description') VALUES ('$offerTitle', '$offerUser', '$offerCategoryShort', '$offerPrice', '$offerDescription')";
}
else if($itemType == "requests"){
    $sql = "INSERT INTO '$itemType' ('title', 'userName', 'categoryShort', 'price', 'description') VALUES ('$offerTitle', '$offerUser', '$offerCategoryShort', '$offerPrice', '$offerDescription')";
}


if ($conn->query($sql) === TRUE) {
    echo "Eintrag erfolgreich erstellt!";
} else {
    echo "Fehler beim Erstellen des Eintrags: " . $conn->error;
}

$conn->close();
?>
