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
    'SELECT c.code, c.name, cap.country_avg_prices, cc.currency_code
    FROM g_country c, g_country_avg_prices cap, g_country_currency cc
    WHERE c.code = cap.country_code AND c.code = cc.country_code'
)));