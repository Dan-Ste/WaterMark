<?php 
    session_start();
 	$path = $_SESSION['pathToMainFile'];
    $type = $_SESSION['mainFileType'];

   
    if (ob_get_level()) {
      ob_end_clean();
	$filesave = 'myfile.jpg'; 
	header('Content-type: '.$type); 
	header('Content-Disposition: attachment; filename="'.$filesave.'"'); 
	readfile($path); 
	}

	?>