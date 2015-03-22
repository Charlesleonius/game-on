jQuery(document).ready( function () {
	jQuery('#records_tabs').tabs();
	go_update_graph();
});

function go_toggle (source){
	checkboxes = jQuery('.go_checkbox');
	for(var i=0, n=checkboxes.length;i<n;i++) {
		checkboxes[i].checked = source.checked;
	}
}
function analysis_toggle (source){
	checkboxes = jQuery('#choices input');
	for (var i=0, n=checkboxes.length; i<n; i++) {
		checkboxes[i].checked = source.checked;
	}
}
function go_graphs (datasets){
	// hard-code color indices to prevent them from shifting as
	// countries are turned on/off
	jQuery('#placeholder').empty();
	jQuery('#placeholder').resize();
	window.data = datasets;

	// insert checkboxes 
	var choiceContainer = jQuery("#choices");
	choiceContainer.find("input").click(plotAccordingToChoices);
	function plotAccordingToChoices() {
		var data = [];
		choiceContainer.find("input:checked").each(function () {
			var key = jQuery(this).attr("name");
			if(!jQuery(this).is('[who]')){
				if (datasets && key && datasets[key]){
					data.push(datasets[key]);
				}
			}
		});
		var i = 0;
		if (data.length > 0) {
			if(jQuery('#go_selection').val() == 0){
				var bonus_currency = bonus_currency_limit.limit.split(',');
				var markings = [
					{ color: "rgba(255,228,0,.4)", yaxis: {from: bonus_currency[2], to: bonus_currency[3] } },
					{ color: "rgba(255,103,0,.4)", yaxis: {from: bonus_currency[1], to: bonus_currency[2] } },
					{ color: "rgba(204,0,0,.4)", yaxis: {from: bonus_currency[0], to: bonus_currency[1] } },
					{ color: "rgba(70,70,70,.8)", yaxis: {to: bonus_currency[0] } },
					{ color: "rgba(0,193,0,.4)", yaxis: { from: bonus_currency[3] } },];
			} else {
				var markings = '';
			}
			var plot = 	jQuery.plot("#placeholder", data, {	
				xaxis: {
					tickDecimals: 0,
					mode : "time",
					timezone: "browser" ,
					timeformat: "%m/%d",
				},
				legend:{
					show:false
				},
				series: {
					lines: {
						show: true,
						hoverable: true,
						},
					points: {
						show: true
						}
				},
				zoom: {
					interactive: true
				},
				pan: {
					interactive: true
				},
				grid:{
					markings: markings,
					hoverable: true,
				}
			});
				
			window.plot = plot;
			var previousPoint = null;
			jQuery("#placeholder").bind("plothover", function (event, pos, item) {
				var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
				jQuery("#hoverdata").text(str);
				if (item) {
					if (previousPoint != item.dataIndex) {
						previousPoint = item.dataIndex;
						jQuery("#tooltip").remove();
						var x = new Date(parseInt(item.datapoint[0].toFixed(2),10)).toString();
						y = item.datapoint[1].toFixed(2);
						showTooltip(item.pageX, item.pageY,
						item.series.label + " on " + x + " = " + y);
					}
				} else {
					jQuery("#tooltip").remove();
					previousPoint = null;            
				}
			
			});	
		}
		jQuery("<div class='button' style='right:20px;top:9px;width:100px;text-align:center;line-height: 20px;'>Zoom Out</div>").appendTo(jQuery('#placeholder')).click(function (event) {
				event.preventDefault();
				plot.zoomOut();
		});
		var startData = data;
	}
	plotAccordingToChoices();
	
}

function highlight_click(box){
	var key = jQuery(box).attr('key');
	if(!jQuery(box).hasClass('highlight_box_clicked')){
		for( var j = 0;j < window.plot.getData().length; j++ ){
			if(window.plot.getData()[j]['label'] == key){
				for(var i = 0; i < window.plot.getData()[j].data.length; i++ ){
					window.plot.highlight(window.plot.getData()[j], window.plot.getData()[j].data[i]);		
				}
			}
		}
	} else {
		for( var j = 0;j < window.plot.getData().length; j++ ){
			if(window.plot.getData()[j]['label'] == key){
				for(var i = 0; i < window.plot.getData()[j].data.length; i++ ){
					window.plot.unhighlight(window.plot.getData()[j], window.plot.getData()[j].data[i]);		
				}
			}
		}
	}
	jQuery(box).toggleClass("highlight_box_clicked");
}
function showTooltip(x, y, contents) {
			jQuery("<div id='tooltip'>" + contents + "</div>").css({
				position: "absolute",
				display: "none",
				top: y + 5,
				left: x + 5,
				border: "1px solid #fdd",
				padding: "2px",
				"background-color": "#fee",
				opacity: 0.80
			}).appendTo("body").fadeIn(200);
		}
