<?php
	//$error=array();
	//array_push($error, "haha"=>"wawa");
	$error["msg"]="error";
	$error["msg2"]="error2";
	array_push($error, "haha2");
	echo json_encode($error);
	echo json_encode(array_keys($error));
	echo json_encode(array_values($error));
	$str="haha";
	$str.="wawa";
	echo $str;
?>