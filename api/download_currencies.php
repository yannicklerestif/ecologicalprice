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
    'SELECT c.code, c. name, c.symbol, cer.units_per_USD
    FROM g_currency c, g_currency_exchange_rate cer
    WHERE c.code = cer.currency_code'
)));