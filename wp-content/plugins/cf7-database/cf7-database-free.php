<?php
/*
 * Plugin Name: Contact Form 7 Database
 * Plugin URI: http://ninjateam.org
 * Description: Contact Form 7 Database is a plugin for WordPress allows you save all submitted from contact form 7 to database and display in Contact > Database menu
 * Version: 1.3
 * Author: NinjaTeam
 * Author URI: http://ninjateam.org
 */
if (!defined('ABSPATH')) {
    exit('Direct\'s not allowed');
}
define('CF7D_FILE', __FILE__);
define('CF7D_PLUGIN_DIR', dirname(__FILE__));
define('CF7D_PLUGIN_URL', plugins_url('', __FILE__));

require_once CF7D_PLUGIN_DIR . '/functions.php';
require_once CF7D_PLUGIN_DIR . '/frontend/init.php';
require_once CF7D_PLUGIN_DIR . '/frontend/save-files.php';

require_once CF7D_PLUGIN_DIR . '/admin/init.php';
require_once CF7D_PLUGIN_DIR . '/admin/edit-settings.php';
require_once CF7D_PLUGIN_DIR . '/admin/edit-value.php';
require_once CF7D_PLUGIN_DIR . '/admin/export.php';
require_once CF7D_PLUGIN_DIR . '/admin/switch-theme.php';
require_once CF7D_PLUGIN_DIR . '/admin/search.php';
