<?php
require_once "headers.php";
// require("../config/db_conf.php");

// $db = Database::getInstance();
// $mysqli = $db->getConnection(); 

/** Return all rules from input JSON file  */
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_REQUEST)){ 
        $result = '{"antecedenti":{"un giorno prima, riposo":"2","due giorni prima, pesante":"3","tre giorni prima, riposo":"1","due giorni prima, moderata":"3"},"sonno":"11","supporto":"0.01130952380952381","confidenza":"0.6785714285714286"}';       
    } else {
        exit(json_encode(array("error" => 1)));
    }
    // exit(json_decode($result, true));
    exit($result);
}
