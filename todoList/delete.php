<?php
include 'connect.php';
$sql = 'DELETE FROM todoItems WHERE id=' . $_POST["id"];
$rs = $conn->query($sql);
if($rs === false) {
    die("Sql Error");
}