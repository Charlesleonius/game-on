// JavaScript Document
function go_export_data () {
	
	var fname = jQuery( 'input[name="go_export_fname"]' ).val()  ? jQuery( 'input[name="go_export_fname"]' ).val() : jQuery( 'input[name="go_export_fname"]' ).attr( 'placeholder' );
	
	var export_task_ids = [''];
	var export_store_item_ids = [''];
	
	jQuery( 'input[name="go_export_tasks[]"]' ).each( function () {
		if ( jQuery( this ).is( ':checked' ) && jQuery( this ).val() !== 'all' ) {
			export_task_ids.push( jQuery( this ).val() );
		}
	});
	
	jQuery( 'input[name="go_export_store[]"]' ).each( function () {
		if ( jQuery( this ).is( ':checked' ) && jQuery( this ).val() !== 'all' ) {
			export_store_item_ids.push( jQuery( this ).val() );
		}
	});
	
	
	jQuery.ajax({
		type: 'POST',
		url: MyAjax.ajaxurl,
		data: {
			action: 'go_export',
			go_export_fname: fname,
			go_export_task_ids: export_task_ids,
			go_export_store_item_ids: export_store_item_ids
		},
		success: function ( xml_info ) {
			xml_info = JSON.parse( xml_info );
			console.log( xml_info );
			jQuery.post( 
				xml_info['url'],
				{ 'gooby': 'plz' }
			);
			window.location = xml_info['url'];
			jQuery( 'input[name="go_export_fname"]' ).val( '' );
			jQuery( 'input[name="go_export_tasks[]"]' ).prop( 'checked', false);
			jQuery( 'input[name="go_export_store[]"]' ).prop( 'checked', false);
		}
	});
}

function go_import_data () {
	
}