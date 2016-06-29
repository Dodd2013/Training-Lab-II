<?php
	//该页面：从question题库中，制作生成试卷
	require_once('../configure/condata.php');
	require_once('../configure/check_result.php');

	/*function ad($testid, $queid){
		if(isset($testid)&&isset($queid)){
			$query="insert testmake values('".$testid."','".$queid."');";
			check_result($query);
		}
		else{
			echo $_GET['callback']."(".'{"msg":"error"}'.");";
		}
	}*/

	function dele($testid, $queid){
		if(isset($testid)&&isset($queid)){
			$query="delete from testmake where testid='".$testid."' and queid='".$queid."';";
			check_result($query);
		}
		elseif (isset($testid)) {
			$query="delete from testmake where testid='".$testid."';";
			check_result($query);
		}
		else{
			echo $_GET['callback']."(".'{"msg":"error"}'.");";
		}
	}

	function up($testid, $testid2){
		if(isset($testid)&&isset($testid2)){
			$query="update testmake set testid='".$testid2."' where testid='".$testid."';";
			check_result($query);
		}
		else{
			echo $_GET['callback']."(".'{"msg":"error"}'.");";
		}
	}

	function gettest($testid){
		if(isset($testid)){
			$query="select t.testid, q.* from testmake t join question q on t.queid=q.queid where t.testid='".$testid."';";
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
				ad('testmake',$_GET['values']); //传入的列分别为testid queid
				break;
			case 'delete':
				dele($_GET['testid'], $_GET['queid']);
				break;
			case 'update':
				up($_GET['testid'], $_GET['testid2']);
				break;
			case 'gettest':
				gettest($_GET['testid']);//返回值({"table":[{"testid":"l","queid":"a","course":"math","que":"is dodd smart","a":"yes","b":"no","c":"hello","d":"wawa","awkey":"a"},"msg":"ok"});
				break;
			case 'showtable':
				require_once('../configure/showtable.php');
				showtable('testmake');//返回值({"table":[{"testid":"l","queid":"a"},{"testid":"l","queid":"b"},{"testid":"l","queid":"c"},{"testid":"l","queid":"d"}],"msg":"ok"});
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