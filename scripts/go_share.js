function go_export_data () {
	
	var fname = jQuery( 'input[name="go_export_fname"]' ).val()  ? jQuery( 'input[name="go_export_fname"]' ).val() : jQuery( 'input[name="go_export_fname"]' ).attr( 'placeholder' );
	
	var export_unfiltered_task_ids = [''];
	var export_unfiltered_store_item_ids = [''];
	var export_task_filters = [''];
	var export_store_filters = [''];
	
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
	
	jQuery( '.go_task_tax_filter' ).each( function () {
		if ( jQuery( this ).is( ':checked' ) && jQuery( this ).val() !== 'all' ) {
			if ( ! ( jQuery( this ).attr( 'tax' ) in export_task_filters )  ) {
				export_task_filters[ jQuery( this ).attr( 'tax' ) ] = [''];
			}
			export_task_filters[ jQuery( this ).attr( 'tax' ) ].push( jQuery( this ).val() );
		}
	});
	
	jQuery( '.go_store_tax_filter' ).each( function () {
		if ( jQuery( this ).is( ':checked' ) && jQuery( this ).val() !== 'all' ) {
			if ( ! ( jQuery( this ).attr( 'tax' ) in export_store_filters ) ) {
				export_store_filters[ jQuery( this ).attr( 'tax' ) ] = [''];
			}
			export_store_filters[ jQuery( this ).attr( 'tax' ) ].push( jQuery( this ).val() );
		}
	});
	
	export_task_filters = jQuery.extend( {}, export_task_filters );
	export_store_filters = jQuery.extend( {}, export_store_filters );
	
	jQuery.ajax({
		type: 'POST',
		url: MyAjax.ajaxurl,
		data: {
			action: 'go_export',
			go_export_fname: fname,
			go_export_unfiltered_task_ids: export_unfiltered_task_ids,
			go_export_unfiltered_store_item_ids: export_unfiltered_store_item_ids,
			go_export_task_filters: export_task_filters,
			go_export_store_filters: export_store_filters
		},
		success: function ( xml_info ) {
			jQuery( 'input[name="go_export_fname"]' ).val( '' );
			jQuery( 'input[name="go_export_tasks[]"]' ).prop( 'checked', false );
			jQuery( 'input[name="go_export_store[]"]' ).prop( 'checked', false );
			jQuery( '.go_task_tax_filter' ).prop( 'checked', false );
			jQuery( '.go_store_tax_filter' ).prop( 'checked', false );
			
			console.log( xml_info );
			
			/*xml_info = JSON.parse( xml_info );
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
			*/
		}
	});
}

function go_import_data () {
	
}