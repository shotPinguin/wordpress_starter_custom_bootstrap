<?php

class Cf7_Entries_List extends WP_List_Table
{
    protected $fid;
    protected $fields;

    public function __construct()
    {
        parent::__construct([
            'singular' => __('Entry'), //singular name of the listed records
            'plural' => __('Entries'), //plural name of the listed records
            'ajax' => false, //should this table support ajax?

        ]);
        $this->fid = ((isset($_GET['fid'])) ? (int) $_GET['fid'] : 0);
    }
    public function get_entries($per_page = 5, $page_number = 1)
    {
        global $wpdb;
        $cf7d_entry_order_by = apply_filters('cf7d_entry_order_by', '`data_id` DESC');
        $cf7d_entry_order_by = trim($cf7d_entry_order_by);
        $query = sprintf("SELECT * FROM `".$wpdb->prefix."cf7_data_entry` WHERE `cf7_id` = %d AND data_id IN(SELECT * FROM (SELECT data_id FROM `".$wpdb->prefix."cf7_data_entry` GROUP BY `data_id` LIMIT %d OFFSET %d) temp_table) ORDER BY " . $cf7d_entry_order_by, $this->fid, $per_page, ($page_number - 1) * $per_page);
        $data = $wpdb->get_results($query);

        $data = cf7d_sortdata_and_get_fields($data, $this->fid);
        $data_sorted = $data['data'];
        $this->fields = $data['fields'];
        return $data_sorted;
    }
    public function delete_entry($id)
    {
        global $wpdb;

        $wpdb->delete(
        "{$wpdb->prefix}cf7_data_entry",
        ['data_id' => $id],
        ['%d']
        );
    }
    public function record_count()
    {
        global $wpdb;
        $total = $wpdb->get_results("SELECT data_id FROM `".$wpdb->prefix."cf7_data_entry` WHERE `cf7_id` = " . (int)$this->fid . " GROUP BY `data_id`");
        return count($total);
    }
    public function column_name($item)
    {
        // create a nonce
        $delete_nonce = wp_create_nonce('sp_delete_entry');

        $title = '<strong>'.$item['name'].'</strong>';

        $actions = [
            'delete' => sprintf('<a href="?page=%s&action=%s&customer=%s&_wpnonce=%s">Delete</a>', esc_attr($_REQUEST['page']), 'delete', absint($item['data_id']), $delete_nonce),
        ];

        return $title.$this->row_actions($actions);
    }
    public function column_default($item, $column_name)
    {
        switch ($column_name) {
            case 'address':
            case 'city':
              return $item[ $column_name ];
            default:
              return print_r($item, true); //Show the whole array for troubleshooting purposes
        }
    }
    public function column_cb($item)
    {
        return sprintf(
            '<input type="checkbox" name="bulk-delete[]" value="%s" />', $item['data_id']
        );
    }
    public function get_columns()
    {
        $columns = [
            'cb' => '<input type="checkbox" />',
        ];
        
        return $columns;
    }
    public function get_bulk_actions()
    {
        $actions = [
            'bulk-delete' => 'Delete',
        ];

        return $actions;
    }
    public function prepare_items()
    {
        $this->_column_headers = $this->get_column_info();

        /* Process bulk action */
        $this->process_bulk_action();

        $per_page = $this->get_items_per_page('customers_per_page', 1);
        $current_page = $this->get_pagenum();
        $total_items = $this->record_count();

        $this->set_pagination_args([
        'total_items' => $total_items, //WE have to calculate the total number of items
        'per_page' => $per_page, //WE have to determine how many items to show on a page
        ]);

        $this->items = $this->get_entries($per_page, $current_page);
    }
    public function process_bulk_action()
    {

        //Detect when a bulk action is being triggered...
        if ('delete' === $this->current_action()) {

        // In our file that handles the request, verify the nonce.
        $nonce = esc_attr($_REQUEST['_wpnonce']);

            if (!wp_verify_nonce($nonce, 'sp_delete_customer')) {
                die('Go get a life script kiddies');
            } else {
                $this->delete_entry(absint($_GET['customer']));

                wp_redirect(esc_url(add_query_arg()));
                exit;
            }
        }

        // If the delete bulk action is triggered
        if ((isset($_POST['action']) && $_POST['action'] == 'bulk-delete')
           || (isset($_POST['action2']) && $_POST['action2'] == 'bulk-delete')
        ) {
            $delete_ids = esc_sql($_POST['bulk-delete']);

        // loop over the array of record IDs and delete them
        foreach ($delete_ids as $id) {
            $this->delete_entry($id);
        }

            wp_redirect(esc_url(add_query_arg()));
            exit;
        }
    }
}
