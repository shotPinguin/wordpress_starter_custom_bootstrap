<?php 
/*
Plugin Name: WP Mobile Detect
Version: 2.0
Plugin URI: http://jes.se.com/wp-mobile-detect
Description: A WordPress plugin based on the PHP Mobile Detect class (Original author Victor Stanciu now maintained by Serban Ghita) incorporates functions and shortcodes to empower User Admins to have better control of when content is served on mobile
Author: Jesse Friedman 
Author URI: http://jes.se.com
License: GPL v3

WP Mobile Detect
Copyright (C) 2012, Jesse Friedman - http://jes.se.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/



/********************************************//**
* PHP Mobile Detect class used to detect browser or device type
***********************************************/
require_once('mobile-detect.php');

$detect = new Mobile_Detect();



/********************************************//**
* Generates [notmobile][/notmobile] shortcode which shows content on desktops or tablets
***********************************************/
function wpmd_notphone( $tats, $content="" ) {
	global $detect;
	if( ! $detect->isMobile() || $detect->isTablet() ) return do_shortcode($content);
}
add_shortcode( 'notphone', 'wpmd_notphone' );



/********************************************//**
* Returns true when on desktops or tablets
***********************************************/
function wpmd_is_notphone() {
	global $detect;
	if( ! $detect->isMobile() || $detect->isTablet() ) return true;
}



/********************************************//**
* Generates [nottab][/nottab] shortcode which shows content on desktops or phones
***********************************************/
function wpmd_nottab( $tats, $content="" ) {
	global $detect;
	if( ! $detect->isTablet() ) return do_shortcode($content);
}
add_shortcode( 'nottab', 'wpmd_nottab' );



/********************************************//**
* Returns true when on desktops or phones
***********************************************/
function wpmd_is_nottab() {
	global $detect;
	if( ! $detect->isTablet() ) return true;
}



/********************************************//**
* Generates [notdevice][/notdevice] shortcode which shows content on desktops only
***********************************************/
function wpmd_notdevice( $tats, $content="" ) {
	global $detect;
	if( ! $detect->isMobile() && ! $detect->isTablet() ) return do_shortcode($content);
}
add_shortcode( 'notdevice', 'wpmd_notdevice' );



/********************************************//**
* Returns true when on desktops only
***********************************************/
function wpmd_is_notdevice() {
	global $detect;
	if( ! $detect->isMobile() && ! $detect->isTablet() ) return true;
}



/********************************************//**
* Generates [phone][/phone] shortcode which shows content on phones ONLY
***********************************************/
function wpmd_phone( $tats, $content="" ) {
	global $detect;
	if( $detect->isMobile() && ! $detect->isTablet() ) return do_shortcode($content);
}
add_shortcode( 'phone', 'wpmd_phone' );



/********************************************//**
* Returns true when on phones ONLY
***********************************************/
function wpmd_is_phone() {
	global $detect;
	if( $detect->isMobile() && ! $detect->isTablet() ) return true;
}



/********************************************//**
* Generates [tablet][/tablet] shortcode which shows content on Tablets ONLY
***********************************************/
function wpmd_tablet( $tats, $content="" ) {
	global $detect;
	if( $detect->isTablet() ) return do_shortcode($content);
}
add_shortcode( 'tablet', 'wpmd_tablet' );

/********************************************//**
* WARNING: This is deprecated. Conflicts with the [tab] shortcode changed to [tablet] Generates [tab][/tab] shortcode which shows content on Tablets ONLY
***********************************************/
function wpmd_tab( $tats, $content="" ) {
	global $detect;
	if( $detect->isTablet() ) return do_shortcode($content);
}
add_shortcode( 'tab', 'wpmd_tab' );



/********************************************//**
* Returns true when on Tablets ONLY
***********************************************/
function wpmd_is_tablet() {
	global $detect;
	if( $detect->isTablet() ) return true;
}



/********************************************//**
* Generates [device][/device] shortcode which shows content on phones or tablets but NOT destkop
***********************************************/
function wpmd_device( $tats, $content="" ) {
	global $detect;
	if( $detect->isMobile() || $detect->isTablet() ) return do_shortcode($content);
}
add_shortcode( 'device', 'wpmd_device' );



/********************************************//**
* Returns true when on phones or tablets but NOT destkop
***********************************************/
function wpmd_is_device() {
	global $detect;
	if( $detect->isMobile() || $detect->isTablet() ) return true;
}



/********************************************//**
* Generates [ios][/ios] shortcode which shows content on iOS devices only
***********************************************/
function wpmd_ios( $tats, $content="" ) {
	global $detect;
	if( $detect->isiOS() ) return do_shortcode($content);
}
add_shortcode( 'ios', 'wpmd_ios' );



/********************************************//**
* Returns true when on iOS
***********************************************/
function wpmd_is_ios() {
	global $detect;
	if( $detect->isiOS() ) return true;
}



