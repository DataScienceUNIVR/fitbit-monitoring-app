<?php
require_once "headers.php";
require("../config/db_conf.php");

$db = Database::getInstance();
$mysqli = $db->getConnection(); 

/** Return 1 if find user with this credential  */
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"));
    if (isset($data)){
        /** Register new user */
        if (isset($data->nome) && isset($data->cognome) && isset($data->cf) && isset($data->email) && isset($data->password)){
            $nome = $mysqli->real_escape_string($data->nome);
            $cognome = $mysqli->real_escape_string($data->cognome);
            $cf = $mysqli->real_escape_string($data->cf);
            $email = $mysqli->real_escape_string($data->email);
            $password = $mysqli->real_escape_string($data->password);

            $sql = $mysqli->query("SELECT * FROM users WHERE email = '$email' OR codice_fiscale = '$cf'");
            $data = $sql->fetch_assoc();
            if(isset($data)){
                /** User already registrated */
                exit(json_encode(array("status" => 0)));
            } else {
                /** Create new user */
                $sql = $mysqli->query("
                    INSERT INTO users (nome, cognome, codice_fiscale, email, password) VALUES
                    ('".$nome."', '".$cognome."', '".$cf."', '".$email."', '".$password."')");
                exit(json_encode($sql));
            }
        /** Login user */
        } else if (isset($data->email) && isset($data->password)){
            $email = $mysqli->real_escape_string($data->email);
            $password = $mysqli->real_escape_string($data->password);
            $sql = $mysqli->query("SELECT * FROM users WHERE email = '$email' AND password = '$password'");
            $data = $sql->fetch_assoc();
        } else {
            exit(json_encode(array("status" => 0)));
        }
        
    } else {
        exit(json_encode(array("status" => 0)));
    }
    exit(json_encode($data));
}

?>