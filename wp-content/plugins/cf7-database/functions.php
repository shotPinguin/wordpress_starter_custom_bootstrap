<?php
if (!defined('ABSPATH')) {
    exit('Direct\'s not allowed');
}
/*
 * Support functions
 */
function cf7d_get_posted_data($cf7)
{
    if (!isset($cf7->posted_data) && class_exists('WPCF7_Submission')) {
        // Contact Form 7 version 3.9 removed $cf7->posted_data and now
        // we have to retrieve it from an API
        $submission = WPCF7_Submission::get_instance();
        if ($submission) {
            $data = array();
            $data['title'] = $cf7->title();
            $data['posted_data'] = $submission->get_posted_data();
            $data['uploaded_files'] = $submission->uploaded_files();
            $data['WPCF7_ContactForm'] = $cf7;
            $cf7 = (object) $data;
        }
    }
    return $cf7;
}
function cf7d_no_save_fields()
{
    $cf7d_no_save_fields = array('_wpcf7', '_wpcf7_version', '_wpcf7_locale', '_wpcf7_unit_tag', '_wpcf7_is_ajax_call');
    return apply_filters('cf7d_no_save_fields', $cf7d_no_save_fields);
}
function cf7d_add_more_fields($cf7)
{
    $submission = WPCF7_Submission::get_instance();
    //time
    //$cf7->posted_data['submit_time'] = date_i18n('Y-m-d H:i:s');
    $cf7->posted_data['submit_time'] = date_i18n('Y-m-d H:i:s', $submission->get_meta('timestamp'));
    //ip
    $cf7->posted_data['submit_ip'] = (isset($_SERVER['X_FORWARDED_FOR'])) ? $_SERVER['X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'];
    //user id
    $cf7->posted_data['submit_user_id'] = 0;
    if (function_exists('is_user_logged_in') && is_user_logged_in()) {
        $current_user = wp_get_current_user(); // WP_User
        $cf7->posted_data['submit_user_id'] = $current_user->ID;
    }
    return $cf7;
}
if (!function_exists('cf7d_arr_to_option')) {
    function cf7d_arr_to_option($arr)
    {
        $html = '';
        foreach ($arr as $k => $v) {
            $html .= '<option value="'.$k.'">'.$v.'</option>';
        }
        return $html;
    }
}
/*
 * $data: rows from database
 * $fid: form id
 */
function cf7d_sortdata($data)
{
    $data_sorted = array();
    foreach ($data as $k => $v) {
        if (!isset($data_sorted[$v->data_id])) {
            $data_sorted[$v->data_id] = array();
        }
        $data_sorted[$v->data_id][$v->name] = apply_filters('cf7d_entry_value', $v->value, $v->name);
    }
    
    return $data_sorted;
}
function cf7d_get_db_fields($fid, $filter = true)
{
    global $wpdb;
    $sql = sprintf("SELECT `name` FROM `".$wpdb->prefix."cf7_data_entry` WHERE cf7_id = %d GROUP BY `name`", $fid);
    $data = $wpdb->get_results($sql);

    $fields = array();
    foreach ($data as $k => $v) {
        $fields[$v->name] = $v->name;
    }
    if ($filter) {
        $fields = apply_filters('cf7d_admin_fields', $fields, $fid);
    }
    return $fields;
}
function cf7d_get_entrys($fid, $entry_ids = '', $cf7d_entry_order_by = '')
{
    global $wpdb;
    if (empty($cf7d_entry_order_by)) {
        $cf7d_entry_order_by = '`data_id` DESC';
    }
    $query = sprintf("SELECT * FROM `".$wpdb->prefix."cf7_data_entry` WHERE `cf7_id` = %d AND data_id IN(SELECT * FROM (SELECT data_id FROM `".$wpdb->prefix."cf7_data_entry` WHERE 1 = 1 ".((!empty($entry_ids)) ? "AND `data_id` IN (".$entry_ids.")" : "")." GROUP BY `data_id` ORDER BY " . $cf7d_entry_order_by . ") temp_table) ORDER BY " . $cf7d_entry_order_by, $fid);
    $data = $wpdb->get_results($query);
    return $data;
}
function cf7d_upload_folder()
{
    return apply_filters('cf7d_upload_folder', 'cf7-database');
}
function cf7d_admin_get_field_name($field)
{
    return $field;
}
function cf7d_get_the_first_form()
{
    $forms = WPCF7_ContactForm::find();
    $form = array();
    foreach ($forms as $k => $v) {
        $form = $v;
        break;
    }
    return $form;
}
