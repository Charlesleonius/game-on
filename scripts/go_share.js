// JavaScript Document
function go_export_data () {
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
			go_export_task_ids: export_task_ids,
			go_export_store_item_ids: export_store_item_ids
		},
		success: function (html) {
			console.log( html );
		}
	});
}

function go_import_data () {
	
}