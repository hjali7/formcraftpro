<?php
if (!defined('ABSPATH')) exit;

class FormCraft_Frontend {
    
    public function __construct() {
        add_shortcode('formcraft', array($this, 'render_form'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
    }
    
    public function enqueue_frontend_assets() {
        wp_enqueue_style(
            'formcraft-frontend',
            FCP_URL . 'assets/frontend.css',
            array(),
            FCP_VERSION
        );
        
        wp_enqueue_script(
            'formcraft-frontend',
            FCP_URL . 'assets/frontend.js',
            array('jquery'),
            FCP_VERSION,
            true
        );
        
        wp_localize_script('formcraft-frontend', 'FCP_Frontend', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'resturl' => rest_url('fcp/v1/'),
            'nonce' => wp_create_nonce('wp_rest')
        ));
    }
    
    public function render_form($atts) {
        $atts = shortcode_atts(array(
            'id' => 0
        ), $atts);
        
        $form_id = intval($atts['id']);
        if (!$form_id) {
            return '<p class="fcp-error">شناسه فرم معتبر نیست</p>';
        }
        
        global $wpdb;
        $forms_table = $wpdb->prefix . 'fcp_forms';
        $fields_table = $wpdb->prefix . 'fcp_fields';
        
        $form = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $forms_table WHERE id = %d",
            $form_id
        ), ARRAY_A);
        
        if (!$form) {
            return '<p class="fcp-error">فرم یافت نشد</p>';
        }
        
