=== niftyConnect – Website Alerts via Messaging Apps & Email ===
Contributors: juah255
Tags: notifications, alerts, woocommerce, email notifications, event notifications
Requires at least: 6.2
Tested up to: 7.0
Requires PHP: 7.4
Stable tag: 1.0.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Receive important WordPress and WooCommerce event notifications through configurable delivery channels.

== Description ==

niftyConnect helps site users receive timely notifications for important WordPress and WooCommerce events.

niftyConnect includes email, Discord, Telegram, and WhatsApp Cloud API notification channels, customizable templates, per-channel notification routing, trigger-specific role and custom recipients, manual test notifications, channel-specific message controls, and an optional administrator-configured daily sending limit. Set the daily limit to `0` for unlimited sending.

= Features =

* Email notification channel.
* Discord incoming webhook channel with username, avatar, thread, and link embed controls.
* Telegram notification channel with bot, chat, formatting, and link preview settings.
* WhatsApp Cloud API channel with approved-template and free-form text modes.
* Per-channel notification routing for WordPress and WooCommerce events.
* Trigger-specific role recipients, user-profile Telegram/WhatsApp destinations, and custom email recipients.
* Custom notification content and per-event WhatsApp approved templates.
* Manual test notification.
* New post published notifications.
* Post updated notifications.
* New comment notifications.
* Pending comment moderation notifications.
* New user registration notifications.
* WooCommerce new order notifications.
* WooCommerce completed order notifications.
* WooCommerce order status change notifications.
* WooCommerce new customer notifications.
* WooCommerce low stock notifications.
* WooCommerce back in stock notifications.
* Optional daily notification sending limit.

== Installation ==

1. Upload the `niftyconnect` folder to `/wp-content/plugins/`.
2. Activate `niftyConnect` from the Plugins screen.
3. Go to `niftyConnect` in the WordPress admin menu.
4. Configure recipients, templates, channels, and event triggers.
5. To use Discord, paste an incoming webhook URL in the Discord channel settings.
6. To use WhatsApp, add the Meta access token, WhatsApp business phone number ID, recipient number, and approved template details in the WhatsApp channel settings.
7. Save the settings and send a manual test notification.

== Screenshots ==

1. Overview screen with notification activity and configuration status.
2. Trigger routing screen for configured event notification channels.
3. Notification template screen for WordPress, WooCommerce, and system messages.
4. Settings screen for global delivery controls and channel setup.

== Frequently Asked Questions ==

= Does niftyConnect send real notifications? =

Yes. niftyConnect sends email notifications through WordPress' `wp_mail()` system, Discord notifications through incoming webhooks, Telegram notifications through the Telegram Bot API, and WhatsApp notifications through Meta's official WhatsApp Cloud API.

= Can Discord notifications post into threads? =

Yes. Add a Discord thread ID in the Discord channel settings. A test-only thread ID can also be entered when sending a manual Discord test notification.

= Why does WhatsApp offer template and text modes? =

Automated business-initiated WhatsApp messages generally require an approved message template. Free-form text is intended for an open customer-service conversation window. Configure a fallback approved template in the WhatsApp channel settings, or choose a different approved template name, language, and body-variable layout for each event in the Templates tab.

= Can I test WhatsApp without a production WhatsApp Business number? =

Yes. Meta's WhatsApp Cloud API setup can provide a test business phone number, temporary access token, and phone number ID. Add and verify your personal WhatsApp number as an allowed test recipient, enter the test credentials in niftyConnect, and use Meta's pre-approved `hello_world` template with language `en_US` and no body variables.

= What format should WhatsApp phone numbers use? =

Enter the complete international number with its country code. Spaces, punctuation, and a leading `+` are removed when the number is saved. Do not enter a local number beginning with `0`.

= How are WhatsApp recipients selected? =

Role-based delivery uses the WhatsApp phone stored on each matching WordPress user profile. If no matching profile has a valid international number, niftyConnect uses the default recipient configured in the WhatsApp channel settings.

= Does WooCommerce need to be installed? =

