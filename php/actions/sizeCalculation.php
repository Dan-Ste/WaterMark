<?php 
    @require_once '../vendor/autoload.php';
    use PHPImageWorkshop\ImageWorkshop;
  function size_calculation(){

    @session_start();

    $pathToMain = $_SESSION['pathToMainFile'];
    $pathToMark = $_SESSION['pathToMarkFile'];

    $img = ImageWorkshop::initFromPath($pathToMain);
    $mark = ImageWorkshop::initFromPath($pathToMark);

    $ih = $img->getHeight();
    $iw = $img->getWidth();
    $mh = $mark->getHeight();
    $mw = $mark->getWidth();
    $coef_hor = 534/$ih;
    $coef_wert = 652/$iw;
    $coef = min($coef_wert,$coef_hor,1);

      if($mw/$mh < $iw/$ih) {
        if($mh * $coef < $ih * $coef){
          $arr['height'] = $mh * $coef;
          $arr['width'] = $mw * $coef;
        }else{
          $arr['width'] = $mw * $ih/$mh * $coef;
          $arr['height'] = $ih * $coef;
        }
      }else{
        if($mw * $coef < $iw * $coef){
          $arr['height'] = $mh * $coef;
          $arr['width'] = $mw * $coef;
        }else{
          $arr['height'] = $mh * $iw/$mw * $coef;
          $arr['width'] = $iw * $coef;
        }
      }
    $_SESSION['coef'] = 1/$coef;
    return $arr;
  }
?>