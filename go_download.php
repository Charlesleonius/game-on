<?php

$xml_fname = $_GET['go_export_fname'].'.xml';

header( 'Content-Type: text/xml' );
header( 'Content-Disposition: attachment; filename=' . basename( $xml_fname ) );
header( 'Expires: 0' );
header( 'Cache-Control: must-revalidate' );
header( 'Pragma: public' );

$xml = $_POST['go_xml'];

echo $xml;

?>