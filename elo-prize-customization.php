<?php

/**
 * Plugin Name: ELO Prize Customization
 * Description: Custom Built plugin to customize the submission for for the ELO Prize Submission form
 * Version: 0.5
 * Author: Nimbus Digital
 * Author URI: http://nimbus.digital
 * License: GPL2
 */

function elo_assets() {
    
    wp_enqueue_style('elo-styles', plugins_url('elo-styles.css', __FILE__));
    wp_enqueue_script('ko', plugins_url('ko.min.js', __FILE__), array(), false, true);
    wp_enqueue_script('ko-valid', plugins_url('ko.validation.min.js', __FILE__), array('ko'), false, true);
    wp_enqueue_script('elo-scripts', plugins_url('elo-scripts.js', __FILE__), array('jquery', 'ko', 'ko-valid'), false, true);
}

add_action('wp_enqueue_scripts', 'elo_assets');

add_filter('wpcf7_form_elements', 'mycustom_wpcf7_form_elements');

function mycustom_wpcf7_form_elements($form) {
    return do_shortcode($form);
}
