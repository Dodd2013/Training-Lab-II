<?php
	//该页面：增删改课程，数据库内的触发器会同步修改 被update的课程的学生出勤课程名
	require_once('../configure/condata.php');
	require_once('../configure/check_result.php');
	require_once('../configure/showtable.php');

	function ad($course){
		$query="insert course values('".$course."');";
		check_result($query);
	}

	function dele($course){
		$query="delete from course where course='".$course."';";
		check_result($query);
	}

	function up($course, $course2){ // course2是要更新后的课程名
		if(isset($course2)){
			$query="update course set course='".$course2."' where course='".$course."';";
			check_result($query);
		}
		else{
			echo $_GET['callback']."(".'{"msg":"error"}'.");";
		}
	}

	if(isset($_GET['opt'])&&isset($_GET['course'])){
		switch ($_GET['opt']) {
			case 'add':
				ad($_GET['course']);
				break;
			case 'delete':
				dele($_GET['course']);
				break;
			case 'update':
				up($_GET['course'], $_GET['course2']);
				break;	
			default:
				echo $_GET['callback']."(".'{"msg":"error"}'.");";
				break;
		}
	}
	elseif (isset($_GET['opt'])&&$_GET['opt']=='showtable') {
		showtable('course');//({"table":[{"course":"456465"},{"course":"fdasg"},{"course":"fdasg4"},{"course":"fds"},{"course":"fdsafdsa"},{"course":"math"}],"msg":"ok"});
	}
	else{
		echo $_GET['callback']."(".'{"msg":"error"}'.");";
	}
?>