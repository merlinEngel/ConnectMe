<?php
include  "config.php";
$conn = $_SESSION['sqlConn'];

$userId = $_POST['id'];
$sql = "SELECT `ratings` FROM `user` WHERE id=$userId";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $offers = array();
    while ($row = $result->fetch_assoc()) {
        $offers = explode(",", $row['ratings']);
    }
    echo json_encode($offers);
} else {
    echo "Keine Angebote gefunden.";
}

$conn->close();
?>
