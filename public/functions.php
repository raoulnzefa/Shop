<?php

function digitakeoff_scripts() {
	wp_localize_script( 'wp-api', 'wpsetting', array(
		'root' => esc_url_raw( rest_url() ),
		'nonce' => wp_create_nonce( 'wp_rest' )
	) );
}
add_action( 'wp_enqueue_scripts', 'digitakeoff_scripts' );