// runs on analysis tab click, data collection, or points/currency/time select change
function go_update_graph(){
	var go_class_a = new Array();
	jQuery('.go_class_a').each(function(){
		el = jQuery(this);
		if(el.prop('checked')){
			go_class_a.push(el.val());	
		}else{
			id = el.prop('name');
			jQuery('#' + id + ' input').prop('checked', false);	
		}
	});
	var go_choices_checked = jQuery('.go_class_a_results input:checked');
	var go_choices_checked_names = new Array();
	go_choices_checked.each(function() {
        go_choices_checked_names.push(jQuery(this).prop('name'));
    });
	jQuery.ajax({
		type: "post",
		url: MyAjax.ajaxurl,
		data: { 
			action: 'go_clipboard_get_data',
			go_graph_selection: jQuery('#go_selection').val(),
			go_class_a: go_class_a,
			go_choices_checked_names: go_choices_checked_names
		},
		success: function(html){
			datasets = jQuery.parseJSON(html);
			jQuery('.go_class_a_results').empty();
			jQuery('.go_class_a_results').each(function(index, element) {
				var all_class = jQuery(element).attr('id');
				jQuery(element).append('<div class="go_select_all" id="go_select_all_' + all_class + '"><input type="checkbox" name="all_' + all_class + '" onclick="go_select_all_from_class(this, \'' + all_class + ' \');" who="all">Select All</div>');
				if(jQuery('#' + all_class + '').prev().prev().prop('checked')){
					jQuery('#go_select_all_' + all_class + '').show();	
				}
            });
			for(var user in datasets){
				if(user != 'checked'){
					var user_name = user;
					var user = datasets[user];
					var user_class = user['class_a'];
					for (class_a in user_class){
						class_div = user_class[class_a].toLowerCase().replace(/\s+/g, '');
						jQuery('#'+class_div+'').append('<input type="checkbox" name="' + user_name +'"></input><label class="highlight_box" onClick="highlight_click(this);" key="'+ user['label']+'">Highlight</label><label>'+user['label'] +'</label><br/>');
					}
				}else{
					for(checked in datasets[user]){
						jQuery('input[name="' + datasets[user][checked] +'"]').prop('checked', true);	
					}
				}
			}
			go_graphs(datasets);
		}
	});
}

// for use in 'select all' checkboxes underneath each period in the analysis tab
function go_select_all_from_class(el, class_a){
	if(jQuery(el).prop('checked')){
		// find all inputs in the same period as the select all checkbox
		jQuery('#' + class_a + ' input').each(function(){
			// checks each checkbox for users in period where select all checkbox is found
			jQuery(this).prop('checked', true);
		});	
	}else{
		// unchecks users
		jQuery('#' + class_a + ' input').each(function(){
			jQuery(this).prop('checked', false);
		});	
	}
}

function go_clipboard_class_a_choice(){
	jQuery.ajax({
		type: "post",
		url: MyAjax.ajaxurl,
		data: { 
			action: 'go_clipboard_intable',
			go_clipboard_class_a_choice: jQuery('#go_clipboard_class_a_choice').val()
		},
		success: function(html){
			jQuery('#go_clipboard_table_body').html('');
			var oTable = jQuery('#go_clipboard_table').dataTable();
			oTable.fnDestroy();
			jQuery('#go_clipboard_table_body').html(html);	
			jQuery('#go_clipboard_table').dataTable( {
				"bPaginate": false,
				"aaSorting": [[2, "asc" ]]
			});
		}
	});
}

function go_user_focus_change (user_id,element) {
	jQuery.ajax({
		type: "POST",
		url: MyAjax.ajaxurl,
		data:{
			action: 'go_update_user_focuses',
			new_user_focus: jQuery(element).val(),
			user_id: user_id
		},
		success: function(response) {
			console.log(response);
		}
	});
}

