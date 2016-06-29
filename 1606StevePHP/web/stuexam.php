<?php
	require_once('../configure/condata.php');
	require_once('../configure/check_result.php');

	require_once('../configure/add.php');
	ad('stuexam',$_GET['values']);//values=[['uid', 'exid', 'queid', 'answer'],['uid', 'exid', 'queid', 'answer']]
?>