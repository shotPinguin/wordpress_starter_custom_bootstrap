<?php
if (!defined('ABSPATH')) {
    exit('Direct\'s not allowed');
}
add_action('cf7d_admin_after_heading_field', 'cf7d_admin_after_heading_edit_field_func');
function cf7d_admin_after_heading_edit_field_func()
{
    ?>
    <th style="width: 32px;" class="manage-column"><?php _e('Edit'); ?></th>
    <?php
}
/*function cf7d_admin_after_body_edit_field_func($form_id, $row_id)
{
    $edit_url = sprintf(admin_url('admin.php') . '?page=cf7-data&fid=%d&rid=%d&action=edit', $form_id, $row_id);
    ?>
    <td><a href="<?php echo $edit_url; ?>" class=""><?php _e('Edit'); ?></a></td>
    <?php
}*/

add_action('cf7d_admin_after_body_field', 'cf7d_admin_after_body_edit_field_func', 10, 2);
function cf7d_admin_after_body_edit_field_func($form_id, $row_id)
{
    ?>
    <td><a data-rid="<?php echo $row_id; ?>" href="#TB_inline?width=600&height=550&inlineId=cf7d-modal-edit-value" class="thickbox cf7d-edit-value"><?php _e('Edit'); ?></a></td>
    <?php
}

add_action('cf7d_after_admin_form', 'cf7d_after_admin_form_edit_value_func');
function cf7d_after_admin_form_edit_value_func($form_id)
{
    $fields = cf7d_get_db_fields($form_id, false);
    ?>
    <div class="cf7d-modal" id="cf7d-modal-edit-value" style="display:none;">
        <form action="" class="cf7d-modal-form loading" id="cf7d-modal-form-edit-value" method="POST">
            <input type="hidden" name="fid" value="<?php echo $form_id; ?>" />
            <input type="hidden" name="rid" value="" />
            <ul id="cf7d-list-field-for-edit">
                <?php
                $field_settings = get_option('cf7d_settings_field_' . $form_id, array());
                if (count($field_settings) == 0) { //no settings found
                    foreach ($fields as $k => $v) {
                        $label = $v;
                        $loading = __('Loading...');
                        echo sprintf("<li><span class=\"label\">%s</span> <input class=\"field-%s\" type=\"text\" name=\"field[%s]\" value=\"%s\" /></li>", $label, $k, $k, $loading);
                    }
                } else {
                    foreach ($field_settings as $k => $v) {
                        if (isset($fields[$k])) {
                            $show = $field_settings[$k]['show'];
                            $label = $field_settings[$k]['label'];
                            $loading = __('Loading...');
                            echo sprintf("<li><span class=\"label\">%s</span> <input class=\"field-%s\" type=\"text\" name=\"field[%s]\" value=\"%s\" /></li>", $label, $k, $k, $loading);
                            unset($fields[$k]);
                        }
                    }
                    if (count($fields) > 0) {
                        foreach ($fields as $k => $v) {
                            $label = $v;
                            $loading = __('Loading...');
                            echo sprintf("<li><span class=\"label\">%s</span> <input class=\"field-%s\" type=\"text\" name=\"field[%s]\" value=\"%s\" /></li>", $label, $k, $k, $loading);
                        }
                    }
                }
                ?>
            </ul>
            <div class="cf7d-modal-footer">
                <input type="submit" name="cf7d_save_value_field" value="Save Changes" class="button button-primary button-large" />
            </div>
        </form>
    </div>
    <?php
}
//register ajax
add_action('wp_ajax_cf7d_edit_value', 'cf7d_edit_value_ajax_func');
function cf7d_edit_value_ajax_func()
{
    global $wpdb;
    $rid = ((isset($_POST['rid'])) ? (int)$_POST['rid'] : '');
    if (!empty($rid)) {
        $sql = $wpdb->prepare("SELECT * FROM ".$wpdb->prefix."cf7_data_entry WHERE `data_id` = %d", $rid);
        $rows = $wpdb->get_results($sql);
        $return = array();
        foreach ($rows as $k => $v) {
            $return[$v->name] = stripslashes($v->value);
        }
        exit(json_encode($return));
    }
}
//update when button clicked
add_action('cf7d_main_post', 'cf7d_submit_changed_values_cb');
function cf7d_submit_changed_values_cb()
{
    global $wpdb;
    if (isset($_POST['cf7d_save_value_field'])) {
        $fid = (int)$_POST['fid'];
        $rid = (int)$_POST['rid'];
        foreach ($_POST['field'] as $key => $value) {
            $wpdb->query($wpdb->prepare("UPDATE ".$wpdb->prefix."cf7_data_entry SET `value` = %s WHERE `name` = %s AND `data_id` = %d", $value, $key, $rid));
        }
    }
}