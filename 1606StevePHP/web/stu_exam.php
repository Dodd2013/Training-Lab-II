<?php
	require_once('../configure/condata.php');
	require_once('../configure/check_result.php');

	function getexam(){
		$query="select exid, testid, starttime, endtime from examsche where endtime>now();";
		check_result($query);
	}

	function enterkeycode($examid, $keycode){
		if(isset($examid)&&isset($keycode)){
			$query="select * from examsche where exid='".$examid."' and keycode='".$keycode."';";
			check_result($query);
		}
		else{
			echo $_GET['callback']."(".'{"msg":"error"}'.");";
		}
	}

	function getquestion($exid, $keycode){
		if(isset($exid)&&isset($keycode)){
			$query="select q.queid, q.que, q.a, q.b, q.c, q.d from examsche e join testmake t join question q on e.testid=t.testid and t.queid=q.queid where e.exid='".$exid."' and e.keycode='".$keycode."';";
			check_result($query);
		}
		else{
			echo $_GET['callback']."(".'{"msg":"error"}'.");";
		}
	}

	function checksubmit($uid, $exid){
		if(isset($uid)&&isset($exid)){
			$query="select * from stuexam where uid='".$uid."' and exid='".$exid."';";
			check_result($query);
		}
		else{
			echo $_GET['callback']."(".'{"msg":"error"}'.");";
		}
	}
	
	if(isset($_GET['opt'])){
		switch ($_GET['opt']) {
			case 'getexam': //获取为开始的所有考试
				getexam(); //返回值({"table":[{"exid":"a","testid":"l","starttime":"2015-11-11 11:00:00","endtime":"2015-11-11 11:00:00"}],"msg":"ok"});
				break;
			case 'enterkeycode': //学生输入考试id和keycode，进入考试
				enterkeycode($_GET['exid'], $_GET['keycode']); //查询成功后的返回值 ({"table":[{"exid":"a","testid":"l","starttime":"2015-11-11 11:00:00","endtime":"2015-11-11 11:00:00","keycode":"awdawd"}],"msg":"ok"}); 查询失败后的返回值({"table":[],"msg":"ok"});
				break;
			case 'getquestion':
				getquestion($_GET['exid'], $_GET['keycode']); //根据考试id获取试题，成功返回值({"table":[{"que":"hahahahhaha","a":"","b":"","c":"","d":""}],"msg":"ok"});
				break;
			case 'answer': //学生提交作答
				require_once('../configure/add.php');
				ad('stuexam',$_GET['values']);//values=[["uid", "extid", "queid", "answer"],["uid", "extid", "queid", "answer"]]
				break;
			case 'checksubmit': //检查学生的 作答库 中是否已经有记录，若有此学生记录就视为已经提交考试
				checksubmit($_GET['uid'], $_GET['exid']); //若已经提交，返回值({"table":[{"uid":"b","exid":"a","queid":"a","answer":"a"},{"uid":"b","exid":"a","queid":"d","answer":"a"}],"msg":"ok"});
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
