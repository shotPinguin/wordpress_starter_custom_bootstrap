<?php
if (!defined('ABSPATH')) {
    exit('Direct\'s not allowed');
}
add_action('cf7d_after_bulkaction_btn', 'cf7d_after_bulkaction_btn_cb', 20);
function cf7d_after_bulkaction_btn_cb()
{
    add_thickbox();
    ?>
    <a href="#TB_inline?width=600&height=550&inlineId=cf7d-modal" id="cf7d_setting_form" class="button action thickbox"><?php _e('Settings'); ?></a>
    <?php
}
add_action('cf7d_after_admin_form', 'cf7d_after_admin_form_cb');
function cf7d_after_admin_form_cb($fid)
{
    $fields = cf7d_get_db_fields($fid, false);
    ?>
    <div id="cf7d-modal" style="display:none;">
        <form action="" id="cf7d-modal-form" method="POST">
            <input type="hidden" name="fid" value="<?php echo $fid; ?>" />
            <ul id="cf7d-list-field">
                <?php
                $field_settings = get_option('cf7d_settings_field_' . $fid, array());
                if ($field_settings == "") {
                    $field_settings = array();
                }
                if (count($field_settings) == 0) { //no settings found
                    foreach ($fields as $k => $v) {
                        $show = 1;
                        $label = $v;
                        $show_hide_field = sprintf('<input type="hidden" class="txt_show" name="field[%s][show]" value="%d" />', $k, $show);
                        echo sprintf("<li class=\"".(($show == 1) ? "show" : "hide")."\"><span class=\"label\">%s</span> <input class=\"\" type=\"text\" name=\"field[%s][label]\" value=\"%s\" /><span class=\"dashicons dashicons-".(($show == 1) ? "visibility" : "hidden")."\"></span>%s</li>", $k, $k, $label, $show_hide_field);
                    }
                } else {
                    foreach ($field_settings as $k => $v) {
                        if (isset($fields[$k])) {
                            $show = $field_settings[$k]['show'];
                            $label = $field_settings[$k]['label'];
                            $show_hide_field = sprintf('<input type="hidden" class="txt_show" name="field[%s][show]" value="%d" />', $k, $show);
                            echo sprintf("<li class=\"".(($show == 1) ? "show" : "hide")."\"><span class=\"label\">%s</span> <input class=\"\" type=\"text\" name=\"field[%s][label]\" value=\"%s\" /><span class=\"dashicons dashicons-".(($show == 1) ? "visibility" : "hidden")."\"></span>%s</li>", $k, $k, $label, $show_hide_field);
                            unset($fields[$k]);
                        }
                    }
                    if (count($fields) > 0) {
                        foreach ($fields as $k => $v) {
                            $show = 1;
                            $label = $v;
                            $show_hide_field = sprintf('<input type="hidden" class="txt_show" name="field[%s][show]" value="%d" />', $k, $show);
                            echo sprintf("<li class=\"".(($show == 1) ? "show" : "hide")."\"><span class=\"label\">%s</span> <input class=\"\" type=\"text\" name=\"field[%s][label]\" value=\"%s\" /><span class=\"dashicons dashicons-".(($show == 1) ? "visibility" : "hidden")."\"></span>%s</li>", $k, $k, $label, $show_hide_field);
                        }
                    }
                    /*
                    foreach ($fields as $k => $v) {
                        $show = ((isset($field_settings[$k])) ? $field_settings[$k]['show'] : 1);
                        $label = ((isset($field_settings[$k])) ? $field_settings[$k]['label'] : $v);
                        $show_hide_field = sprintf('<input type="hidden" class="txt_show" name="field[%s][show]" value="%d" />', $k, $show);
                        echo sprintf("<li class=\"".(($show == 1) ? "show" : "hide")."\"><span class=\"label\">%s</span> <input class=\"\" type=\"text\" name=\"field[%s][label]\" value=\"%s\" /><span class=\"dashicons dashicons-".(($show == 1) ? "visibility" : "hidden")."\"></span>%s</li>", $k, $k, $label, $show_hide_field);
                    }
                    */
                }
                ?>
            </ul>
            <div id="cf7d-modal-footer">
                <input type="submit" name="cf7d_save_field_settings" value="Save Changes" class="button button-primary button-large" />
            </div>
        </form>
    </div>
    <?php
}
add_action('cf7d_main_post', 'cf7d_submit_field_settings_cb');
function cf7d_submit_field_settings_cb()
{
    if (isset($_POST['cf7d_save_field_settings'])) {
        $fid = (int)$_POST['fid'];
        add_option('cf7d_settings_field_' . $fid, $_POST['field'], '', 'no');
        update_option('cf7d_settings_field_' . $fid, $_POST['field']);
    }
}
add_filter('cf7d_admin_fields', 'cf7d_admin_fields_cb', 10, 2);
if (!function_exists('cf7d_admin_fields_cb')) {
    function cf7d_admin_fields_cb($fields, $fid)
    {
        $return = array();
        $field_settings = get_option('cf7d_settings_field_' . $fid, array());
        if ($field_settings == "") {
            $field_settings = array();
        }
        if (count($field_settings) == 0) { //no settings found
            $return = $fields;
        } else {
            foreach ($field_settings as $k => $v) {
                if (isset($fields[$k])) {
                    $show = $field_settings[$k]['show'];
                    if ($show == 1) {
                        $label = $field_settings[$k]['label'];
                        $return[$k] = $label;
                    }
                    unset($fields[$k]);
                }
            }
            if (count($fields) > 0) {
                foreach ($fields as $k => $v) {
                    $return[$k] = $v;
                }
            }
        }
        return $return;
    }
}
