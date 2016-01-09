<?php 
	$file = $_FILES['markfile'];
	if(strstr($file['type'], 'image') && !$file['error']){
		session_start();
		for($i = 0 ,$path = "../uploads/mark\\$i".$file['name']; file_exists($path); $i++)
			$path = "../uploads/mark\\$i".$file['name'];

		if(move_uploaded_file($file['tmp_name'], $path)){
			$_SESSION['pathToMarkFile'] = $path;
		}
	}
?>