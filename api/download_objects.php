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

print(json_encode([
    'p_object' => execute_query($pdo,
        'SELECT o.id, o.name, o.object_type, g.EF
        FROM p_object o, gen_object_EF g
        WHERE g.object_id = o.id'),
    // TODO factorize with generate_EF/download_objects_data.php
    'p_CO2_object' => execute_query($pdo,
        'SELECT object_id, CO2_cost FROM p_CO2_object'),
    'p_crop_object' => execute_query($pdo,
        'SELECT object_id, yield, crop_intensity FROM p_crop_object'),
    'p_livestock_object' => execute_query($pdo,
        'SELECT object_id, total_produced, total_ecological_footprint, retail_cut_percent FROM p_livestock_object'),
    'p_compound_object_link' => execute_query($pdo,
        'SELECT object_id, parent_id, quantity FROM p_compound_object_link')
]));