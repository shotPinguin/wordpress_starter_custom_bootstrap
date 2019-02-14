<?php

/**
 * @link              https://jeanbaptisteaudras.com/
 * @since             1.0
 * @package           gdpr-data-request-form
 *
 * @wordpress-plugin
 * Plugin Name:       GDPR Data Request Form
 * Plugin URI:        https://jeanbaptisteaudras.com/gdpr-data-request-form
 * Description:       Integrates WordPress Core 4.9.6 GDPR tools to allow users/visitors to request Personal Data export and erasure with front-end forms
 * Version:           1.2
 * Author:            Jean-Baptiste Audras, Directeur technique chez Whodunit
 * Author URI:        https://jeanbaptisteaudras.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       gdpr-data-request-form
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Public
 */
require_once plugin_dir_path( __FILE__ ) . '/includes/data-request.php';
require_once plugin_dir_path( __FILE__ ) . '/public/public.php';
require_once plugin_dir_path( __FILE__ ) . '/public/shortcode.php';
require_once plugin_dir_path( __FILE__ ) . '/public/widget.php';
