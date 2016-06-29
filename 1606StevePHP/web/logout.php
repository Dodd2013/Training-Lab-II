<?php
	session_start();
	if(isset($_SESSION['uid'])){
		session_unset();
		session_destroy();
		echo $_GET['callback']."(".'{"msg":"ok"}'.");";
	}
	else{
		echo $_GET['callback']."(".'{"msg":"error"}'.");";
	}
	
?>