function check_null(val){
	if(val != ''){
		return val;
	}else{
		return 0;
	}
}

function go_clipboard_add (id) {
	var values = [];
	jQuery('#go_send_message').prop('disabled', 'disabled');
	jQuery("input:checkbox[name=go_selected]:checked").each(function () {
		values.push(jQuery(this).val());
	});

	if (values.length > 0) {
		add_points = parseFloat(check_null(jQuery('#go_clipboard_points').val()));
		add_currency = parseFloat(check_null(jQuery('#go_clipboard_currency').val()));
		add_bonus_currency = parseFloat(check_null(jQuery('#go_clipboard_bonus_currency').val()));
		add_penalty = parseFloat(check_null(jQuery('#go_clipboard_penalty').val()));
		add_minutes = parseFloat(check_null(jQuery('#go_clipboard_minutes').val()));
		
		if (jQuery('#go_clipboard_reason').val() != '') {
			reason = jQuery('#go_clipboard_reason').val();	
		} else {
			reason = jQuery('#go_clipboard_reason').attr('placeholder');	
		}
		// console.log(reason);
		jQuery.ajax({
			type: "post",
			url: MyAjax.ajaxurl,
			data: { 
				action: 'go_clipboard_add',
				ids: values,
				points: add_points,
				currency: add_currency,
				bonus_currency: add_bonus_currency,
				penalty: add_penalty,
				reason: reason,
				minutes: add_minutes,
				badge_ID: jQuery('#go_clipboard_badge').val()
			},
			success: function (html) {
				if (jQuery('#go_clipboard_reason').val() != '') {
					if (jQuery('#go_clipboard_badge').val() != '') {
						badge_count = 1;
					} else {
						badge_count = 0;	
					}
					for (id in values) {
						var user_currency = parseFloat(jQuery('#user_'+values[id]+' .user_currency').html());
						var user_bonus_currency = parseFloat(jQuery('#user_'+values[id]+' .user_bonus_currency').html());
						var user_penalty = parseFloat(jQuery('#user_'+values[id]+' .user_penalty').html());
						var user_points = parseFloat(jQuery('#user_'+values[id]+' .user_points').html());
						var user_badge_count = parseFloat(jQuery('#user_'+values[id]+' .user_badge_count').html());
						var user_minutes = parseFloat(jQuery('#user_'+values[id]+' .user_minutes').html());
			
						jQuery('#user_'+values[id]+' .user_currency').html(user_currency + add_currency);
						jQuery('#user_'+values[id]+' .user_bonus_currency').html(user_bonus_currency + add_bonus_currency);
						jQuery('#user_'+values[id]+' .user_penalty').html(user_penalty + add_penalty);
						jQuery('#user_'+values[id]+' .user_points').html(user_points + add_points);
						jQuery('#user_'+values[id]+' .user_badge_count').html(user_badge_count + badge_count);
						jQuery('#user_'+values[id]+' .user_minutes').html(user_minutes + add_minutes);
					}
				}
				go_clipboard_clear_fields();
				jQuery('#go_send_message').prop('disabled', false);
				jQuery('#go_clipboard_table input[type="checkbox"]').removeAttr('checked');
			}
		});
	} else {
		go_clipboard_clear_fields();
		jQuery('#go_send_message').prop('disabled', false);
	}
}

function go_clipboard_clear_fields () {
	jQuery('#go_clipboard_points').val('');
	jQuery('#go_clipboard_currency').val('');
	jQuery('#go_clipboard_bonus_currency').val('');
	jQuery('#go_clipboard_minutes').val('');
	jQuery('#go_clipboard_penalty').val('');
	jQuery('#go_clipboard_reason').val('');
	jQuery('#go_clipboard_badge').val('');
}

function fixmessages(){
	jQuery.ajax({
		type: "POST",
		url: MyAjax.ajaxurl,
		data:{
			action: 'fixmessages'	
		},
		success: function(){
			alert('Messages fixed');	
		}
	});
}

function go_update_script_day(){
	jQuery.ajax({
		type: 'POST',
		url: MyAjax.ajaxurl,
		data:{
			action: 'go_update_script_day',
			new_day: jQuery('#go_day_select').val()
		},
	});
}