<?php
/**
 * Plugin Name: FormCraft Pro
 * Description: Advanced form builder with AI-generator and Visual Conditional Logic Canvas.
 * Version: 2.2.0
 * Author: LoopArchie
 * Author URI: https://looparc.ir
 * Text Domain: formcraft-pro
 */

if (!defined('ABSPATH')) exit;

// constants
define('FCP_PATH', plugin_dir_path(__FILE__));
define('FCP_URL', plugin_dir_url(__FILE__));
define('FCP_VERSION', '2.2.0');

// autoload (simple)
require_once FCP_PATH . 'includes/class-formcraft-activator.php';
require_once FCP_PATH . 'includes/class-formcraft-frontend.php';
require_once FCP_PATH . 'src/php/Controllers/RestController.php';
require_once FCP_PATH . 'src/php/Services/FormService.php';

register_activation_hook(__FILE__, array('FormCraft_Activator', 'activate'));
register_deactivation_hook(__FILE__, array('FormCraft_Activator', 'deactivate'));

add_action('admin_menu', function() {
    // Main menu
    add_menu_page(
        __('FormCraft', 'formcraft-pro'),
        __('FormCraft', 'formcraft-pro'),
        'manage_options',
        'formcraft-pro',
        'formcraft_pro_admin_page',
        'dashicons-feedback',
        56
    );
    
    // Submenu: Dashboard (default)
    add_submenu_page(
        'formcraft-pro',
        __('Dashboard', 'formcraft-pro'),
        __('Dashboard', 'formcraft-pro'),
        'manage_options',
        'formcraft-pro',
        'formcraft_pro_admin_page'
    );
    
    // Submenu: New Form
    add_submenu_page(
        'formcraft-pro',
        __('فرم جدید', 'formcraft-pro'),
        __('فرم جدید', 'formcraft-pro'),
        'manage_options',
        'formcraft-pro-new',
        'formcraft_pro_admin_page'
    );
    
    // Submenu: Entries
    add_submenu_page(
        'formcraft-pro',
        __('ورودی‌ها', 'formcraft-pro'),
        __('ورودی‌ها', 'formcraft-pro'),
        'manage_options',
        'formcraft-pro-entries',
        'formcraft_pro_admin_page'
    );
    
    // Submenu: Settings
    add_submenu_page(
        'formcraft-pro',
        __('تنظیمات', 'formcraft-pro'),
        __('تنظیمات', 'formcraft-pro'),
        'manage_options',
        'formcraft-pro-settings',
        'formcraft_pro_admin_page'
    );
    
    // Submenu: Import/Export
    add_submenu_page(
        'formcraft-pro',
        __('ورود/خروج اطلاعات', 'formcraft-pro'),
        __('ورود/خروج اطلاعات', 'formcraft-pro'),
        'manage_options',
        'formcraft-pro-import-export',
        'formcraft_pro_admin_page'
    );
    
    // Submenu: System Status
    add_submenu_page(
        'formcraft-pro',
        __('وضعیت سیستم', 'formcraft-pro'),
        __('وضعیت سیستم', 'formcraft-pro'),
        'manage_options',
        'formcraft-pro-system-status',
        'formcraft_pro_admin_page'
    );
    
    // Submenu: Help
    add_submenu_page(
        'formcraft-pro',
        __('راهنما', 'formcraft-pro'),
        __('راهنما', 'formcraft-pro'),
        'manage_options',
        'formcraft-pro-help',
        'formcraft_pro_admin_page'
    );
});

function formcraft_pro_admin_page() {
    // Container for React app
    echo '<div id="formcraft-admin-root"></div>';
}

// enqueue build files
add_action('admin_enqueue_scripts', function($hook){
    // Check if we're on any FormCraft page
    $formcraft_pages = [
        'toplevel_page_formcraft-pro',
        'formcraft_page_formcraft-pro-new',
        'formcraft_page_formcraft-pro-entries',
        'formcraft_page_formcraft-pro-settings',
        'formcraft_page_formcraft-pro-import-export',
        'formcraft_page_formcraft-pro-system-status',
        'formcraft_page_formcraft-pro-help'
    ];
    
    if (!in_array($hook, $formcraft_pages)) return;

    wp_enqueue_style('formcraft-admin-styles', FCP_URL . 'build/admin.styles.css', array(), FCP_VERSION);
    wp_enqueue_script('formcraft-admin-app', FCP_URL . 'build/admin.bundle.js', array('wp-element','wp-i18n','wp-api-fetch'), FCP_VERSION, true);

    // pass data
    wp_localize_script('formcraft-admin-app', 'FCP_Settings', array(
        'root' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest'),
        'pluginUrl' => FCP_URL,
    ));
});

// initialize REST controllers
add_action('rest_api_init', function(){
    $controller = new FormCraft\Controllers\RestController();
    $controller->register_routes();
});