/********************************************//**
* Generates [iPhone][/iPhone] shortcode which shows content on iPhone's only
***********************************************/
function wpmd_iphone( $tats, $content="" ) {
	global $detect;
	if( $detect->isiPhone() ) return do_shortcode($content);
}
add_shortcode( 'iPhone', 'wpmd_iphone' );



/********************************************//**
* Returns true when on iPhone
***********************************************/
function wpmd_is_iphone() {
	global $detect;
	if( $detect->isiPhone() ) return true;
}



/********************************************//**
* Generates [iPad][/iPad] shortcode which shows content on iPad's only
***********************************************/
function wpmd_ipad( $tats, $content="" ) {
	global $detect;
	if( $detect->isiPad() ) return do_shortcode($content);
}
add_shortcode( 'iPad', 'wpmd_ipad' );



/********************************************//**
* Returns true when on iPad
***********************************************/
function wpmd_is_ipad() {
	global $detect;
	if( $detect->isiPad() ) return true;
}



/********************************************//**
* Generates [android][/android] shortcode which shows content on Android devices only
***********************************************/
function wpmd_android( $tats, $content="" ) {
	global $detect;
	if( $detect->isAndroidOS() ) return do_shortcode($content);
}
add_shortcode( 'android', 'wpmd_android' );



/********************************************//**
* Returns true when on Android OS
***********************************************/
function wpmd_is_android() {
	global $detect;
	if( $detect->isAndroidOS() ) return true;
}



/********************************************//**
* Generates [blackberry][/blackberry] shortcode which shows content on Blackberry devices only
***********************************************/
function wpmd_blackberry( $tats, $content="" ) {
	global $detect;
	if( $detect->isBlackBerry() ) return do_shortcode($content);
}
add_shortcode( 'blackberry', 'wpmd_blackberry' );



/********************************************//**
* Returns true when on a Blackberry device
***********************************************/
function wpmd_is_blackberry() {
	global $detect;
	if( $detect->isBlackBerry() ) return true;
}



/********************************************//**
* Generates [windowsmobile][/windowsmobile] shortcode which shows content on Windows Mobile devices only
***********************************************/
function wpmd_windows_mobile( $tats, $content="" ) {
	global $detect;
	if( $detect->isWindowsMobileOS() ) return do_shortcode($content);
}
add_shortcode( 'windowsmobile', 'wpmd_windows_mobile' );



/********************************************//**
* Returns true when on Windows OS
***********************************************/
function wpmd_is_windows_mobile() {
	global $detect;
	if( $detect->isWindowsMobileOS() ) return true;
}



/********************************************//**
* Generates [chrome][/chrome] shortcode which shows content on Chrome browsers only
***********************************************/
function wpmd_chrome_browser( $tats, $content="" ) {
	global $detect;
	if( $detect->isChrome() ) return do_shortcode($content);
}
add_shortcode( 'chrome', 'wpmd_chrome_browser' );



/********************************************//**
* Returns true when in a Chrome browser
***********************************************/
function wpmd_is_chrome_browser() {
	global $detect;
	if( $detect->isChrome() ) return true;
}



/********************************************//**
* Generates [opera][/opera] shortcode which shows content on Opera browsers only
***********************************************/
function wpmd_opera_browser( $tats, $content="" ) {
	global $detect;
	if( $detect->isOpera() ) return do_shortcode($content);
}
add_shortcode( 'opera', 'wpmd_opera_browser' );



/********************************************//**
* Returns true when in a Opera browser
***********************************************/
function wpmd_is_opera_browser() {
	global $detect;
	if( $detect->isOpera() ) return true;
}



/********************************************//**
* Generates [internetexplorer][/internetexplorer] shortcode which shows content on Internet Explorer browsers only
***********************************************/
function wpmd_ie_browser( $tats, $content="" ) {
	global $detect;
	if( $detect->isIE() ) return do_shortcode($content);
}
add_shortcode( 'ie', 'wpmd_ie_browser' );



/********************************************//**
* Returns true when in a IE browser
***********************************************/
function wpmd_is_ie_browser() {
	global $detect;
	if( $detect->isIE() ) return true;
}



/********************************************//**
* Generates [firefox][/firefox] shortcode which shows content on Firefox browsers only
***********************************************/
function wpmd_firefox_browser( $tats, $content="" ) {
	global $detect;
	if( $detect->isFirefox() ) return do_shortcode($content);
}
add_shortcode( 'firefox', 'wpmd_firefox_browser' );



/********************************************//**
* Returns true when in a Firefox browser
***********************************************/
function wpmd_is_firefox_browser() {
	global $detect;
	if( $detect->isFirefox() ) return true;
}



/********************************************//**
* Generates [safari][/safari] shortcode which shows content on Safari browsers only
***********************************************/
function wpmd_safari_browser( $tats, $content="" ) {
	global $detect;
	if( $detect->isSafari() ) return do_shortcode($content);
}
add_shortcode( 'safari', 'wpmd_safari_browser' );



/********************************************//**
* Returns true when in a Safari browser
***********************************************/
function wpmd_is_safari_browser() {
	global $detect;
	if( $detect->isSafari() ) return true;
}

