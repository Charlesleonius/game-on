
<?php

function go_define_options() {
	global $wpdb;
	$file_name = $real_file = plugin_dir_path( __FILE__ ) . '/' . 'go_definitions.php';
	$array = explode( ',', 'go_tasks_name, go_tasks_plural_name, go_first_stage_name, go_second_stage_name, go_third_stage_name, go_fourth_stage_name, go_fifth_stage_name, go_abandon_stage_button, go_second_stage_button, go_third_stage_button, go_fourth_stage_button, go_fifth_stage_button, go_store_name, go_task_loot_name, go_bonus_loot_name, go_points_name, go_points_prefix, go_points_suffix, go_currency_name, go_currency_prefix, go_currency_suffix, go_bonus_currency_name, go_bonus_currency_prefix, go_bonus_currency_suffix, go_penalty_name, go_penalty_prefix, go_penalty_suffix, go_minutes_name, go_minutes_prefix, go_minutes_suffix, go_level_names, go_level_plural_names, go_organization_name, go_class_a_name, go_class_b_name, go_focus_name, go_stats_name, go_inventory_name, go_badges_name, go_leaderboard_name, go_presets, go_admin_bar_display_switch, go_admin_bar_user_redirect, go_admin_bar_add_switch, go_admin_bar_add_minutes_switch, go_ranks, go_class_a, go_class_b, go_focus_switch, go_focus, go_admin_email, go_video_width, go_video_height, go_email_from, go_store_receipt_switch, go_full_student_name_switch, go_multiplier_switch, go_multiplier_threshold, go_penalty_switch, go_penalty_threshold, go_multiplier_percentage, go_data_reset_switch' );
	$string = '';
	foreach ( $array as $key => $value ) {
		$value = trim( $value );
		$content = get_option( $value );
		if ( is_array( $content ) ) {
			$content = serialize( $content );
		}
		$string .= 'define( "'.$value.'",\''.$content.'\', TRUE );';
	}

	file_put_contents( $file_name, "<?php {$string} ?>" );
}

