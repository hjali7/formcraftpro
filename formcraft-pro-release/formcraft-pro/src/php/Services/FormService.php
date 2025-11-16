<?php
namespace FormCraft\Services;

if (!defined('ABSPATH')) exit;

class FormService {
    public static function find_all() {
        global $wpdb;
        $table = $wpdb->prefix . 'fcp_forms';
        return $wpdb->get_results("SELECT * FROM $table", ARRAY_A);
    }
}
