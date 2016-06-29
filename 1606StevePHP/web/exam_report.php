<?php
	require_once('../configure/condata.php');
	require_once('../configure/check_result.php');

	if(isset($_GET['examid'])){
		$query="select s.uid, s.exid, e.testid, sum(s.answer!=q.awkey)'fault amount',sum(s.answer=q.awkey)'correct amount',(sum(s.answer=q.awkey)/(sum(s.answer!=q.awkey)+sum(s.answer=q.awkey))*100)'correct percent' 
from stuexam s join question q join examsche e on s.queid=q.queid and s.exid=e.exid group by s.uid, s.exid having s.exid='".$_GET['examid']."';";
		check_result($query);
	}
	else{
		echo $_GET['callback']."(".'{"msg":"error"}'.");";
	}
	//返回值({"table":[{"uid":"b","exid":"a","testid":"l","fault amount":"2","correct amount":"2"}],"msg":"ok"});
?>