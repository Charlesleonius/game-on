<?php

$xml_file = 'downloads/'.$_GET['go_export_fname'].'.xml';

if ( ! is_readable( $xml_file ) ) {
	return;	
} else {
	header( 'Content-Description: File Transfer' );
    header( 'Content-Type: application/octet-stream' );
    header( 'Content-Disposition: attachment; filename=' . basename( $xml_file ) );
    header( 'Expires: 0' );
    header( 'Cache-Control: must-revalidate' );
    header( 'Pragma: public' );
    header( 'Content-Length: ' . filesize( $xml_file ) );
    readfile( $xml_file );
	unlink( $xml_file );
}

?>