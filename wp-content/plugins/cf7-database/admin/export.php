<?php
if (!defined('ABSPATH')) {
    exit('Direct\'s not allowed');
}
add_action('cf7d_after_bulkaction_btn', 'cf7d_after_bulkaction_btn_export_cb', 10);
function cf7d_after_bulkaction_btn_export_cb($fid)
{
    ?>
    <select id="cf7d-export" name="cf7d-export" data-fid="<?php echo $fid; ?>">
        <option value="-1"><?php _e('Export to...'); ?></option>
        <option value="csv"><?php _e('CSV'); ?></option>
    </select>
    <button class="button action" type="submit" name="btn_export"><?php _e('Export'); ?></button>
    <?php
}
add_action('cf7d_main_post', 'cf7d_export_action_cb');
function cf7d_export_action_cb()
{
    if (isset($_GET['cf7d-export']) && isset($_GET['btn_export'])) {
        add_filter('cf7d_get_current_action', false);
        $fid = (int)$_GET['fid'];
        
        $ids_export = ((isset($_GET['del_id'])) ? implode(',', $_GET['del_id']) : '');

        $type = $_GET['cf7d-export'];
        switch ($type) {
            case 'csv':
                cf7d_export_to_csv($fid, $ids_export);
                break;
            case '-1':
                return;
                break;
            default:
                return;
                break;
        }
    }
}
function cf7d_export_to_csv($fid, $ids_export = '')
{
    global $wpdb;

    $fields = cf7d_get_db_fields($fid);

    $data = cf7d_get_entrys($fid, $ids_export, 'data_id desc');
    $data_sorted = cf7d_sortdata($data);

    header("Content-type: text/x-csv");
    header("Content-Disposition: attachment; filename=cf7-database.csv");
    $fp = fopen('php://output', 'w');
    fputs($fp, "\xEF\xBB\xBF");
    fputcsv($fp, array_values($fields));
    foreach ($data_sorted as $k => $v) {
        $temp_value = array();
        foreach ($fields as $k2 => $v2) {
            $temp_value[] = ((isset($v[$k2])) ? $v[$k2] : '');
        }
        fputcsv($fp, $temp_value);
    }

    fclose($fp);
    exit();
}
