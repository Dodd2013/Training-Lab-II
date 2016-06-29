<?php

	require_once('../configure/check_result.php');

	function showtable($table){
		if(isset($table)){
			$query="select * from ".$table.";";
			check_result($query);
		}
		else{
			echo $_GET['callback']."(".'{"msg":"ok"}'.");";
		}
	}
?>