<?php

	session_start();
	require_once '../vendor/autoload.php';

	use PHPImageWorkshop\ImageWorkshop;

	$pathToMain = $_SESSION['pathToMainFile'];
	$pathToMark = $_SESSION['pathToMarkFile'];
	$img = ImageWorkshop::initFromPath($pathToMain);
	$mark = ImageWorkshop::initFromPath($pathToMark);

	$mark->opacity(100);

	$img->addLayerOnTop($mark, 120, 120, "LT");
	$image = $img->getResult();
	header('Content-type: image/png');
	header('Content-Disposition: filename="withMark.png"');
	imagepng($image, null, 8);

?>