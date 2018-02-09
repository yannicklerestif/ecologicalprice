<?php
ini_set('display_errors',1);
header('Content-Type: application/json; charset=utf-8');
require '../mysql_connection_include.php';
$pdo = create_pdo();

// deleting old values
$delete_stmt = $pdo->prepare('delete from gen_object_EF');
$delete_stmt->execute();
$deleted_rows = $delete_stmt->rowCount();

// inserting new values
$postdata = file_get_contents("php://input");
$efs = json_decode($postdata);

$insert_stmt = $pdo->prepare(
    "INSERT INTO gen_object_EF (object_id, EF)
    VALUES (:object_id, :ef)");

$inserted_rows = 0;

foreach ($efs as $ef) {
    $insert_stmt->execute(array(
        "object_id" => $ef->object_id,
        "ef" => $ef->EF));
    $inserted_rows += $insert_stmt->rowCount();
}

print("$deleted_rows rows were deleted.\n");
print("$inserted_rows rows were inserted.\n");
