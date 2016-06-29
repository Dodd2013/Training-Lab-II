<?php
	require_once('../configure/condata.php');
	if(isset($_GET['uid'])&&isset($_GET['pwd'])){
		$query="select * from user where uid='".$_GET['uid']."' and pwd='".$_GET['pwd']."';";
		$result=mysql_query($query); //查询为空，会返回指针，查询失败返回fall
		$row=mysql_fetch_array($result, MYSQL_ASSOC); //将返回结果做成键值对数组返回,每次返回查询结果中的一行记录
		if($row){
			$row['msg']='ok';
			session_start();
			$_SESSION["uid"]=$_GET['uid'];
			echo $_GET['callback']."(".json_encode($row).");";
		}
		else{
			echo $_GET['callback']."(".'{"msg":"error"}'.");";
		}			
	}else{
		echo $_GET['callback']."(".'{"msg":"error"}'.");";
	}	
?>