?>
<?php define( "go_tasks_name",'Quest', TRUE );define( "go_tasks_plural_name",'Quests', TRUE );define( "go_first_stage_name",'Stage 1', TRUE );define( "go_second_stage_name",'Stage 2', TRUE );define( "go_third_stage_name",'Stage 3', TRUE );define( "go_fourth_stage_name",'Stage 4', TRUE );define( "go_fifth_stage_name",'Stage 5', TRUE );define( "go_abandon_stage_button",'Abandon', TRUE );define( "go_second_stage_button",'Accept', TRUE );define( "go_third_stage_button",'Complete', TRUE );define( "go_fourth_stage_button",'Master', TRUE );define( "go_fifth_stage_button",'Repeat Mastery', TRUE );define( "go_store_name",'Store', TRUE );define( "go_task_loot_name",'Quest Loot', TRUE );define( "go_bonus_loot_name",'Bonus Loot', TRUE );define( "go_task_pod",'', TRUE );define( "go_points_name",'Experience', TRUE );define( "go_points_prefix",'', TRUE );define( "go_points_suffix",'XP', TRUE );define( "go_currency_name",'Gold', TRUE );define( "go_currency_prefix",'', TRUE );define( "go_currency_suffix",'g', TRUE );define( "go_bonus_currency_name",'Honor', TRUE );define( "go_bonus_currency_prefix",'', TRUE );define( "go_bonus_currency_suffix",'HP', TRUE );define( "go_penalty_name",'Damage', TRUE );define( "go_penalty_prefix",'', TRUE );define( "go_penalty_suffix",'DP', TRUE );define( "go_minutes_name",'Minutes', TRUE );define( "go_minutes_prefix",'', TRUE );define( "go_minutes_suffix",'m', TRUE );define( "go_level_names",'Level', TRUE );define( "go_level_plural_names",'Levels', TRUE );define( "go_organization_name",'Seating Chart', TRUE );define( "go_class_a_name",'Period', TRUE );define( "go_class_b_name",'Computer', TRUE );define( "go_focus_name",'Profession', TRUE );define( "go_stats_name",'Stats', TRUE );define( "go_inventory_name",'Inventory', TRUE );define( "go_badges_name",'Badges', TRUE );define( "go_leaderboard_name",'Leaderboard', TRUE );define( "go_presets",'a:3:{s:4:"name";a:5:{i:0;s:6:"Tier 1";i:1;s:6:"Tier 2";i:2;s:6:"Tier 3";i:3;s:6:"Tier 4";i:4;s:6:"Tier 5";}s:6:"points";a:5:{i:0;a:5:{i:0;s:1:"5";i:1;s:1:"5";i:2;s:2:"10";i:3;s:2:"30";i:4;s:2:"30";}i:1;a:5:{i:0;s:1:"5";i:1;s:1:"5";i:2;s:2:"20";i:3;s:2:"60";i:4;s:2:"60";}i:2;a:5:{i:0;s:1:"5";i:1;s:1:"5";i:2;s:2:"40";i:3;s:3:"120";i:4;s:3:"120";}i:3;a:5:{i:0;s:1:"5";i:1;s:1:"5";i:2;s:2:"70";i:3;s:3:"210";i:4;s:3:"210";}i:4;a:5:{i:0;s:1:"5";i:1;s:1:"5";i:2;s:3:"110";i:3;s:3:"330";i:4;s:3:"330";}}s:8:"currency";a:5:{i:0;a:5:{i:0;s:1:"0";i:1;s:1:"0";i:2;s:1:"3";i:3;s:1:"9";i:4;s:1:"9";}i:1;a:5:{i:0;s:1:"0";i:1;s:1:"0";i:2;s:1:"6";i:3;s:2:"18";i:4;s:2:"18";}i:2;a:5:{i:0;s:1:"0";i:1;s:1:"0";i:2;s:2:"12";i:3;s:2:"36";i:4;s:2:"36";}i:3;a:5:{i:0;s:1:"0";i:1;s:1:"0";i:2;s:2:"21";i:3;s:2:"63";i:4;s:2:"63";}i:4;a:5:{i:0;s:1:"0";i:1;s:1:"0";i:2;s:2:"33";i:3;s:2:"99";i:4;s:2:"99";}}}', TRUE );define( "go_admin_bar_display_switch",'On', TRUE );define( "go_admin_bar_user_redirect",'On', TRUE );define( "go_admin_bar_add_switch",'On', TRUE );define( "go_admin_bar_add_minutes_switch",'On', TRUE );define( "go_ranks",'a:3:{s:4:"name";a:20:{i:0;s:8:"Level 01";i:1;s:8:"Level 02";i:2;s:8:"Level 03";i:3;s:8:"Level 04";i:4;s:8:"Level 05";i:5;s:8:"Level 06";i:6;s:8:"Level 07";i:7;s:8:"Level 08";i:8;s:8:"Level 09";i:9;s:8:"Level 10";i:10;s:8:"Level 11";i:11;s:8:"Level 12";i:12;s:8:"Level 13";i:13;s:8:"Level 14";i:14;s:8:"Level 15";i:15;s:8:"Level 16";i:16;s:8:"Level 17";i:17;s:8:"Level 18";i:18;s:8:"Level 19";i:19;s:8:"Level 20";}s:6:"points";a:20:{i:0;s:1:"0";i:1;s:3:"150";i:2;s:3:"315";i:3;s:3:"495";i:4;s:3:"690";i:5;s:3:"900";i:6;s:4:"1125";i:7;s:4:"1365";i:8;s:4:"1620";i:9;s:4:"1890";i:10;s:4:"2175";i:11;s:4:"2475";i:12;s:4:"2790";i:13;s:4:"3120";i:14;s:4:"3465";i:15;s:4:"3825";i:16;s:4:"4200";i:17;s:4:"4590";i:18;s:4:"4995";i:19;s:4:"5415";}s:6:"badges";a:20:{i:0;s:0:"";i:1;s:0:"";i:2;s:0:"";i:3;s:0:"";i:4;s:0:"";i:5;s:0:"";i:6;s:0:"";i:7;s:0:"";i:8;s:0:"";i:9;s:0:"";i:10;s:0:"";i:11;s:0:"";i:12;s:0:"";i:13;s:0:"";i:14;s:0:"";i:15;s:0:"";i:16;s:0:"";i:17;s:0:"";i:18;s:0:"";i:19;s:0:"";}}', TRUE );define( "go_class_a",'a:7:{i:0;s:8:"Period 1";i:1;s:8:"Period 2";i:2;s:8:"Period 3";i:3;s:8:"Period 4";i:4;s:8:"Period 5";i:5;s:8:"Period 6";i:6;s:8:"Period 7";}', TRUE );define( "go_class_b",'a:44:{i:0;s:11:"Computer 01";i:1;s:11:"Computer 02";i:2;s:11:"Computer 03";i:3;s:11:"Computer 04";i:4;s:11:"Computer 05";i:5;s:11:"Computer 06";i:6;s:11:"Computer 07";i:7;s:11:"Computer 08";i:8;s:11:"Computer 09";i:9;s:11:"Computer 10";i:10;s:11:"Computer 11";i:11;s:11:"Computer 12";i:12;s:11:"Computer 13";i:13;s:11:"Computer 14";i:14;s:11:"Computer 15";i:15;s:11:"Computer 16";i:16;s:11:"Computer 17";i:17;s:11:"Computer 18";i:18;s:11:"Computer 19";i:19;s:11:"Computer 20";i:20;s:11:"Computer 21";i:21;s:11:"Computer 22";i:22;s:11:"Computer 23";i:23;s:11:"Computer 24";i:24;s:11:"Computer 25";i:25;s:11:"Computer 26";i:26;s:11:"Computer 27";i:27;s:11:"Computer 28";i:28;s:11:"Computer 29";i:29;s:11:"Computer 30";i:30;s:11:"Computer 31";i:31;s:11:"Computer 32";i:32;s:11:"Computer 33";i:33;s:11:"Computer 34";i:34;s:11:"Computer 35";i:35;s:11:"Computer 36";i:36;s:11:"Computer 37";i:37;s:11:"Computer 38";i:38;s:11:"Computer 39";i:39;s:11:"Computer 40";i:40;s:11:"Computer 41";i:41;s:11:"Computer 42";i:42;s:11:"Computer 43";i:43;s:11:"Computer 44";}', TRUE );define( "go_focus_switch",'', TRUE );define( "go_focus",'a:1:{i:0;s:0:"";}', TRUE );define( "go_admin_email",'', TRUE );define( "go_video_width",'', TRUE );define( "go_video_height",'', TRUE );define( "go_email_from",'no-reply@go.net', TRUE );define( "go_store_receipt_switch",'', TRUE );define( "go_full_student_name_switch",'', TRUE );define( "go_multiplier_switch",'', TRUE );define( "go_multiplier_threshold",'10', TRUE );define( "go_penalty_switch",'', TRUE );define( "go_penalty_threshold",'5', TRUE );define( "go_multiplier_percentage",'10', TRUE );define( "go_data_reset_switch",'', TRUE ); ?>

