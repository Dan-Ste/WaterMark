<?php 

  $type = $_SESSION['type'];
   

  switch ($type) {
    case 'image/png':
        header('Content-type: image/png'); 
        header('Content-Disposition: attachment; filename="filewithmark.jpg"'); 
        imagepng($image, null, 100);
      break;
    case 'image/gif':
        header('Content-type: image/gif'); 
        header('Content-Disposition: attachment; filename="filewithmark.jpg"');
        imagegif($image, null, 100); 
      break;
    default:
        header('Content-type: image/jpeg'); 
        header('Content-Disposition: attachment; filename="filewithmark.jpg"');
        imagejpeg($image, null, 100);
      break;
  }

?>