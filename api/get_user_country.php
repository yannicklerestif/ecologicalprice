<?php
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

$ip = $_SERVER['REMOTE_ADDR'];

$response = file_get_contents("http://www.geoplugin.net/json.gp?ip=".$ip);

// forwarding http response code
header($http_response_header[0]);

$dataArray = json_decode($response);

$userCountryCode = $dataArray->geoplugin_countryCode;

print json_encode($userCountryCode);
