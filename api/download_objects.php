<?php
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

require './mysql_connection_include.php';
$pdo = create_pdo();

print(json_encode(execute_query($pdo,
    // joining on currencies to make sure all countries have a currency
    'SELECT o.id, o.name, o.object_type, g.EF
    FROM p_object o, gen_object_EF g
    WHERE g.object_id = o.id'
)));