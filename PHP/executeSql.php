<?php
include  "config.php";
$conn = $_SESSION['sqlConn'];

$sql = $_POST['sql'];

if ($conn->connect_error) {
    die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
}

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
