<?php 
	if ( isset($_GET['exit']) ){
		session_start();
		unlink($_SESSION['pathToMainFile']);
		unlink($_SESSION['pathToMarkFile']);
		session_destroy();
	}
?>