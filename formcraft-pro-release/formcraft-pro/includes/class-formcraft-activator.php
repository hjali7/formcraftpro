<?php
if (!defined('ABSPATH')) exit;

class FormCraft_Activator {
    public static function activate() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        $forms_table = $wpdb->prefix . 'fcp_forms';
        $fields_table = $wpdb->prefix . 'fcp_fields';
        $entries_table = $wpdb->prefix . 'fcp_entries';

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        $sql = "CREATE TABLE $forms_table (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            title TEXT NOT NULL,
            settings LONGTEXT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY(id)
        ) $charset_collate;";
        dbDelta($sql);

        $sql = "CREATE TABLE $fields_table (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            form_id BIGINT UNSIGNED NOT NULL,
            field_key VARCHAR(191) NOT NULL,
            field_type VARCHAR(80) NOT NULL,
            field_meta LONGTEXT,
            position INT DEFAULT 0,
            PRIMARY KEY(id)
        ) $charset_collate;";
        dbDelta($sql);

        $sql = "CREATE TABLE $entries_table (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            form_id BIGINT UNSIGNED NOT NULL,
            entry_data LONGTEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY(id)
        ) $charset_collate;";
        dbDelta($sql);
    }
    
    public static function deactivate() {
        // optional: cleanup
    }
}
