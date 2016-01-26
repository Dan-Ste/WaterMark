<?php

	require_once 'sizeCalculation.php';
	$file = $_FILES['file_back'];
	if(strstr($file['type'], 'image') && !$file['error']){
		session_start();

		if(isset($_SESSION['pathToMainFile']))
			unlink($_SESSION['pathToMainFile']);

		$path = "uploads/main/".uniqid().substr($file['name'],-4);

		if(move_uploaded_file($file['tmp_name'], '../'.$path)){
			$_SESSION['pathToMainFile'] = '../'.$path;
      		$_SESSION['type'] = $file['type'];

      		$arr = array('path' =>'php/'.$path);
			$arr['name'] = $file['name'];

			if( isset($_SESSION['pathToMarkFile']) ){
				$arr['size'] = size_calculation();
			}
		}
		echo json_encode($arr);
	}
	else echo 'error file upload';

?>