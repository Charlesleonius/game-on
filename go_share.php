<?php

add_action( 'admin_menu', 'go_share' );
function go_share () {
	add_submenu_page( 'game-on-options.php', 'Import/Export', 'Import/Export', 'manage_options', 'go_share', 'go_share_menu' );
}

function go_share_menu() {
	echo plugin_dir_path( __FILE__ );
	?>
    <form method='post'>
        <div id='go_share_tasks'>
            <h1><?php echo ucfirst( go_return_options( 'go_tasks_plural_name' ) ); ?></h1>
        <?php
            $args = array( 
                'post_status' => 'publish',
                'post_type' => 'tasks'
            );
            $tasks = get_posts ( $args );
            foreach ( $tasks as $task ) {
                ?>
                    <div><input type='checkbox' name='go_export_tasks[<?php echo $task->ID; ?>]' /><?php echo get_the_title( $task->ID ); ?></div><br />
                <?php	
            }
        ?>
        </div>
        <div id='go_share_store'>
            <h1><?php echo ucfirst( go_return_options( 'go_store_name' ) ); ?></h1>
        <?php
            $args = array( 
                'post_status' => 'publish',
                'post_type' => 'go_store'
            );
            $items = get_posts ( $args );
            foreach ( $items as $item ) {
                ?>
                    <div><input type='checkbox' name='go_export_store[<?php echo $item->ID; ?>]' /><?php echo get_the_title( $item->ID ); ?></div><br />
                <?php	
            }
        ?>
        </div>
        <input type='submit' value='Export' />
    </form>
    <?php
	
}

?>