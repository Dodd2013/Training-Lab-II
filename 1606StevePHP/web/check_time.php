<?php
	require_once('../configure/condata.php');
	//require_once('../configure/check_result.php');

	if(isset($_GET['exid'])){
		$query="select now()'nowtime';";
		$nowtime=mysql_fetch_array(mysql_query($query), MYSQL_ASSOC);
		$query="select starttime, endtime from examsche where exid='b';";
		$examtime=mysql_fetch_array(mysql_query($query), MYSQL_ASSOC);
		if($nowtime['nowtime']<$examtime['starttime']){
			echo $_GET['callback']."(".'{"msg":"ok", "state":"no"}'.");";
		}
		elseif ($nowtime['nowtime']>=$examtime['starttime']&&$nowtime['nowtime']<=$examtime['endtime']) {
			echo $_GET['callback']."(".'{"msg":"ok", "state":"now"}'.");";
		}
		elseif ($nowtime['nowtime']>$examtime['endtime']) {
			echo $_GET['callback']."(".'{"msg":"ok", "state":"end"}'.");";
		}
	}
	else{
		echo $_GET['callback']."(".'{"msg":"ok"}'.");";
	}
?>