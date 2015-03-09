<?php
include 'connect.php';
$sql = "UPDATE todoItems SET completed=1 WHERE id=" . $_POST["id"] . ";";
$rs = $conn->query($sql);
if($rs === false) {
    die("Sql Error");
}