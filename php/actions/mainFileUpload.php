<?php 
	$file = $_FILES['file_back'];
	if(strstr($file['type'], 'image') && !$file['error']){
		session_start();

		for($i = 0, $path = "uploads/main/$i".$file['name']; file_exists('../'.$path); $i++)
			$path = "uploads/main/$i".$file['name'];

		if(move_uploaded_file($file['tmp_name'], '../'.$path)){
			$_SESSION['pathToMainFile'] = '../'.$path;
      		$_SESSION['type'] = $file['type'];
		}
	}
	echo json_encode('php/'.$path);
?>