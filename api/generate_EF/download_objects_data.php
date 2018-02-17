<?php
ini_set('display_errors',1);
header('Content-Type: application/json; charset=utf-8');
require '../mysql_connection_include.php';
$pdo = create_pdo();

print(json_encode([
    'p_CO2_object' => execute_query($pdo,
        'select object_id, CO2_cost from p_CO2_object'),
    'p_CO2_ecological_footprint' => execute_query($pdo,
        'select value from p_CO2_ecological_footprint'),
    'p_crop_object' => execute_query($pdo,
        'select object_id, yield, crop_intensity from p_crop_object'),
    'p_equivalent_factor' => execute_query($pdo,
        'select type_id, ef from p_equivalent_factor'),
    'p_livestock_object' => execute_query($pdo,
        'select object_id, total_produced, total_ecological_footprint, retail_cut_percent from p_livestock_object'),
    'p_compound_object_link' => execute_query($pdo,
        'select object_id, parent_id, quantity from p_compound_object_link'),
    'p_object' => execute_query($pdo,
        'select id, name, object_type from p_object')
]));

