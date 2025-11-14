<?php
namespace FormCraft\Controllers;

if (!defined('ABSPATH')) exit;

class RestController {
    public function register_routes() {
        register_rest_route('fcp/v1', '/forms', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_forms'),
            'permission_callback' => function() { return current_user_can('manage_options'); }
        ));

        register_rest_route('fcp/v1', '/forms', array(
            'methods' => 'POST',
            'callback' => array($this, 'create_form'),
            'permission_callback' => function() { return current_user_can('manage_options'); },
            'args' => array(
                'title' => array('required' => true),
            )
        ));

        register_rest_route('fcp/v1', '/forms/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_form'),
            'permission_callback' => function() { return current_user_can('manage_options'); }
        ));

        register_rest_route('fcp/v1', '/forms/(?P<id>\d+)', array(
            'methods' => 'PUT',
            'callback' => array($this, 'update_form'),
            'permission_callback' => function() { return current_user_can('manage_options'); }
        ));

        register_rest_route('fcp/v1', '/forms/(?P<id>\d+)', array(
            'methods' => 'DELETE',
            'callback' => array($this, 'delete_form'),
            'permission_callback' => function() { return current_user_can('manage_options'); }
        ));

        register_rest_route('fcp/v1', '/entries', array(
            'methods' => 'POST',
            'callback' => array($this, 'submit_entry'),
            'permission_callback' => '__return_true'
        ));

        register_rest_route('fcp/v1', '/entries/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_entry'),
            'permission_callback' => function() { return current_user_can('manage_options'); }
        ));

        register_rest_route('fcp/v1', '/forms/(?P<id>\d+)/entries', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_form_entries'),
            'permission_callback' => function() { return current_user_can('manage_options'); }
        ));

        register_rest_route('fcp/v1', '/entries/(?P<id>\d+)', array(
            'methods' => 'DELETE',
            'callback' => array($this, 'delete_entry'),
            'permission_callback' => function() { return current_user_can('manage_options'); }
        ));
    }

    public function get_forms($request) {
        global $wpdb;
        $table = $wpdb->prefix . 'fcp_forms';
        $rows = $wpdb->get_results("SELECT id, title, created_at FROM $table ORDER BY id DESC", ARRAY_A);
        return rest_ensure_response($rows);
    }

    public function create_form($request) {
        global $wpdb;
        $table = $wpdb->prefix . 'fcp_forms';
        $title = sanitize_text_field($request->get_param('title'));

        $res = $wpdb->insert($table, array('title' => $title), array('%s'));
        if ($res === false) return new \WP_Error('db_insert', 'Cannot insert', array('status' => 500));
        return rest_ensure_response(array('id' => $wpdb->insert_id));
    }

    public function get_form($request) {
        global $wpdb;
        $id = intval($request['id']);
        $forms_table = $wpdb->prefix . 'fcp_forms';
        $fields_table = $wpdb->prefix . 'fcp_fields';
        
        $form = $wpdb->get_row($wpdb->prepare("SELECT * FROM $forms_table WHERE id = %d", $id), ARRAY_A);
        if (!$form) return new \WP_Error('not_found', 'Form not found', array('status' => 404));
        
        $fields = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $fields_table WHERE form_id = %d ORDER BY position ASC", 
            $id
        ), ARRAY_A);
        
        $form['fields'] = array_map(function($field) {
            $field['field_meta'] = json_decode($field['field_meta'], true);
            return $field;
        }, $fields);
        
        $form['settings'] = json_decode($form['settings'], true);
        
        return rest_ensure_response($form);
    }

    public function update_form($request) {
        global $wpdb;
        $id = intval($request['id']);
        $forms_table = $wpdb->prefix . 'fcp_forms';
        $fields_table = $wpdb->prefix . 'fcp_fields';
        
        $title = sanitize_text_field($request->get_param('title'));
        $fields = $request->get_param('fields');
        $settings = $request->get_param('settings');
        
        // Update form
        $wpdb->update(
            $forms_table,
            array(
                'title' => $title,
                'settings' => json_encode($settings)
            ),
            array('id' => $id),
            array('%s', '%s'),
            array('%d')
        );
        
        // Delete old fields
        $wpdb->delete($fields_table, array('form_id' => $id), array('%d'));
        
        // Insert new fields
        if (is_array($fields)) {
            foreach ($fields as $index => $field) {
                $wpdb->insert(
                    $fields_table,
                    array(
                        'form_id' => $id,
                        'field_key' => sanitize_text_field($field['id']),
                        'field_type' => sanitize_text_field($field['type']),
                        'field_meta' => json_encode($field),
                        'position' => $index
                    ),
                    array('%d', '%s', '%s', '%s', '%d')
                );
            }
        }
        
        return rest_ensure_response(array('success' => true, 'id' => $id));
    }

    public function delete_form($request) {
        global $wpdb;
        $id = intval($request['id']);
        $forms_table = $wpdb->prefix . 'fcp_forms';
        $fields_table = $wpdb->prefix . 'fcp_fields';
        
        // Delete fields first
        $wpdb->delete($fields_table, array('form_id' => $id), array('%d'));
        
        // Delete form
        $res = $wpdb->delete($forms_table, array('id' => $id), array('%d'));
        if ($res === false) return new \WP_Error('db_delete', 'Cannot delete', array('status' => 500));
        
        return rest_ensure_response(array('success' => true, 'id' => $id));
    }

    public function submit_entry($request) {
        global $wpdb;
        $form_id = intval($request->get_param('form_id'));
        $entry_data = $request->get_param('data');
        
        // Validate form exists
        $forms_table = $wpdb->prefix . 'fcp_forms';
        $form = $wpdb->get_row($wpdb->prepare("SELECT * FROM $forms_table WHERE id = %d", $form_id), ARRAY_A);
        if (!$form) return new \WP_Error('not_found', 'Form not found', array('status' => 404));
        
        // Sanitize entry data
        $sanitized_data = array();
        foreach ($entry_data as $key => $value) {
            $sanitized_data[sanitize_text_field($key)] = sanitize_textarea_field($value);
        }
        
        // Insert entry
        $entries_table = $wpdb->prefix . 'fcp_entries';
        $res = $wpdb->insert(
            $entries_table,
            array(
                'form_id' => $form_id,
                'entry_data' => json_encode($sanitized_data)
            ),
            array('%d', '%s')
        );
        
        if ($res === false) return new \WP_Error('db_insert', 'Cannot insert entry', array('status' => 500));
        
        return rest_ensure_response(array(
            'success' => true,
            'entry_id' => $wpdb->insert_id,
            'message' => 'فرم با موفقیت ارسال شد'
        ));
    }

    public function get_entry($request) {
        global $wpdb;
        $id = intval($request['id']);
        $table = $wpdb->prefix . 'fcp_entries';
        $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table WHERE id = %d", $id), ARRAY_A);
        if (!$row) return new \WP_Error('not_found', 'Entry not found', array('status' => 404));
        
        $row['entry_data'] = json_decode($row['entry_data'], true);
        return rest_ensure_response($row);
    }

    public function get_form_entries($request) {
        global $wpdb;
        $form_id = intval($request['id']);
        $table = $wpdb->prefix . 'fcp_entries';
        
        $entries = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $table WHERE form_id = %d ORDER BY created_at DESC",
            $form_id
        ), ARRAY_A);
        
        foreach ($entries as &$entry) {
            $entry['entry_data'] = json_decode($entry['entry_data'], true);
        }
        
        return rest_ensure_response($entries);
    }

    public function delete_entry($request) {
        global $wpdb;
        $id = intval($request['id']);
        $table = $wpdb->prefix . 'fcp_entries';
        
        $res = $wpdb->delete($table, array('id' => $id), array('%d'));
        if ($res === false) return new \WP_Error('db_delete', 'Cannot delete entry', array('status' => 500));
        
        return rest_ensure_response(array('success' => true, 'id' => $id));
    }
}
