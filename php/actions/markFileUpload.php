<?php
  require_once '../vendor/autoload.php';
  use PHPImageWorkshop\ImageWorkshop;
  include 'sizeCalculation.php';

  $file = $_FILES['file_mark'];

  if(strstr($file['type'], 'image') && !$file['error']){
   session_start();
    for($i = 0 ,$path = "uploads/mark/$i".$file['name']; file_exists('../'.$path); $i++)
      $path = "uploads/mark/$i".$file['name'];
    if(move_uploaded_file($file['tmp_name'], '../'.$path)){
      $_SESSION['pathToMarkFile'] = '../'.$path;
      $arr = array('path' =>'php/'.$path);
      $arr['name'] = $file['name'];
      $arr['size'] = size_calculation();
    }
  echo json_encode($arr);
  }
?>