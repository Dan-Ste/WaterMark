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
      $arr['name'] = $file['name'];

                        $pathToMain = $_SESSION['pathToMainFile'];
                        $pathToMark = '../'.$path;
                      $img = ImageWorkshop::initFromPath($pathToMain);
                      $mark = ImageWorkshop::initFromPath($pathToMark);
                        $ih = $img->getHeight();
                        $iw = $img->getWidth();
                        $mh = $mark->getHeight();
                        $mw = $mark->getWidth();
                        $coef_hor = 534/$ih;
                        $coef_wert = 652/$iw;
                        $coef = min($coef_wert,$coef_hor,1);
                        $_SESSION['coef'] = 1/$coef;
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
    }
  echo json_encode($arr);
  }

?>