<?php
/**
 * Plugin Name: niftyConnect – Website Alerts via Messaging Apps & Email
 * Description: Receive important WordPress and WooCommerce event notifications through extensible notification channels.
 * Version: 1.0.3
 * Requires at least: 6.2
 * Requires PHP: 7.4
 * Author: juah255
 * Text Domain: niftyconnect
 * Domain Path: /languages
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package NiftyConnect
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'NIFTYCONNECT_VERSION', '1.0.3' );
define( 'NIFTYCONNECT_FILE', __FILE__ );
define( 'NIFTYCONNECT_DIR', plugin_dir_path( __FILE__ ) );
define( 'NIFTYCONNECT_URL', plugin_dir_url( __FILE__ ) );
define( 'NIFTYCONNECT_BASENAME', plugin_basename( __FILE__ ) );

require_once NIFTYCONNECT_DIR . 'includes/Autoloader.php';

NiftyConnect\Autoloader::register();

register_activation_hook( __FILE__, array( 'NiftyConnect\\Installer', 'activate' ) );

add_action(
	'plugins_loaded',
	static function () {
		NiftyConnect\Plugin::instance()->boot();
	}
);
