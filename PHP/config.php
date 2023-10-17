<?php 
    $servername = "localhost";
    $username = "root";
    $password = "";
    $databaseName = "connectme";
    
    $conn = new mysqli($servername, $username, $password, $databaseName);
    
    if ($conn->connect_error) {
        die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
    }

    if(session_status() == PHP_SESSION_ACTIVE){}
    else{
        session_start();
    }

    $_SESSION['sqlConn'] = $conn;
?>