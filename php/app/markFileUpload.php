<?php 
	$file = $_FILES['markfile'];
	if(strstr($file['type'], 'image') && !$file['error']){
		session_start();
		for($i = 0 ,$path = "img\mark\\$i".$file['name']; file_exists($path); $i++)
			$path = "img\mark\\$i".$file['name'];

		if(move_uploaded_file($file['tmp_name'], $path)){
			$_SESSION['pathToMarkFile'] = $path;
			$_SESSION['MarkFileType'] = $file['type'];
		}
	}
?>