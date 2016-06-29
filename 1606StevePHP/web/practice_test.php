<?php
	require_once('../configure/condata.php');
	require_once('../configure/check_result.php');

	if(isset($_GET['testid'])){
		$query="select q.que, q.a, q.b, q.c, q.d from testmake t join question q on t.queid=q.queid where t.testid='a';";
		check_result($query);
	}
	else{
		echo $_GET['callback']."(".'{"msg":"error"}'.");";
	}
?>