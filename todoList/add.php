<?php
include 'connect.php';
$sql = 'INSERT INTO todoItems (title, description, completed) VALUES ("' . htmlspecialchars($_POST["title"]) . '", "' . htmlspecialchars($_POST["description"]) . '", 0)';
$rs = $conn->query($sql);
if($rs === false) {
    die("Sql Error");
}