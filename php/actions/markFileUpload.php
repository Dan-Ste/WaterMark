<?php
  require_once '../vendor/autoload.php';

  use PHPImageWorkshop\ImageWorkshop;

  $file = $_FILES['file_mark'];
  if(strstr($file['type'], 'image') && !$file['error']){
   session_start();
    for($i = 0 ,$path = "uploads/mark/$i".$file['name']; file_exists('../'.$path); $i++)
      $path = "uploads/mark/$i".$file['name'];

    if(move_uploaded_file($file['tmp_name'], '../'.$path)){
      $_SESSION['pathToMarkFile'] = '../'.$path;

      $arr = array('path' =>'php/'.$path);

                        $pathToMain = $_SESSION['pathToMainFile'];
                        $pathToMark = '../'.$path;
                      $img = ImageWorkshop::initFromPath($pathToMain);
                      $mark = ImageWorkshop::initFromPath($pathToMark);
                        $ih = $img->getHeight();
                        $iw = $img->getWidth();
                        $mh = $mark->getHeight();
                        $mw = $mark->getWidth();
                        $ch = 652/$ih;
                        $cw = 534/$iw;

                        $_SESSION['coef'] = min($cw,$ch,1);

                        if($ch < $ch && $iw>$mw) {
                          $arr['height'] = $mh * 652/$ih;
                        }elseif($ih>$mh) {
                          $arr['width'] = $mw * 534/$iw;
                        }
    }
  echo json_encode($arr);
  }

?>