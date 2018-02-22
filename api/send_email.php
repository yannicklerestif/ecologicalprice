<?php
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

$postdata = file_get_contents("php://input");
$message_data = json_decode($postdata);

$contact_email = file_get_contents(
    'contact_email',
    FILE_USE_INCLUDE_PATH);
if ($contact_email == false)
    throw new Exception('contact email file couldn\'t be found');

mail($contact_email, 'a message from '.$message_data->email, $message_data->message);