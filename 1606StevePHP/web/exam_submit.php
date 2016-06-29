<?php
	require_once('../configure/condata.php');
	require_once('../configure/check_result.php');

	if(isset($_GET['uid'])&&isset($_GET['exid'])){
		$query="select * from stuexam where uid='".$_GET['uid']."' and exid='".$_GET['exid']."';";
		check_result($query);
	}
	else{
		echo $_GET['callback']."(".'{"msg":"error"}'.");";
	}
?>