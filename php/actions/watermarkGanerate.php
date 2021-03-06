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

    $ih = $img->getHeight();
    $iw = $img->getWidth();
    $mh = $mark->getHeight();
    $mw = $mark->getWidth();

    if($ih < $mh) {
      $mark->resizeInPixel(null, $ih, true);
      $mh = $ih;
      $mw = $mark->getWidth();
    }
    if($iw < $mw) {
      $mark->resizeInPixel($iw, null, true);
      $mh = $mark->getHeight();
      $mw = $iw;
    }


  if ($type == 'tile') { 

    $layer = ImageWorkshop::initVirginLayer($iw+$mw,$mh, null);
    $i = 1;

    for ($newLeft = 0 ; $newLeft < $iw; $newLeft += $mw+$margin_right ){
      $layer->addLayerOnTop($mark, $newLeft, 0, 'LT');
    }
    $i = 0 ;
    for ( $newTop = $top ; $newTop < $ih; $newTop += $mh+$margin_bottom ) { 
      $img->addLayerOnTop($layer, $left, $newTop, 'LT');
      if( !$i % 5){
        $img = $img->getResult();
        $img = ImageWorkshop::initFromResourceVar($img);
      }
    }

  }else{
    $img->addLayerOnTop($mark, $left, $top, "LT");
  }

  $image = $img->getResult();

  require_once 'fileDownload.php'

?>