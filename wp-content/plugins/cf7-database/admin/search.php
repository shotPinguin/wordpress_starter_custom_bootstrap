<?php
if (!defined('ABSPATH')) {
    exit('Direct\'s not allowed');
}
add_action('cf7d_after_bulkaction_btn', 'cf7d_after_bulkaction_search_cb', 40);
function cf7d_after_bulkaction_search_cb()
{
    $url = admin_url('admin.php?page=cf7-data');
    ?>
    <input value="<?php echo ((isset($_GET['search'])) ? esc_attr(wp_unslash($_GET['search'])) : ''); ?>" type="text" class="" id="cf7d-search-q" placeholder="<?php echo _e('Type something...'); ?>" id="" />
    <button data-url="<?php echo esc_url($url); ?>" class="button" type="button" id="cf7d-search-btn"><?php _e('Search'); ?></button>
    <?php
}