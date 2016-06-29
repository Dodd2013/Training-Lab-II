<?php
	 $db_host    = 'localhost';
     $db_username= 'root';
     $db_password= '';
     $db_database= 'base';

   
    $con =mysql_connect($db_host, $db_username, $db_password);
    if (!$con) {
        die('Could not connect!!!');
    }
    mysql_select_db($db_database, $con);
    return $con;
?>