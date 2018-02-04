<?php

function create_pdo () {
    $mysql_password = file_get_contents(
        'mysql_password',
        FILE_USE_INCLUDE_PATH);
    if ($mysql_password == false)
        throw new Exception('password file couldn\'t be found');
    $pdo = new PDO(
        'mysql:host=ecologicur0.mysql.db;dbname=ecologicur0',
        'ecologicur0',
        $mysql_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES,false);
    return $pdo;
}

function execute_query (PDO $pdo, $query): array {
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
