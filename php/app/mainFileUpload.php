<?php 
	$file = $_FILES['mainfile'];
	if(strstr($file['type'], 'image') && !$file['error']){
		session_start();

		for($i = 0 ,$path = "img\main\\$i".$file['name']; file_exists($path); $i++)
			$path = "img\main\\$i".$file['name'];

		if(move_uploaded_file($file['tmp_name'], $path)){
			$_SESSION['pathToMainFile'] = $path;
			$_SESSION['MainFileType'] = $file['type'];
		}
	}
	echo json_encode($_SESSION);
?>