<?php
  
  session_start();

  require_once '../vendor/autoload.php';
  use PHPImageWorkshop\ImageWorkshop;
  require_once 'sizeCalculation.php';

  $file = $_FILES['file_mark'];

  if(isset($_SESSION['pathToMarkFile']))
    unlink($_SESSION['pathToMarkFile']);

  if(strstr($file['type'], 'image') && !$file['error']){

    $path = "uploads/mark/".uniqid().substr($file['name'],-4);

    if(move_uploaded_file($file['tmp_name'], '../'.$path)){
      $_SESSION['pathToMarkFile'] = '../'.$path;
      $arr = array('path' =>'php/'.$path);
      $arr['name'] = $file['name'];
      $arr['size'] = size_calculation();
    }

    echo json_encode($arr);

  }else echo 'error file upload';
?>