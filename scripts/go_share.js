function go_export_data () {
	
	var fname = jQuery( 'input[name="go_export_fname"]' ).val()  ? jQuery( 'input[name="go_export_fname"]' ).val() : jQuery( 'input[name="go_export_fname"]' ).attr( 'placeholder' );
	
	var export_unfiltered_task_ids = [''];
	var export_unfiltered_store_item_ids = [''];
	
	jQuery( 'input[name="go_export_tasks[]"]' ).each( function () {
		if ( jQuery( this ).is( ':checked' ) && jQuery( this ).val() !== 'all' ) {
			export_unfiltered_task_ids.push( jQuery( this ).val() );
		}
	});
	
	jQuery( 'input[name="go_export_store[]"]' ).each( function () {
		if ( jQuery( this ).is( ':checked' ) && jQuery( this ).val() !== 'all' ) {
			export_unfiltered_store_item_ids.push( jQuery( this ).val() );
		}
	});
	
	
	jQuery.ajax({
		type: 'POST',
		url: MyAjax.ajaxurl,
		data: {
			action: 'go_export',
			go_export_fname: fname,
			go_export_unfiltered_task_ids: export_unfiltered_task_ids,
			go_export_unfiltered_store_item_ids: export_unfiltered_store_item_ids
		},
		success: function ( xml_info ) {
			jQuery( 'input[name="go_export_fname"]' ).val( '' );
			jQuery( 'input[name="go_export_tasks[]"]' ).prop( 'checked', false );
			jQuery( 'input[name="go_export_store[]"]' ).prop( 'checked', false );
			
			xml_info = JSON.parse( xml_info );
			var go_download_form = document.createElement( 'form' );
			go_download_form.setAttribute( 'method', 'post' );
			go_download_form.setAttribute( 'action', xml_info['url'] );
			go_download_form.setAttribute( 'class', 'go_xml_form' );
			
			var go_xml_input = document.createElement( 'input' );
			go_xml_input.setAttribute( 'type', 'hidden' );
            go_xml_input.setAttribute( 'name', 'go_xml' );
            go_xml_input.setAttribute( 'value', xml_info['xml'] );
			go_xml_input.setAttribute( 'class', 'go_xml_form' );
			
			go_download_form.appendChild( go_xml_input );
			document.body.appendChild( go_download_form );
			go_download_form.submit();
			
			jQuery( '.go_xml_form' ).remove();
			
		}
	});
}

function go_import_data () {
	
}
