<?php
	require_once('../configure/condata.php');
	if(isset($_GET)){
		session_start();
		if(isset($_SESSION['uid'])){ //不用isset去 判断 健 是否存在，直接if判断 会报错
			$query="select * from user where uid='".$_SESSION['uid']."';";
			$result=mysql_query($query); //查询为空，回返回指针，查询失败返回fall
			$row=mysql_fetch_array($result, MYSQL_ASSOC); //将返回结果做成键值对数组返回
			
			$row['msg']='ok';
			echo $_GET['callback']."(".json_encode($row).");";
		}
		else{
			echo $_GET['callback']."(".'{"msg":"error"}'.");";
		}			
	}
?>

