=== WP Mobile Detect ===
Contributors: professor44
Donate link: http://amzn.to/1KHiZ8s
Tags: mobile, responsive, browsers, 
Requires at least: 2.8.4
Tested up to: 4.2
Stable tag: 2.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

WP Mobile Detect by Jesse Friedman creates an easy way for the User Admin to control when content is shown or hid based on visitor device or operating system
== Description ==

One of the hardest parts of building Responsive WordPress themes is maintaining responsive integrity after the site goes live. User Admins can have limited coding abilities which can prevent them from maintaining responsiveness in themes. 

WP Mobile Detect aims to make it extremely easy for anyone to wrap content in the editor with shortcodes which will hide content based on visitor device at the server level.

No longer do we need to rely on display:none; or other techniques to hide content for mobile devices. Instead we can replace content with alternatives. When a full-size infographic in your post is unknowingly displayed on a visitors phone we can consider that an Non-user initiated download. In other words that visitor had no idea what they were getting into and you possibly just choked their bandwidth. 

WP Mobile detect gives you the ability to wrap that infographic in a [notdevice][/notdevice] shortcode so at the server level WordPress will decide to show that content only if the user is NOT on a phone or tablet. Alternatively you can wrap a link and corresponding text to that info graphic in a [device][/device] shortcode as a way for the visitor to consume that content if they so choose.

This plugin is based on the <a href="http://code.google.com/p/php-mobile-detect/" target="_blank">PHP Mobile Detect class</a>
WordPress Plugin written by <a href="http://jes.se.com" target="_blank">Jesse Friedman</a>

== Installation ==

This section describes how to install the plugin and get it working.

e.g.

1. Upload the `wp-mobile-detect` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Start using the shortcodes in your content or functions in  your theme

== Frequently Asked Questions ==

= What shortcodes are available with this plugin =

* [phone]Put content here that you only want displayed on Phones NOT Tablets or Desktops[/phone] 
* [tablet]Put content here that you only want displayed on Tablets NOT Phones or Desktops[/tablet]
* [device]Put content here that you only want displayed on Phones OR Tablets NOT Desktops[/device]
* [notphone]Put content here that you only want displayed on Tablets OR Desktops NOT Phones[/notphone]
* [nottab]Put content here that you only want displayed on Phones OR Desktops NOT Tablets[/nottab]
* [notdevice]Put content here that you only want displayed on Desktops NOT Phones OR Tablets[/notdevice]
* [ios]Put content here that you only want displayed on iOS devices[/ios]
* [iPhone]Put content here, that you only want displayed on iPhones[/iPhone]
* [iPad]Put content here, that you only want displayed on iPads[/iPad]
* [android]Put content here, that you only want displayed on Android devices[/android]
* [windowsmobile]Put content here, that you only want displayed on Windows Mobile devices[/windowsmobile]
* [blackberry]Put content here, that you only want displayed on Blackberry devices[/blackberry]
* [chrome]Put content here, that you only want displayed on mobile Chrome browsers[/chrome]
* [safari]Put content here, that you only want displayed on mobile Safari browsers[/safari]
* [opera]Put content here, that you only want displayed on mobile Opera browsers[/opera]
* [firefox]Put content here, that you only want displayed on mobile Firefox browsers[/Firefox]
* [ie]Put content here, that you only want displayed on mobile Internet Explorer browsers[/ie]

= What functions are available with this plugin =

* wpmd_is_notphone() - Returns true when on desktops or tablets
* wpmd_is_nottab() - Returns true when on desktops or phones
* wpmd_is_notdevice() - Returns true when on desktops only
* wpmd_is_phone() - Returns true when on phones ONLY
* wpmd_is_tablet() - Returns true when on Tablets ONLY
* wpmd_is_device() - Returns true when on phones or tablets but NOT desktop
* wpmd_is_ios() - Returns true when on an iOS device
* wpmd_is_iphone() - Returns true when on iPhones
* wpmd_is_ipad() - Returns true when on iPads
* wpmd_is_android() - Returns true when on Android
* wpmd_is_windows_mobile() - Returns true when on Windows Mobile
* wpmd_is_blackberry() - Returns true when on Blackberry
* wpmd_is_chrome_browser() -  Returns true when on mobile Chrome browser
* wpmd_is_safari_browser() -  Returns true when on mobile Safari browser
* wpmd_is_opera_browser() -  Returns true when on mobile Opera browser
* wpmd_is_ie_browser() -  Returns true when on mobile Internet Explorer browser
* wpmd_is_firefox_browser() -  Returns true when on mobile Firefox browser

= Are you planning on adding more shortcodes in the future? =

Yes I plan on adding shortcodes for 
* Android Only - DONE
* iOS Only  - DONE
* Mobile Browsers - DONE
* Blackberry - DONE
* And More

If you want to see some rate and comment on this plugin

= What about functions? =

For now I've only made shortcodes but you can either call the do shortcode function in your theme or write your own functions.  In future releases functions will come with all shortcodes

== Changelog ==

= 2.0 = 

* Updated the core Mobile Detect Class 2.8.13
* Updated shortcodes, adding [blackberry], [chrome], [safari], [opera], [ie], [firefox]
* Updated functions, adding wpmd_is_blackberry(), wpmd_is_chrome_browser(), wpmd_is_safari_browser(), wpmd_is_opera_browser(), wpmd_is_ie_browser(), wpmd_is_firefox_browser()
* Updated readme and some links

= 1.2.0 =

* Addition of several more shortcodes: [ios][/ios], [iPhone][/iPhone],][iPad][/iPad], [android][/android], [windowsmobile][/windowsmobile]
* Addition of several more functions: wpmd_is_ios(), wpmd_is_iphone(), wpmd_is_ipad(), wpmd_is_android(), wpmd_is_windows_mobile()
* Updated the core Mobile Detect Class 2.5.8

= 1.1.0 =

* Changed function namespace prefix from "jesse_" to "wpmd_"
* Deprecated [tab] shortcode, replaced by [tablet]
* Addition of theme functions for mobile detection 
* Fixed bug where shortcodes would not run inside the mobile detect shortcodes


= 1.0.0 =

Initial release.

