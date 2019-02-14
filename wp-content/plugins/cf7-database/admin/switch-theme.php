<?php
if (!defined('ABSPATH')) {
    exit('Direct\'s not allowed');
}
add_action('cf7d_after_bulkaction_btn', 'cf7d_after_bulkaction_switch_theme_cb', 30);
function cf7d_after_bulkaction_switch_theme_cb()
{
    ?>
    <span class="dashicons dashicons-menu cf7d-switch-theme cf7d-switch-theme-vertical active"></span>
    <span class="dashicons dashicons-menu cf7d-switch-theme cf7d-switch-theme-horizontal"></span>
    <?php
}
