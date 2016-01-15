<?php

  session_start();
  require_once '../vendor/autoload.php';

  use PHPImageWorkshop\ImageWorkshop;

  $pathToMain = $_SESSION['pathToMainFile'];
  $pathToMark = $_SESSION['pathToMarkFile'];
  $coef = $_SESSION['coef'];

  $img = ImageWorkshop::initFromPath($pathToMain);
  $mark = ImageWorkshop::initFromPath($pathToMark);

  $left = $_GET['left']*$coef;
  $top = $_GET['top']*$coef;
  $opacity = $_GET['opacity'];
  $margin_bottom = $_GET['margin_bottom']*$coef;
  $margin_right = $_GET['margin_right']*$coef;
  $type = $_GET['type'];

  $mark->opacity($opacity*100);

  if ($type == 'tile') {

    $ih = $img->getHeight();
    $iw = $img->getWidth();
    $mh = $mark->getHeight();
    $mw = $mark->getWidth();

    if($ih < $mh) {
      $mark->resizeInPixel(null, $ih, true);
    }
    if($iw < $mw) {
      $mark->resizeInPixel($iw, null, true);
    }
    for ($newTop = $top ; $newTop < $ih; $newTop = $newTop+$mh+$margin_bottom ) { 
      for ($newLeft = $left ; $newLeft < $iw; $newLeft = $newLeft+$mw+$margin_right ) { 
        $img->addLayerOnTop($mark, $newLeft, $newTop, 'LT');
        $img = $img->getResult();
        $img = ImageWorkshop::initFromResourceVar($img);
      }
    }
  }else{
    $img->addLayerOnTop($mark, $left, $top, "LT");
  }

  $image = $img->getResult();

  include 'fileDownload.php'

?>