<?php
include 'connect.php';

$sql = "SELECT * FROM todoItems";
$rs = $conn->query($sql);
if($rs === false) {
    die("Sql Error.");
}

$rs->data_seek(0);
$completed = "";
while($row = $rs->fetch_assoc()){
    $html = '<li class="item" id="itemid' . $row["id"] . '" data-completed=' . $row["completed"] . '>';
        $html .= '<div class="title">';
            $html .= '<div class="arrow"></div>';
            $html .= $row["title"];
            if($row["completed"] == 0){
                $html .= '<div class="complete">&#10004</div><div class="remove">&#x2716;</div>';
            }
        $html .= '</div>';
        $html .= '<div class="description">';
            $html .= $row["description"];
        $html .= '</div>';
    $html .= '</li>';
    if($row["completed"] == 0){
        echo $html;
    } else {
        $completed .= $html;
    }
}
echo $completed;