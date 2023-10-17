<?php
include  "config.php";
$conn = $_SESSION['sqlConn'];

$rating = $_POST['rating'];
$userId = $_POST['id'];

$sql = "SELECT `ratings` FROM `user` WHERE id=$userId";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $offers = array();
    while ($row = $result->fetch_assoc()) {
        $offers = explode(",", $row['ratings']);
    }
}
$offers[] = $rating; 
$offers = implode(",", $offers);

$sql = "UPDATE `user` SET `ratings`='$offers' WHERE id=$userId";
$result = $conn->query($sql);
?>