No. WooCommerce hooks are registered safely and only send order notifications when WooCommerce is active.

= Can developers add custom channels? =

Yes. Use the `niftyconnect_register_providers` action and implement the `Provider_Interface` contract.

== Third-party services ==

niftyConnect is an independent plugin and is not affiliated with, endorsed by, or sponsored by Discord, Meta, WhatsApp, Telegram, Automattic, or WooCommerce.

niftyConnect can send Discord notifications only after an administrator configures an incoming Discord webhook URL. When Discord is enabled, the plugin sends the notification subject, notification body, optional webhook username, optional avatar URL, optional thread ID, and relevant event content to Discord's webhook API so Discord can post the message to the configured channel or thread. Depending on enabled triggers and templates, this may include site, post, comment, user, security, and WooCommerce order details. Webhook URLs can be stored in plugin settings or supplied through the `NIFTYCONNECT_DISCORD_WEBHOOK_URL` constant in `wp-config.php`.

Discord service: https://discord.com/
Discord webhook API: https://docs.discord.com/developers/resources/webhook
Discord Terms of Service: https://discord.com/terms
Discord Privacy Policy: https://discord.com/privacy

niftyConnect can send Telegram notifications only after an administrator enters a Telegram bot token and chat ID. When Telegram is enabled, the plugin sends the notification subject, notification body, and configured chat ID to the Telegram Bot API so Telegram can deliver the message. Depending on the enabled triggers and templates, the notification message may include site, post, comment, user, and WooCommerce order details selected in your notification template.

Telegram service: https://telegram.org/
Telegram Bot API: https://core.telegram.org/bots/api
Telegram Terms of Service: https://telegram.org/tos
Telegram Privacy Policy: https://telegram.org/privacy

niftyConnect can send WhatsApp notifications only after an administrator configures a Meta access token, WhatsApp business phone number ID, recipient number, and message mode. When WhatsApp is enabled, the plugin sends the configured recipient phone number, notification subject and body, template details, and relevant event content to Meta's Graph API so WhatsApp can deliver the message. Depending on enabled triggers and templates, this may include site, post, comment, user, security, and WooCommerce order details. Access tokens can be stored in plugin settings or supplied through the `NIFTYCONNECT_WHATSAPP_ACCESS_TOKEN` constant in `wp-config.php`.

WhatsApp service: https://www.whatsapp.com/
WhatsApp Cloud API: https://developers.facebook.com/docs/whatsapp/cloud-api/
Meta Terms: https://www.facebook.com/legal/terms
Meta Privacy Policy: https://www.facebook.com/privacy/policy/

== Source code and build tools ==

The distributed `build/admin.js`, `build/admin.css`, and `build/admin-rtl.css` files are generated from the human-readable source in `src/admin/`.

The public source repository is available at:

https://github.com/juah255/niftyconnect

The WordPress.org release package includes the source files, npm package manifest, lock file, and build configuration needed to rebuild these generated assets.

To rebuild the admin assets:

1. Use Node.js 20 with npm 10.9.3.
2. Run `npm ci`.
3. Run `npm run build`.

Build configuration is included in `package.json`, `package-lock.json`, `webpack.config.js`, `postcss.config.js`, and `tsconfig.json`.

== Changelog ==

= 1.0.3 =

* Added Discord incoming webhook notifications with optional username, avatar, thread, and link embed controls.
* Renamed the public plugin display name to avoid third-party service names in the title.
* Included human-readable admin source and build tooling in release packages.
* Documented generated asset source files and rebuild instructions.

= 1.0.2 =

* Added WhatsApp Cloud API notifications with approved-template and free-form text modes.
* Added manual WhatsApp test notifications and international recipient validation.
* Added role-based WhatsApp recipients, user-profile phone destinations, and a configurable default recipient.
* Added event-specific WhatsApp template names, languages, and body-variable layouts.

= 1.0.1 =

* Added admin login alert notification.
* Added support links for easier help and contact.
* Improved plugin admin settings page.

= 1.0.0 =

* Initial release.
