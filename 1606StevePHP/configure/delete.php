<?php
	function dele($table, $variable, $value){
		if(isset($table)&isset($variable)&isset($value)){
			$query="delete from ".$table." where ".$variable."='".$value."';";
			check_result($query);
		}
		else{
			echo $_GET['callback']."(".'{"msg":"error"}'.");";
		}
	}
?>