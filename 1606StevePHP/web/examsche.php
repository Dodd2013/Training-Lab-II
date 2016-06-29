<?php
	require_once('../configure/condata.php');
	require_once('../configure/check_result.php');
	
	function up($examid, $date, $testid, $keycode){
		if(isset($examid)&&isset($date)&&!isset($testid)&&!isset($keycode)){
			$query="update examsche set tim='".$date."' where exid='".$examid."';";
			check_result($query);
		}
		elseif (isset($examid)&&isset($date)&&isset($testid)&&isset($keycode)) {
			$query="update examsche set tim='".$date."', testid='".$testid."', keycode='".$keycode."' where exid='".$examid."';";
			check_result($query);
		}
		elseif (isset($examid)&&!isset($date)&&isset($testid)&&!isset($keycode)) {
			$query="update examsche set testid='".$testid."' where exid='".$examid."';";
			check_result($query);
		}
		elseif (isset($examid)&&!isset($date)&&!isset($testid)&&isset($keycode)) {
			$query="update examsche set keycode='".$keycode."' where exid='".$examid."';";
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
				ad('examsche',$_GET['values']); //传入examsche时的格式 [["exam_id","test_id","starttime","endtime","keycode"],["e","e","2016-06-19 10:00","2016-06-19 12:00","wdasda"]]
				break;
			case 'delete':
				require_once('../configure/delete.php');
				dele('examsche','exid',$_GET['examid']);
				break;
			case 'update':
				up($_GET['examid'], $_GET['date'], $_GET['testid'], $_GET['keycode']);
				break;
			case 'showtable':
				require_once('../configure/showtable.php');
				showtable('examsche');//({"table":[{"exid":"a","testid":"l","tim":"2016-11-01"},{"exid":"c","testid":"c","tim":"2016-06-19"},{"exid":"b","testid":"b","tim":"2016-06-19"},{"exid":"d","testid":"d","tim":"2016-06-19"},{"exid":"e","testid":"e","tim":"2016-06-19"}],"msg":"ok"});
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

