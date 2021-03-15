<?php
require_once "headers.php";
require("../config/db_conf.php");

$db = Database::getInstance();
$mysqli = $db->getConnection(); 

/** Return username and password to check login */
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    if (isset($_GET['email'])){
        $email = $mysqli->real_escape_string($_GET['email']);
        $sql = $mysqli->query("SELECT * FROM users WHERE email = '$email'");
        $data = $sql->fetch_assoc();
    } else {
        exit(json_encode(array("status" => "error")));
    }
    exit(json_encode($data));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST)){
        $data = json_decode(file_get_contents("php://input"));
        $sql = $mysqli->query("
            INSERT INTO users(`nome`, `cognome`, `codice_fiscale`, `username`, `password`) VALUES
            ('". $data->nome ."', '". $data->cognome ."', '". $data->codice_fiscale ."', '". $data->username ."', '". $data->password ."')");
        if ($sql) {
            $data->id = $mysqli->insert_id;
            exit(json_encode($data));
        } else {
            exit(json_encode(array("status" => "error")));
        }
    }
    exit(json_encode(array("status" => "error")));
}

if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    if (isset($_GET['id']) && isset($_GET['nome']) && isset($_GET['cognome']) && isset($_GET['codice_fiscale']) && 
        isset($_GET['username']) && isset($_GET['password'])) {
        $id = $mysqli->real_escape_string($_GET['id']);
        $data = json_decode(file_get_contents("php://input"));
        $sql = $mysqli->query("UPDATE users SET nome = '". $data->nome ."' WHERE id = '$id'");
        if ($sql) {
            exit(json_encode(array("status" => "success")));
        } else {
            exit(json_encode(array("status" => "error")));
        }
    }
    exit(json_encode(array("status" => "error")));
}

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    if (isset($_GET['id'])){
        $id = $mysqli->real_escape_string($_GET['id']);
        $sql = $mysqli->query("DELETE FROM users WHERE id = '$id'");
        if ($sql) {
            exit(json_encode(array("status" => "success")));
        } else {
            exit(json_encode(array("status" => "error")));
        }
    }
    exit(json_encode(array("status" => "error")));
}

?>