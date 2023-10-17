<?php
include  "config.php";
$conn = $_SESSION['sqlConn'];

$fullName = $_POST['fullName'];
$emailAddress = $_POST['emailAddress'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO user (fullName, emailAddress, `password`, saveUserCookie) VALUES ('$fullName', '$emailAddress', '$password', '$saveUserCookie')";

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
