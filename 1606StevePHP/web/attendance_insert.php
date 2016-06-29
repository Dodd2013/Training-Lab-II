<?php
	//该页面：传入 上课学生的“uid 课程名 班级名”数组，插入学生的出勤记录
	require_once('../configure/condata.php');
	require_once('../configure/check_result.php');
	require_once('../configure/add.php');
	
	if(isset($_GET['values'])){
		/*$arr=json_decode($_GET); //数组json格式为 "insert":[{"uid":"1","course":"math","batch":"op01"},{"uid":"2","course":"math","batch":"op01"}]
		$error=array();
		foreach ($tmp as $arr) {
			$query="insert attendance values('".$tmp['uid']."','".$tmp['course']."','".$tmp['batch']."');";
			if(!mysql_query($query)){
				array_push($error, $tmp['uid']);
			}
		}
		if($error){
			$error["msg"]="error";
			echo $_GET['callback']."(".json_encode($error).");";
		}*/	
		
		ad('attendance', $_GET['values']);	//[["uid","course","batch"],["uid","course","batch"]]
	}
	else{
		echo $_GET['callback']."(".'{"msg":"error"}'.");";
	}
?>
