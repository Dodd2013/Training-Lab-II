<?php
	//该页面：增删改 题库中的题目数据
	require_once('../configure/condata.php');
	require_once('../configure/check_result.php');

	/*function ad($queid, $course, $que, $awkey, $a, $b, $c, $d){
		if(isset($queid)&&isset($course)&&isset($que)&&isset($awkey)){
			$query="insert question values('".$queid."','".$course."','".$que."',".$a."','".$b."','".$c."','".$d."','".$awkey."');";
			check_result($query);
		}
		else{
			echo $_GET['callback']."(".'{"msg":"error"}'.");";
		}
	}*/

	/*function dele($queid){
		if(isset($queid)){
			$query="delete from question where queid='".$queid."';";
			check_result($query);
		}
		else{
			echo $_GET['callback']."(".'{"msg":"error"}'.");";
		}
	}*/

	function up($queid, $que, $awkey, $a, $b, $c, $d){ //根据题目id，重新编辑该id的题目内容
		if(isset($queid)&&isset($que)&&isset($awkey)){
			$query="update question set que='".$que."',awkey='".$awkey."',a='".$a."',b='".$b."',c='".$c."',d='".$d."' where queid='".$queid."';";
			check_result($query);
		}
		else{
			echo $_GET['callback']."(".'{"msg":"error"}'.");";
		}
	}

	if(isset($_GET['opt'])){
		switch ($_GET['opt']) {
			case 'add':
				require_once('../configure/add.php');
				ad('question', $_GET['values']); //传入的列名$_GET['queid'], $_GET['que'], $_GET['a'], $_GET['b'], $_GET['c'], $_GET['d'], $_GET['awkey']
				break;
			case 'delete':
				require_once('../configure/delete.php');
				dele('question', 'queid', $_GET['queid']);
				break;
			case 'update':
				up($_GET['queid'], $_GET['que'], $_GET['awkey'], $_GET['a'], $_GET['b'], $_GET['c'], $_GET['d']);
				break;
			case 'showtable':
				require_once('../configure/showtable.php');
				showtable('question');//{"table":[{"queid":"a","course":"math","que":"is dodd smart","a":"yes","b":"no","c":"hello","d":"wawa","awkey":"a"},{"queid":"b","course":"history","que":"is steve smart?","a":"a.yes","b":"b.no","c":"","d":"","awkey":"a"});
				break;	
			default:
				echo $_GET['callback']."(".'{"msg":"error"}'.");";
				break;
		}
	}
	else{
		echo $_GET['callback']."(".'{"msg":"error"}'.");";
	}
?>