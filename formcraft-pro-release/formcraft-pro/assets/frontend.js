/**
 * FormCraft Pro - Frontend JavaScript
 */

(function($) {
    'use strict';
    
    $(document).ready(function() {
        // Handle form submission
        $('.formcraft-form').on('submit', function(e) {
            e.preventDefault();
            
            var $form = $(this);
            var formId = $form.data('form-id');
            var $submitBtn = $form.find('.fcp-submit-btn');
            var $loading = $form.find('.fcp-loading');
            var $message = $form.find('.fcp-message');
            
            // Disable submit button
            $submitBtn.prop('disabled', true);
            $loading.show();
            $message.hide();
            
            // Collect form data
            var formData = {};
            $form.find('input, textarea, select').each(function() {
                var $field = $(this);
                var name = $field.attr('name');
                
                if (!name || name === 'fcp_nonce') return;
                
                if ($field.attr('type') === 'checkbox') {
                    if (!formData[name]) {
                        formData[name] = [];
                    }
                    if ($field.is(':checked')) {
                        formData[name].push($field.val());
                    }
                } else if ($field.attr('type') === 'radio') {
                    if ($field.is(':checked')) {
                        formData[name] = $field.val();
                    }
                } else {
                    formData[name] = $field.val();
                }
            });
            
            // Send to REST API
            $.ajax({
                url: FCP_Frontend.resturl + 'entries',
                method: 'POST',
                data: JSON.stringify({
                    form_id: formId,
                    data: formData
                }),
                contentType: 'application/json',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-WP-Nonce', FCP_Frontend.nonce);
                },
                success: function(response) {
                    // Show success message
                    $message
                        .removeClass('error')
                        .addClass('success')
                        .html(response.message || 'فرم با موفقیت ارسال شد')
                        .show();
                    
                    // Reset form
                    $form[0].reset();
                    
                    // Scroll to message
                    $('html, body').animate({
                        scrollTop: $message.offset().top - 100
                    }, 500);
                },
                error: function(xhr) {
                    var errorMsg = 'خطا در ارسال فرم. لطفاً دوباره تلاش کنید.';
                    
                    if (xhr.responseJSON && xhr.responseJSON.message) {
                        errorMsg = xhr.responseJSON.message;
                    }
                    
                    $message
                        .removeClass('success')
                        .addClass('error')
                        .html(errorMsg)
                        .show();
                },
                complete: function() {
                    // Re-enable submit button
                    $submitBtn.prop('disabled', false);
                    $loading.hide();
                }
            });
        });
    });
    
})(jQuery);
