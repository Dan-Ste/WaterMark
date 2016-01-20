<?php 
	if ( isset($_GET['exit']) ){
		session_start();
		if(isset($_SESSION['pathToMainFile']))
			unlink($_SESSION['pathToMainFile']);
		if(isset($_SESSION['pathToMarkFile']))
			unlink($_SESSION['pathToMarkFile']);
		session_destroy();
	}
?>