        $fields = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $fields_table WHERE form_id = %d ORDER BY position ASC",
            $form_id
        ), ARRAY_A);
        
        $settings = json_decode($form['settings'], true);
        if (!$settings) {
            $settings = array(
                'submitButtonText' => 'ارسال',
                'successMessage' => 'فرم با موفقیت ارسال شد'
            );
        }
        
        ob_start();
        ?>
        <div class="formcraft-wrapper" id="formcraft-<?php echo $form_id; ?>">
            <form class="formcraft-form" data-form-id="<?php echo $form_id; ?>">
                <?php wp_nonce_field('fcp_submit_' . $form_id, 'fcp_nonce'); ?>
                
                <div class="fcp-fields">
                    <?php foreach ($fields as $field): 
                        $field_meta = json_decode($field['field_meta'], true);
                        $this->render_field($field_meta);
                    endforeach; ?>
                </div>
                
                <div class="fcp-submit-wrapper">
                    <button type="submit" class="fcp-submit-btn">
                        <?php echo esc_html($settings['submitButtonText']); ?>
                    </button>
                    <span class="fcp-loading" style="display:none;">در حال ارسال...</span>
                </div>
                
                <div class="fcp-message" style="display:none;"></div>
            </form>
        </div>
        <?php
        return ob_get_clean();
    }
    
    private function render_field($field) {
        $required = !empty($field['required']) ? 'required' : '';
        $width = !empty($field['styles']['width']) ? $field['styles']['width'] : '100%';
        $label_color = !empty($field['styles']['labelColor']) ? $field['styles']['labelColor'] : '#374151';
        $border_color = !empty($field['styles']['borderColor']) ? $field['styles']['borderColor'] : '#D1D5DB';
        
        ?>
        <div class="fcp-field-wrapper" style="width: <?php echo esc_attr($width); ?>">
            <label class="fcp-label" style="color: <?php echo esc_attr($label_color); ?>">
                <?php echo esc_html($field['label']); ?>
                <?php if ($required): ?>
                    <span class="fcp-required">*</span>
                <?php endif; ?>
            </label>
            
            <?php
            switch ($field['type']) {
                case 'text':
                case 'email':
                case 'number':
                case 'date':
                    $this->render_input_field($field, $required, $border_color);
                    break;
                    
                case 'textarea':
                    $this->render_textarea_field($field, $required, $border_color);
                    break;
                    
                case 'select':
                    $this->render_select_field($field, $required, $border_color);
                    break;
                    
                case 'radio':
                    $this->render_radio_field($field, $required);
                    break;
                    
                case 'checkbox':
                    $this->render_checkbox_field($field, $required);
                    break;
                    
                case 'file':
                    $this->render_file_field($field, $required, $border_color);
                    break;
            }
            ?>
        </div>
        <?php
    }
    
    private function render_input_field($field, $required, $border_color) {
        $type = $field['type'];
        $name = 'fcp_field_' . sanitize_key($field['id']);
        $placeholder = !empty($field['placeholder']) ? $field['placeholder'] : '';
        $min = !empty($field['validation']['min']) ? $field['validation']['min'] : '';
        $max = !empty($field['validation']['max']) ? $field['validation']['max'] : '';
        ?>
        <input 
            type="<?php echo esc_attr($type); ?>"
            name="<?php echo esc_attr($name); ?>"
            class="fcp-input"
            placeholder="<?php echo esc_attr($placeholder); ?>"
            style="border-color: <?php echo esc_attr($border_color); ?>"
            <?php echo $required; ?>
            <?php if ($min) echo 'min="' . esc_attr($min) . '"'; ?>
            <?php if ($max) echo 'max="' . esc_attr($max) . '"'; ?>
        />
        <?php
    }
    
    private function render_textarea_field($field, $required, $border_color) {
        $name = 'fcp_field_' . sanitize_key($field['id']);
        $placeholder = !empty($field['placeholder']) ? $field['placeholder'] : '';
        ?>
        <textarea 
            name="<?php echo esc_attr($name); ?>"
            class="fcp-textarea"
            placeholder="<?php echo esc_attr($placeholder); ?>"
            style="border-color: <?php echo esc_attr($border_color); ?>"
            rows="4"
            <?php echo $required; ?>
        ></textarea>
        <?php
    }
    
    private function render_select_field($field, $required, $border_color) {
        $name = 'fcp_field_' . sanitize_key($field['id']);
        $options = !empty($field['options']) ? $field['options'] : array();
        ?>
        <select 
            name="<?php echo esc_attr($name); ?>"
            class="fcp-select"
            style="border-color: <?php echo esc_attr($border_color); ?>"
            <?php echo $required; ?>
        >
            <option value="">انتخاب کنید...</option>
            <?php foreach ($options as $option): ?>
                <option value="<?php echo esc_attr($option); ?>">
                    <?php echo esc_html($option); ?>
                </option>
            <?php endforeach; ?>
        </select>
        <?php
    }
    
    private function render_radio_field($field, $required) {
        $name = 'fcp_field_' . sanitize_key($field['id']);
        $options = !empty($field['options']) ? $field['options'] : array();
        ?>
        <div class="fcp-radio-group">
            <?php foreach ($options as $index => $option): ?>
                <label class="fcp-radio-label">
                    <input 
                        type="radio"
                        name="<?php echo esc_attr($name); ?>"
                        value="<?php echo esc_attr($option); ?>"
                        class="fcp-radio"
                        <?php if ($index === 0) echo $required; ?>
                    />
                    <span><?php echo esc_html($option); ?></span>
                </label>
            <?php endforeach; ?>
        </div>
        <?php
    }
    
    private function render_checkbox_field($field, $required) {
        $name = 'fcp_field_' . sanitize_key($field['id']);
        $options = !empty($field['options']) ? $field['options'] : array();
        ?>
        <div class="fcp-checkbox-group">
            <?php foreach ($options as $option): ?>
                <label class="fcp-checkbox-label">
                    <input 
                        type="checkbox"
                        name="<?php echo esc_attr($name); ?>[]"
                        value="<?php echo esc_attr($option); ?>"
                        class="fcp-checkbox"
                    />
                    <span><?php echo esc_html($option); ?></span>
                </label>
            <?php endforeach; ?>
        </div>
        <?php
    }
    
    private function render_file_field($field, $required, $border_color) {
        $name = 'fcp_field_' . sanitize_key($field['id']);
        ?>
        <input 
            type="file"
            name="<?php echo esc_attr($name); ?>"
            class="fcp-file"
            style="border-color: <?php echo esc_attr($border_color); ?>"
            <?php echo $required; ?>
        />
        <?php
    }
}

// Initialize
new FormCraft_Frontend();
