<?php

$xml = $_POST['gooby'];
$xml_fname = $_GET['go_export_fname'].'.xml';

header( 'Content-Type: text/xml' );
header( 'Content-Disposition: attachment; filename=' . basename( $xml_fname ) );
header( 'Expires: 0' );
header( 'Cache-Control: must-revalidate' );
header( 'Pragma: public' );
header( 'Content-Length: ' . filesize( $xml_fname ) );

echo $xml;

?>