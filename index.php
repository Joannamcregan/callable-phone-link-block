<?php
/*
Plugin Name: JJ Custom Call Phone Number
Description: Allows blocks to be nested inside a set of phone number tags so site visitors can tap to call
Version: 1.0
Author: Joanna
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Jjcpn {
  function __construct() {
    add_action('init', array($this, 'adminAssets'));    
    add_action('admin_menu', array($this, 'phoneNumberSettingsLink'));
    add_action('admin_init', array($this, 'phoneNumberSettings'));
  }

  function phoneNumberSettings(){
    add_settings_section('jjcpn_setting_section', null, null, 'phone-number-settings-page');
    add_settings_field('jjcpn_phone_number', 'Phone Number:', array($this, 'phoneNumberInputHTML'), 'phone-number-settings-page', 'jjcpn_setting_section');
    register_setting('phonenumberlink', 'jjcpn_phone_number', array('sanitize_callback' => array($this, 'sanitizeAndValidateNumber'), 'default' => ''));
  }

  function sanitizeAndValidateNumber($input){
    $input = trim($input);
    if ((ctype_digit($input)) && (strlen($input) == 10)){
        return $input;
    } else {
        add_settings_error('jjcpn_phone_number', 'jjcpn_phone_error', 'Enter only the 3-digit area code and 7-digit phone number with no spaces or special characters (example: 7775555555)');
        return esc_attr(get_option('jjcpn_phone_number'));
    }
  }

  function phoneNumberInputHTML(){
    ?><input type="text" name='jjcpn_phone_number' placeholder="example: 7775555555" value="<?php echo esc_attr(get_option('jjcpn_phone_number')); ?>"></input>
  <?php }

  function phoneNumberSettingsLink(){
    add_options_page('Business Phone Number', 'Phone Number', 'manage_options', 'phone-number-settings-page', array($this, 'phoneNumberSettingsHTML'));
  }

  function phoneNumberSettingsHTML(){
    ?><div class="wrap">
        <h1>Business Phone Number</h1>
        <form action="options.php" method="POST">
            <?php settings_fields('phonenumberlink');
            do_settings_sections('phone-number-settings-page');
            submit_button(); ?>
        </form>
    </div>
 <?php }

  function adminAssets() {
    wp_enqueue_script('jjcustomphonenumber', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components'));
    register_block_type('jjcpn/phone-link', array(
        'editor_script' => 'jjcustomphonenumber',
        'render_callback' => array($this, 'blockHTML')
      ));
    }

    function blockHTML($attributes) {
        ob_start(); ?>
        <a href="tel:<?php echo esc_attr(get_option('jjcpn_phone_number')); ?>">
            <button style="border:<?php echo esc_html($attributes['borderSize']) ?>, border-radius:<?php echo esc_html($attributes['borderRadius']) ?>">
                <?php echo esc_html($attributes['linkText']) ?>
            </button>
        </a>
        <?php return ob_get_clean();
    }
}

$jjcpn = new Jjcpn();