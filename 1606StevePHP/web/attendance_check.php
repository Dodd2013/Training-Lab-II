<?php
	//该页面：传入 课程名course 和 班级名batch，查询该课的班级学生名单，并统计出了上课次数
	require_once('../configure/condata.php');
	require_once('../configure/check_result.php');

	if(isset($_GET['course'])&&isset($_GET['batch'])){
		$query="select a.uid, u.uname, a.course, a.batch, count(*)'Attendance Times' from attendance a join user u on a.uid=u.uid 
where a.course='".$_GET['course']."' and a.batch='".$_GET['batch']."' group by a.course, a.uid;";
		check_result($query);
	}
	else{
		echo $_GET['callback']."(".'{"msg":"error"}'.");";
	}
	//{"table":[{"uid":"1","uname":"1","course":"math","batch":"op01","Attendance Times":"2"},{"uid":"a","uname":"a","course":"math","batch":"op01","Attendance Times":"1"}],"msg":"ok"}
?>