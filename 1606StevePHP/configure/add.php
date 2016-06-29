<?php
	function ad($table, $values){
		$query="insert ".$table." values("; // 例：要用双引号，传入examsche时的格式 values=[["d","d","2016-06-19"],["e","e","2016-06-19"]]
		$values=json_decode($values);
		
		//$values=array_values($values);
		foreach ($values as $tmp) {
			$tmp=array_values($tmp);
			foreach ($tmp as $tmp2) {
				$query.="'".$tmp2."',";
			}
			$query=substr($query, 0, strlen($query)-1);
			$query.="),(";
		}
		$query=substr($query, 0, strlen($query)-2);
		$query.=";";
		check_result($query);
	}
?>