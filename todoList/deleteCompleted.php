<?php
include 'connect.php';
$sql = 'DELETE FROM todoItems WHERE completed=1';
$rs = $conn->query($sql);
if($rs === false) {
    die("Sql Error");
}