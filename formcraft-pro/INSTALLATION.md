# FormCraft Pro Installation Guide

## Quick Installation

### Method 1: WordPress Admin (Recommended)

1. Download `formcraft-pro-v2.2.0.zip`
2. Log in to your WordPress admin panel
3. Navigate to **Plugins → Add New**
4. Click **Upload Plugin** button at the top
5. Click **Choose File** and select the downloaded ZIP file
6. Click **Install Now**
7. After installation, click **Activate Plugin**
8. Done! You'll see FormCraft in your admin menu

### Method 2: FTP Upload

1. Download and extract `formcraft-pro-v2.2.0.zip`
2. Connect to your server via FTP
3. Navigate to `/wp-content/plugins/`
4. Upload the extracted `formcraft-pro` folder
5. Go to WordPress Admin → Plugins
6. Find FormCraft Pro and click **Activate**

### Method 3: WP-CLI

```bash
wp plugin install formcraft-pro-v2.2.0.zip --activate
```

## First Steps After Installation

### 1. Access FormCraft
- Look for **FormCraft** in your WordPress admin menu
- Click on it to access the dashboard

### 2. Create Your First Form
- Click **Add New** button
- Choose a template or start with a blank form
- Add fields by dragging them from the sidebar
- Configure field settings
- Save your form

### 3. Embed Form in Page/Post
- Copy the shortcode from the form list: `[formcraft id="X"]`
- Paste it into any page or post
- Publish and view your form

### 4. Configure Settings
- Go to **FormCraft → Settings**
- Configure email notifications
- Set up reCAPTCHA (optional)
- Adjust advanced options

## System Requirements

### Minimum Requirements
- WordPress 5.0 or higher
- PHP 7.4 or higher
- MySQL 5.6 or higher
- 128MB PHP memory limit

### Recommended Requirements
- WordPress 6.0 or higher
- PHP 8.0 or higher
- MySQL 8.0 or higher
- 256MB PHP memory limit

### Required PHP Extensions
- cURL
- GD Library (optional, for image handling)
- Mbstring (optional, for better string handling)

## Verification

After installation, verify everything is working:

1. Go to **FormCraft → System Status**
2. Check all indicators are green
3. If any warnings appear, follow the recommendations

## Troubleshooting

### Plugin Not Appearing After Activation
- Clear your browser cache
- Try logging out and back in
- Check if there are any PHP errors in WordPress debug log

### Forms Not Displaying
- Verify the shortcode is correct: `[formcraft id="X"]`
- Check if the form ID exists
- Ensure JavaScript is enabled in your browser
- Check for theme/plugin conflicts

### Cannot Upload Plugin
- Check file size limits in your hosting
- Verify you have sufficient permissions
- Try Method 2 (FTP Upload) instead

### Database Tables Not Created
- Deactivate and reactivate the plugin
- Check database user permissions
- Contact your hosting provider if issues persist

## Getting Help

### Documentation
Visit **FormCraft → Help** in your admin panel for:
- Complete documentation
- Video tutorials
- FAQs
- Developer resources

### Support
- Submit a ticket: https://looparc.ir/support
- Visit our website: https://looparc.ir

## Updating

### Automatic Update (Future Versions)
1. Go to **Dashboard → Updates**
2. Find FormCraft Pro in the list
3. Click **Update Now**

### Manual Update
1. Download the latest version
2. Deactivate the current version
3. Delete the old plugin files
4. Install the new version
5. Activate the plugin

**Note:** Your forms and data are stored in the database and won't be affected by updates.

## Uninstallation

### Keep Data (Recommended)
1. Go to **Plugins**
2. Deactivate FormCraft Pro
3. Click **Delete**
4. Data remains in database for future reinstallation

### Remove All Data
1. Go to **FormCraft → Settings → General**
2. Enable **Delete Data on Uninstall**
3. Save settings
4. Deactivate and delete the plugin
5. All forms and entries will be permanently removed

## Security Notes

- Keep WordPress and all plugins updated
- Use strong passwords
- Enable reCAPTCHA to prevent spam
- Regularly backup your database
- Monitor form submissions for suspicious activity

## Performance Tips

- Enable AJAX form submission for better UX
- Use caching plugins (compatible with most)
- Optimize images in file upload fields
- Limit file upload sizes appropriately
- Regular database cleanup of old entries

## Need More Help?

Check the **System Status** page for detailed information about your server configuration and any potential issues.

---

**Version:** 2.2.0  
**Last Updated:** November 17, 2024  
**Developer:** LoopArchie  
**Website:** https://looparc.ir
