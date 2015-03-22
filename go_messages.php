<?php
add_action('admin_bar_init','go_messages_bar');
function go_messages_bar () {
	global $wpdb;
	global $wp_admin_bar;
	$messages = get_user_meta(get_current_user_id(), 'go_admin_messages', true);
		$msg_count = intval($mesages[0]);
		if ($messages[0] > 0) {
			$style = 'background: red;';
			if ($messages[0] == 1) {
				$wp_admin_bar->add_menu( array(
					'title' => 'New message from admin',
					'href' => '#',
					'parent' => 'go_messages'
				));
			} else {
				$wp_admin_bar->add_menu( array(
					'title' => 'New messages from admin',
					'href' => '#',
					'parent' => 'go_messages'
				));
			}
		} else {
			$style = 'background: #222222;';
			$wp_admin_bar->add_menu( array(
				'title' => 'No new messages from admin',
				'href' => '#',
				'parent' => 'go_messages'
			));
		}
		if (!is_admin_bar_showing() || !is_user_logged_in()) {
			return;
		}
		$wp_admin_bar->add_menu( array(
			'title' => '<div style="padding-top:5px;"><div id="go_messages_bar" style="'.$style.'">'.(int)$messages[0].'</div></div>',
			'href' => '#',
			'id' => 'go_messages',
		));
		if (!empty($messages[1])) {
			foreach ($messages[1] as $date => $values) {
				if (preg_match("/[<>]+/", $values[0])) {
					$title_temp = preg_replace("/(<a\s?href=\".*\">)+/", '', $values[0]);
					$title = preg_replace("/(<\/a>)+/", '', $title_temp);
				} else {
					$title = $values[0];
				}
				$style = '';
				$is_seen = true;
				if ((int)$values[1] == 1) {
					$style = 'color: red;';
					$is_seen = false;
				}
				if ($is_seen == false) {
					$seen_elem = date('m-d-Y',$date)." <a class='go_messages_anchor' onClick='go_mark_seen({$date}, \"unseen\"); go_change_seen({$date}, \"unseen\", this);' style='display: inline;' href='#'>Mark Read</a> <a class='go_messages_anchor' onClick='go_mark_seen({$date}, \"remove\");' style='display:inline;' href='#'>Delete</a>";
				} else {
					$seen_elem = date('m-d-Y',$date)." <a class='go_messages_anchor' onClick='go_mark_seen({$date}, \"seen\"); go_change_seen({$date}, \"seen\", this);' style='display: inline;' href='#'>Mark Unread</a> <a class='go_messages_anchor' onClick='go_mark_seen({$date}, \"remove\");' style='display:inline;' href='#'>Delete</a>";
				}
				$wp_admin_bar->add_menu( array(
					'title' => '<div style="'.$style.'">'.$title.'...</div>',
					'href' => '#',
					'id' => $date,
					'parent' => 'go_messages'
				));
				$wp_admin_bar->add_menu( array(
					'title' => $seen_elem,
					'parent' => $date,
					'meta' => array('html' =>  '<div class="go_message_container" style="width:350px;">'.$values[0].'</div>'),
					'id' => rand()
				));
			}
		}
	}

add_action('wp_ajax_go_mark_read','go_mark_read');
function go_mark_read () {
	global $wpdb;
	$messages = get_user_meta(get_current_user_id(), 'go_admin_messages',true);
	if($_POST['type'] == 'unseen'){
		if($messages[1][$_POST['date']][1] == 1){
			$messages[1][$_POST['date']][1] = 0;
			(int)$messages[0] = (int)$messages[0] - 1;
		}
	} else if ($_POST['type'] == 'remove') {
		if($messages[1][$_POST['date']][1] == 1){
			(int)$messages[0] = (int)$messages[0] - 1;
		}	
		unset($messages[1][$_POST['date']]);
	} else if ($_POST['type'] == 'seen') {
		if($messages[1][$_POST['date']][1] == 0){
			$messages[1][$_POST['date']][1] = 1;
			(int)$messages[0] = (int)$messages[0] + 1;
		}
	}
	update_user_meta( get_current_user_id(), 'go_admin_messages', $messages);
	echo JSON_encode(array(0 => $_POST['date'], 1 => $_POST['type'], 2 => $messages[0]));
	die();
}

function go_message_user ($user_id, $message) {
	$current_messages = get_user_meta($user_id, 'go_admin_messages',true);
	$current_messages[1][time()] = array($message, 1);
	krsort($current_messages[1]);
	if(count($current_messages[1]) > 9){
		array_pop($current_messages[1]);
	}
	if(!$current_messages[0]){
		$current_messages[0] = 1;
	} else {
		(int)$current_messages[0] = (int)$current_messages[0] + 1;
		if((int)$current_messages[0] > 9){
			(int)$current_messages[0] = 9;
		}
	}
	update_user_meta( $user_id, 'go_admin_messages', $current_messages);
}
?>