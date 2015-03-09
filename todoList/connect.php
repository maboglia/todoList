<?php
$server = '0.0.0.0'; // e.g 'localhost' or '192.168.1.100'
$user = 'root';
$password = '_data';
$databaseName = 'todoList';

$conn = new mysqli($server, $user, $password, $databaseName);
// check connection
if($conn->connect_error)
    die("Database connection failed.");