<?php
if (!defined('ABSPATH')) {
    exit('Direct\'s not allowed');
}
/*
 * Creating tables when plugin is actived
 */
register_activation_hook(CF7D_FILE, 'cf7d_table_func');
function cf7d_table_func()
{
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    $cf7d_table = $wpdb->prefix.'cf7_data';
    if ($wpdb->get_var("show tables like '$cf7d_table'") != $cf7d_table) {
        $sql = 'CREATE TABLE '.$cf7d_table.' (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `created` timestamp NOT NULL,
        UNIQUE KEY id (id)
        ) '.$charset_collate.';';
        require_once ABSPATH.'wp-admin/includes/upgrade.php';
        dbDelta($sql);
    }

    $cf7d_table_entry = $wpdb->prefix.'cf7_data_entry';
    if ($wpdb->get_var("show tables like '$cf7d_table_entry'") != $cf7d_table_entry) {
        $sql = 'CREATE TABLE '.$cf7d_table_entry.' (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `cf7_id` int(11) NOT NULL,
        `data_id` int(11) NOT NULL,
        `name` varchar(250),
        `value` text,
        UNIQUE KEY id (id)
        ) '.$charset_collate.';';
        require_once ABSPATH.'wp-admin/includes/upgrade.php';
        dbDelta($sql);
    } else {
        require_once ABSPATH.'wp-admin/includes/upgrade.php';
        
        maybe_convert_table_to_utf8mb4($cf7d_table_entry);
        $sql = "ALTER TABLE ".$cf7d_table_entry." change name name VARCHAR(250) character set utf8, change value value text character set utf8;";
        $wpdb->query($sql);
    }
}
/*
 * Installing data to database
 */
add_action('wpcf7_before_send_mail', 'cf7d_before_send_email');
function cf7d_before_send_email($contact_form)
{
    global $wpdb;
    do_action('cf7d_before_insert_db', $contact_form);

    $cf7_id = $contact_form->id();
    $contact_form = cf7d_get_posted_data($contact_form);

    //for database installion
    $contact_form = cf7d_add_more_fields($contact_form);

    //Modify $contact_form
    $contact_form = apply_filters('cf7d_modify_form_before_insert_data', $contact_form);
    //Type's $contact_form->posted_data is array
    $contact_form->posted_data = apply_filters('cf7d_posted_data', $contact_form->posted_data);
    $time = date('Y-m-d H:i:s');
    $wpdb->query($wpdb->prepare('INSERT INTO '.$wpdb->prefix.'cf7_data(`created`) VALUES (%s)', $time));
    $data_id = $wpdb->insert_id;
    //install to database
    $first_form = cf7d_get_the_first_form();
    
    if (!is_null($first_form) && ($cf7_id == $first_form->id())) {
        $cf7d_no_save_fields = cf7d_no_save_fields();
        foreach ($contact_form->posted_data as $k => $v) {
            if (in_array($k, $cf7d_no_save_fields)) {
                continue;
            } else {
                if (is_array($v)) {
                    $v = implode("\n", $v);
                }
                $k = htmlspecialchars($k);
                $v = htmlspecialchars($v);
                $wpdb->query($wpdb->prepare('INSERT INTO '.$wpdb->prefix.'cf7_data_entry(`cf7_id`, `data_id`, `name`, `value`) VALUES (%d,%d,%s,%s)', $cf7_id, $data_id, $k, $v));
            }
        }
        do_action('cf7d_after_insert_db', $contact_form, $cf7_id, $data_id);
    }
    
}
