<?php
/**
 * Plugin Name: Automatically Update Permalinks
 * Description: Automatically updates the permalink (slug) of a post or page when its title is changed.
 * Version: 1.0.1
 * Author: Hearken Media
 * Author URI: http://hearkenmedia.com/landing-wp-plugin.php?utm_source=automatically-update-permalinks&utm_medium=link&utm_campaign=wp-plugin-author-uri
 * License: GNU General Public License version 2 or later
 * License URI: http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
 */

add_action('post_updated', 'hm_aup_post_updated', 10, 3);
function hm_aup_post_updated($postId, $after, $before) {
	if ($after->post_title != $before->post_title && empty($_POST['hm_aup_disable'])) {
		$after->post_name = ''; // Reset permalink
		wp_update_post($after);
	}
}

add_action('post_submitbox_start', 'hm_aup_submitbox');
function hm_aup_submitbox() {
	global $post;
	echo('
	<div style="margin-bottom: 8px;">
		<label>
			<input type="checkbox" name="hm_aup_disable" />
			Disable automatic permalink update
		</label>
	</div>
	');
}

?>