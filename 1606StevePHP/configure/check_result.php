<?php
	function check_result($query){
		$result=mysql_query($query);
		if(!$result){
			echo $_GET['callback']."(".'{"msg":"error"}'.");";
		}
		elseif (is_bool($result)&&$result) {//判断返回值的类型是否仅是bool型且为true，而不是查询所得的指针集
			echo $_GET['callback']."(".'{"msg":"ok"}'.");";
		}
		else{
			$arr=array();
			$arr['table']=array();//数组内元素再次声明，成多重数组,分别为table和msg，以只遍历返回在table中的数据
			while($row=mysql_fetch_array($result, MYSQL_ASSOC)){
				array_push($arr['table'], $row);
			}
			$arr['msg']='ok';
			echo $_GET['callback']."(".json_encode($arr).");";
		}
	}
?>