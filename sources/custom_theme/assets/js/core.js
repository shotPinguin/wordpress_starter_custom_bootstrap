try {
  var $ = jQuery;

  $(function () {

      window.addEventListener('load', AOS.refresh);

//      Exemple ajax requete
//       /**
//        * Modification des informations du compte utilsateur
//        */
//       $('body').on('click', '#btn-update-user', function (e) {
//           e.preventDefault();
//           e.stopPropagation();
//
//           /**
//            * Prevent default action, so when user clicks button he doesn't navigate away from page
//            */
//           if (event.preventDefault) {
//               event.preventDefault();
//           } else {
//               event.returnValue = false;
//           }
//
//
//           $('form#update-form p.status').show().text(ajax_pre_register.loadingmessage);
//
//           // Collect data from inputs
//           var reg_nonce = $('#vb_maj_user_nonce').val();
//           var reg_user = $('#vb_username').val();
//           var reg_pass = $('#vb_pass').val();
//           var vb_username = $('#vb_username').val();
//
//           var reg_civility = $('#vb_civility').val();
//           var reg_name = $('#vb_name').val();
//           var reg_firstname = $('#vb_firstname').val();
//           var reg_company = $('#vb_company').val();
//           var reg_mail = $('#vb_email').val();
//           var reg_phone = $('#vb_phone').val();
//
//           /**
//            * AJAX URL where to send data
//            * (from localize_script)
//            */
//           var ajax_url = vb_reg_vars.vb_ajax_url;
//
//           // Data to send
//           var data = {
//               action: 'update_user',
//               nonce: reg_nonce,
//               //pass: reg_pass,
//               mail: reg_mail,
//               name: reg_name,
//               //user: vb_username,
//               civility : reg_civility,
//               firstname : reg_firstname,
//               company : reg_company,
//               phone : reg_phone
//           };
//
// // Do AJAX request
//           $.post(ajax_url, data, function (response) {
//
//               // If we have response
//               if (response) {
//
//                   if (response === '1') {
//                       // If user is created
//                       $('form#update-form p.status').show().text('Update profile successfully. Reload...');
//
//                       setTimeout(function () {
//                           location.reload();
//                       }, 1000);
//                   } else {
//
//                       $('form#update-form p.status').show().text(response);
//                   }
//               }
//           });
//       });

    $('.lazyload').lazy();

    var sayWho = function () {

      navigator.sayswho = (function () {
        var ua = navigator.userAgent, tem,
          M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
          tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
          return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
          tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
          if (tem != null)
            return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null)
          M.splice(1, 1, tem[1]);
        return M.join(' ');
      })();
      var who = navigator.sayswho.split(" ");
      var browser = who[0].toLowerCase();
      var version = parseInt(who[1]);

      $("body").addClass(browser);
      $("body").addClass(browser + version);

    };





      /*
  *  new_map
  *
  *  This function will render a Google Map onto the selected jQuery element
  *
  *  @type	function
  *  @date	8/11/2013
  *  @since	4.3.0
  *
  *  @param	$el (jQuery element)
  *  @return	n/a
  */

      function new_map( $el ) {

          // var
          var $markers = $el.find('.marker');


          // vars
          var args = {
              zoom		: 16,
              center		: new google.maps.LatLng(0, 0),
              mapTypeId	: google.maps.MapTypeId.ROADMAP
          };


          // create map
          var map = new google.maps.Map( $el[0], args);


          // add a markers reference
          map.markers = [];


          // add markers
          $markers.each(function(){

              add_marker( $(this), map );

          });


          // center map
          center_map( map );


          // return
          return map;

      }

      /*
      *  add_marker
      *
      *  This function will add a marker to the selected Google Map
      *
      *  @type	function
      *  @date	8/11/2013
      *  @since	4.3.0
      *
      *  @param	$marker (jQuery element)
      *  @param	map (Google Map object)
      *  @return	n/a
      */

      function add_marker( $marker, map ) {

          // var
          var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );

          // create marker
          var marker = new google.maps.Marker({
              position	: latlng,
              icon: 'http://site-40613.ciplus.beta-nd.com/wp-content/themes/ciplus/images/marker.png',
              map			: map
          });

          // add to array
          map.markers.push( marker );

          // if marker contains HTML, add it to an infoWindow
          if( $marker.html() )
          {
              // create info window
              var infowindow = new google.maps.InfoWindow({
                  content		: $marker.html()
              });

              // show info window when marker is clicked
              google.maps.event.addListener(marker, 'click', function() {

                  infowindow.open( map, marker );

              });
          }

      }

      /*
      *  center_map
      *
      *  This function will center the map, showing all markers attached to this map
      *
      *  @type	function
      *  @date	8/11/2013
      *  @since	4.3.0
      *
      *  @param	map (Google Map object)
      *  @return	n/a
      */

      function center_map( map ) {

          // vars
          var bounds = new google.maps.LatLngBounds();

          // loop through all markers and create bounds
          $.each( map.markers, function( i, marker ){

              var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );

              bounds.extend( latlng );

          });

          // only 1 marker?
          if( map.markers.length == 1 )
          {
              // set center of map
              map.setCenter( bounds.getCenter() );
              map.setZoom( 16 );
          }
          else
          {
              // fit to bounds
              map.fitBounds( bounds );
          }

      }

      function smoothScroll()
      {

          $("a[href*='#']").on('click', function (event) {

              // Make sure this.hash has a value before overriding default behavior
              if (this.hash !== "") {
                  // Prevent default anchor click behavior
                  event.preventDefault();

                  // Store hash
                  var hash = this.hash;

                  // Using jQuery's animate() method to add smooth page scroll
                  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
                  $('html, body').animate({
                      scrollTop: $(hash).offset().top
                  }, 800, function () {

                      // Add hash (#) to URL when done scrolling (default click behavior)
                      //window.location.hash = hash;
                  });
              }
          });
      }

      var map = null;

      var cible = $('.bloc-numbers.blocs.section')[0];

      var options = {
          threshold: 0.5 /* 50% */
      };

      var observer = new IntersectionObserver(
          onIntersection,
          options
      );



      $(document).ready(function(){

          console.log("%cCreated with ❤", 'color:red');

          AOS.init();

          $('.acf-map').each(function(){
              // create map
              map = new_map( $(this) );
          });


          //lance l'observer
          if(cible)
          {
              observer.observe(cible);
          }



          //fix pour mettre en gras le dernier mot d'un titre
          // $('.titre--blue').html(function(){
          //
          //     if(!$(this).find('strong')[0]) {
          //         console.log("not strong")
          //         var text= $(this).text().trim().split(" ");
          //         console.log("text :",text)
          //         var last = text.pop();
          //         console.log(last)
          //         console.log(text.length)
          //         return text.join(" ") + " <strong>" + last + "</strong>";
          //     }
          //
          // });
          
          //autofix size 
          // var containers = $('.container-size-auto-js')
          //
          // containers.each(function () {
          //     var elems = $(this).find('.elem-size-auto-js')
          //     var cpt = 0
          //     var height = 0
          //
          //     elems.each(function () {
          //         cpt++
          //
          //         console.log(this.getBoundingClientRect().height);
          //         if(this.getBoundingClientRect().height > height) {
          //             height = this.getBoundingClientRect().height
          //         }
          //
          //         if(cpt === elems.length) {
          //             elems.css({"height":height+"px"})
          //         }
          //     })
          // })

      });

      //anim de l'incrémentation des chiffres
      function onIntersection(entries) {
          var target;
          entries.forEach(function(entry) {
              if (entry.intersectionRatio > 0.5) {



              observer.unobserve(cible);
          }
      })

      }

    sayWho();

  smoothScroll();

  });


}
catch (err) {
  console.log(err);
}


/* EXEMPLE ROOTING JS */
/* VU SUR LA MED74 */
/* PAR COLIN PERAT */


/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.


(function ($) {

    // Use this variable to set up the common and page specific functions. If you
    // rename this variable, you will also need to rename the namespace below.
    var Sage = {
        // All pages
        'common': {
            init: function () {
                // JavaScript to be fired on all pages

                window.breakpoints = {
                    tablet: 768,
                    desktop: 1200
                };

                /******************
                 * Functions
                 */

                window.youtubeParser = function (url) {
                    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                    var match = url.match(regExp);
                    return (match && match[7].length == 11) ? match[7] : false;
                };

                /******************
                 * Scrollmagic init
                 */

                var controller = new ScrollMagic.Controller();

                var $navbarInner = $('#navbarInner');
                var controllerNavBar;
                var scene;

                $(window).load(function () {
                    enquire.register("screen and (min-width:" + window.breakpoints.desktop + "px)", {

                        // OPTIONAL
                        // If supplied, triggered when a media query matches.
                        match: function () {
                            // Adapt body height to menu height

                            TweenMax.set('#mainWrap', {minHeight: $navbarInner.outerHeight()});

                            // Pin

                            TweenMax.set($navbarInner, {position: "absolute"});

                            controllerNavBar = new ScrollMagic.Controller();

                            scene = new ScrollMagic.Scene({
                                triggerElement: "#navbar",
                                duration: Math.max(0, $('#mainWrap').outerHeight() - $navbarInner.outerHeight() - 40),
                                triggerHook: 0
                            })
                                .setPin("#navbarInner", {
                                    pushFollowers: false
                                })
                                .addTo(controllerNavBar);

                            $(window).on('resize.navbar load.navbar', scene.refresh);
                        },

                        // OPTIONAL
                        // If supplied, triggered when the media query transitions
                        // *from a matched state to an unmatched state*.
                        unmatch: function () {
                            $(window).off('.navbar');
                            TweenMax.set('#mainWrap', {clearProps: "all"});
                            TweenMax.set($navbarInner, {clearProps: "all"});
                            controllerNavBar.destroy(true);
                            controllerNavBar = null;
                            scene.destroy();
                            scene = null;
                        }

                    });
                });

                /*******************
                 * Navigation
                 *******************/

                    // Submenus

                var activeEl;
                var $primaryLinks = $('.menu-item-has-children').children('a');

                $primaryLinks.on('click', function (e) {
                    e.preventDefault();

                    if (this === activeEl) {
                        activeEl = null;
                        $(this).blur();
                    } else {
                        $(this).focus();
                        activeEl = this;
                    }

                });

                $primaryLinks.on('blur', function (e) {
                    activeEl = null;
                });

                $('.menu-item-has-children').find('ul').find('a').on('touchstart', function (e) {
                    e.stopPropagation();
                    window.location = $(this).attr('href');
                });

                /******************
                 * Navigation (mobile)
                 */

                    // Menu toggle

                var $navbar = $('#navbar');

                var $navToggle = $('#navbarToggle');
                var $nav = $('#lateralNav');

                function toggleMenu(e) {
                    e.stopPropagation();
                    e.preventDefault();

                    if ($nav.hasClass('open')) {
                        closeMenu();
                    } else {
                        openMenu();
                    }
                }

                function openMenu(e) {
                    $(window).one('click', closeMenu);
                    closeSearch();
                    $nav.addClass('open');
                    $navToggle.addClass('open');
                    $('body').addClass('mobile-menu-open');
                }

                function closeMenu(e) {
                    if (typeof e !== "undefined") {
                        e.preventDefault();
                    }

                    $(window).off('click', closeMenu);
                    $nav.removeClass('open');
                    $navToggle.removeClass('open');
                    $('body').removeClass('mobile-menu-open');
                }

                $navToggle.on('click', toggleMenu);

                $nav.on('click', function (e) {
                    e.stopPropagation();
                });

                // Search

                var $searchToggle = $('#navbarSearch');

                function toggleSearch(e) {
                    e.preventDefault();
                    $navbar.toggleClass('search-active');
                }

                function closeSearch() {
                    $navbar.removeClass('search-active');
                }

                $searchToggle.on('click', toggleSearch);

                /******************
                 * Page header
                 */

                var $headerBg = $('#pageHeaderBackground');

                if ($headerBg.length) {
                    new ScrollMagic.Scene({triggerElement: "#pageHeader", duration: 300, triggerHook: 0})
                        .setTween($headerBg[0], {y: 100, force3D: true, ease: Power0.easeNone}) // the tween durtion can be omitted and defaults to 1
                        .addTo(controller);
                }

                new CustomSelect($('.js-custom-select'), {
                    hidePlaceholderItem: true,
                    redirectOnClick: true
                });

                var $customSelects = $('.js-custom-select');

                var $pageHeader = $('#pageHeader');
                var $pageHeaderToggle = $('#pageHeaderToggle');

                function closeCustomSelect() {
                    TweenMax.set($customSelects, {clearProps: 'height'});
                }

                function toggleCustomSelect(e) {
                    var $this = $(this);

                    if (!$this.hasClass('open')) {
                        TweenMax.set($this, {clearProps: 'height'});
                    } else {
                        TweenMax.set($this, {height: 'auto'});
                    }

                    openPageHeader();
                }

                function openPageHeader() {
                    if ($pageHeader.hasClass('open'))
                        return;

                    var tmpHeight = $pageHeader.outerHeight();

                    $pageHeader.addClass('open');
                    $pageHeaderToggle.addClass('open');

                    TweenMax.set($pageHeader, {clearProps: 'all'});
                    TweenMax.from($pageHeader, 0.4, {height: tmpHeight});
                }

                function closePageHeader() {
                    var tmpHeight = $pageHeader.outerHeight();

                    $pageHeader.removeClass('open');
                    $pageHeaderToggle.removeClass('open');
                    TweenMax.set($pageHeader, {clearProps: 'all'});
                    TweenMax.from($pageHeader, 0.4, {maxHeight: tmpHeight});
                }

                function updatePageHeaderSize() {
                    var tmpHeight = $pageHeader.outerHeight();

                    TweenMax.set($pageHeader, {clearProps: 'all'});
                }

                function togglePageHeader(e) {
                    e.preventDefault();

                    if (!$pageHeader.hasClass('open')) {
                        openPageHeader();
                    } else {
                        closePageHeader();
                    }
                }

                var pageHeaderEventSet = false;

                function setCustomSelectEventListeners() {
                    if ($(window).width() < 1200 && !pageHeaderEventSet) {
                        pageHeaderEventSet = true;
                        $customSelects.on('closeAll', closeCustomSelect);

                        $customSelects.on('click', toggleCustomSelect);

                        $pageHeaderToggle.on('click', togglePageHeader);
                        $customSelects.on('open close', updatePageHeaderSize);
                    } else if (pageHeaderEventSet && $(window).width() >= 1200) {
                        TweenMax.set($pageHeader, {clearProps: 'all'});
                        pageHeaderEventSet = false;
                        $customSelects.off('closeAll', closeCustomSelect);

                        $customSelects.off('click', toggleCustomSelect);

                        $pageHeaderToggle.off('click', togglePageHeader);
                        $customSelects.off('open close', updatePageHeaderSize);
                    }
                }

                setCustomSelectEventListeners();
                $(window).resize(setCustomSelectEventListeners);

                /*******************
                 * SHARE
                 *******************/

                var $shareToggle = $('#shareToggle');

                if ($shareToggle.length) {
                    var $shareList = $('#shareList');

                    TweenMax.set($shareList, {display: 'block'});

                    var listTween = new TimelineMax({paused: true}).staggerFrom($shareList.find('li'), 0.3, {
                        y: 15,
                        opacity: 0
                    }, 0.1);

                    $shareToggle.on('click', function () {
                        if ($shareToggle.hasClass('open')) {
                            $shareToggle.removeClass('open');
                            listTween.reverse();
                        } else {
                            $shareToggle.addClass('open');
                            listTween.play();
                        }
                    });

                    $(window).on('ready load scroll', triggerShareScroll);

                    function triggerShareScroll(e) {
                        if ($(window).scrollTop() + $(window).height() > ($('.wrap').outerHeight(true) + $('.wrap').offset().top)) {
                            TweenMax.set('#share', {position: 'absolute'});
                        } else {
                            TweenMax.set('#share', {position: 'fixed'});
                        }
                    }
                }

                /******************
                 * UI
                 */

                // Ripple effect

                new Ripple($('.btn, .js-ripple'));

                /*$(document).ready(function () {
                    var modified_text = $(".waouh_module_B11:not(section) .elementor-text-editor p").text().replace("Chambre de commerce et d’industrie", "Chambre des métiers et de l’artisanat");
                    $(".waouh_module_B11:not(section) .elementor-text-editor p").text(modified_text);
                });*/



            },
            finalize: function () {
                // JavaScript to be fired on all pages, after page specific JS is fired
            }
        },
        // Home page
        'home': {
            init: function () {
                var $playBtn = $('#homeVideoPlay');

                titleSt = new SplitText(document.getElementById('homeHeroTitle'));
                subtitleSt = new SplitText(document.getElementById('homeHeroSubtitle'));

                var YTApiReady = false;
                var player;
                var videoID;

                var titleSt;
                var subtitleSt;
                var tl;

                function stopPlayer() {

                    window.onhashchange = null;
                    player.stopVideo();

                    var el = document.body;
                    var className = "hero-video-enabled";

                    tl.reverse(0);

                    if (el.classList) {
                        el.classList.remove(className);
                    } else {
                        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                    }
                }

                function onPlayerReady(event) {
                    var el = document.body;
                    var className = "hero-video-enabled";

                    if (el.classList) {
                        el.classList.add(className);
                    } else {
                        el.className += ' ' + className;
                    }

                    TweenMax.to(window, 1, {scrollTo: 0, ease: Quad.easeInOut});

                    if (tl instanceof TimelineMax) {
                        tl.restart();
                    } else {
                        document.getElementById('homeVideoClose').addEventListener('click', stopPlayer);

                        tl = new TimelineMax({
                            onStart: function () {
                                window.location.hash = "presentation";
                            },
                            onComplete: function () {
                                $playBtn.removeClass('btn--loading');
                                event.target.playVideo();
                                window.onhashchange = stopPlayer;
                            },
                            onReverseComplete: function () {
                                $playBtn.removeClass('btn--loading');
                                TweenMax.set(document.getElementById('navbar'), {clearProps: 'all'});
                                window.onhashchange = null;
                            }

                        })
                            .to(document.getElementById('heroTooltip'), 0.3, {
                                y: -50,
                                autoAlpha: 0,
                                ease: Quad.easeIn,
                                force3D: true
                            })
                            .to(document.getElementById('heroContent'), 0.3, {
                                y: 50,
                                autoAlpha: 0,
                                ease: Quad.easeIn,
                                force3D: true
                            }, 0.02, "-=0.2")
                            .staggerTo(subtitleSt.chars, 0.3, {
                                y: -50,
                                autoAlpha: 0,
                                ease: Quad.easeIn,
                                force3D: true
                            }, 0.02, "-=0.2")
                            .staggerTo(titleSt.chars, 0.3, {
                                y: -50,
                                autoAlpha: 0,
                                ease: Quad.easeIn,
                                force3D: true
                            }, 0.02, "-=0.5")
                            .to(document.getElementById('navbar'), 0.3, {
                                x: "-100%",
                                autoAlpha: 0,
                                ease: Quad.easeIn,
                                force3D: false
                            }, 0.02)
                            .to(document.getElementById('homeVideo'), 0.5, {opacity: 1, force3D: true});
                    }
                }

                window.onYouTubeIframeAPIReady = function () {
                    console.log("youtube api ready");
                    YTApiReady = true;

                    player = new YT.Player('homeVideo', {
                        height: '390',
                        width: '640',
                        videoId: videoID,
                        events: {
                            'onReady': onPlayerReady
                            //'onStateChange': onPlayerStateChange
                        }
                    });
                };

                $playBtn.on('click', function (e) {
                    // JavaScript to be fired on the home page
                    // 2. This code loads the IFrame Player API code asynchronously.
                    e.preventDefault();
                    videoID = youtubeParser($(this).attr('href'));

                    $playBtn.addClass('btn--loading');

                    if (YTApiReady) {
                        onPlayerReady();
                    } else {
                        var tag = document.createElement('script');

                        tag.src = "https://www.youtube.com/iframe_api";
                        document.body.appendChild(tag);
                    }
                });

                /**************
                 * Blocks animation
                 */

                if ($(window).width() >= window.breakpoints.desktop) {
                    var controller = new ScrollMagic.Controller();

                    var $homeBlocks = $('#homeBlocks').find('.block-wrapper');

                    var blocksTween = TweenMax.staggerFrom($homeBlocks, 0.6, {y: 100, autoAlpha: 0}, 0.1);

                    var blocksScene = new ScrollMagic.Scene({
                        triggerElement: "#homeBlocks",
                        triggerHook: 0.75,
                        reverse: false
                    })
                        .setTween(blocksTween) // trigger a TweenMax.to tween
                        .addTo(controller);
                }

                /*******************
                 * NEWSLETTER HIGHLIGHT
                 *******************/

                if (window.location.hash === '#newsletter') {
                    $(window).load(function () {
                        $('[name=subscriber-email]').focus();
                        TweenMax.to('.js-footer-content', 0.8, {
                            backgroundColor: '#1298a0',
                            yoyo: true,
                            repeat: 1,
                            delay: 0.7
                        });
                    });
                }
            },
            finalize: function () {
                // JavaScript to be fired on the home page, after the init JS
            }
        },
        'page_template_template_cible': {
            init: function () {
                $('#eventSlider').slick({

                    slidesToShow: 1,
                    slidesToScroll: 1,
                    cssEase: 'ease-in-out',
                    infinite: false,

                    // the magic
                    responsive: [{

                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 1
                        }

                    }, {

                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }

                    }, {

                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }

                    }]
                });

                $('#cibleNavWrapper').find('.js-cible-nav').on('change', function () {
                    window.location = $(this).val();
                });

                /****************
                 * VIDEO
                 */

                var videoId;
                var YTApiReady = false;
                var $videoLink = $('#cibleVideoLink');
                var player;

                function onPlayerReady() {
                    player.playVideo();

                    new TimelineMax({
                        onComplete: function () {
                            TweenMax.set($videoLink, {display: "none"});
                        }
                    })
                        .to($videoLink.find('.before'), 0.7, {y: "-55%", ease: Quad.easeIn}, 0)
                        .to($videoLink.find('.after'), 0.7, {y: "55%", ease: Quad.easeIn}, 0)
                        .to($videoLink.find('.cible__intro__video'), 0.5, {
                            scale: 2,
                            autoAlpha: 0,
                            display: "none",
                            ease: Quad.easeIn
                        }, 0.5);
                }

                window.onYouTubeIframeAPIReady = function () {
                    YTApiReady = true;

                    player = new YT.Player('cibleIframeWrapper', {
                        height: '390',
                        width: '640',
                        videoId: videoId,
                        events: {
                            'onReady': onPlayerReady
                            //'onStateChange': onPlayerStateChange
                        }
                    });
                };

                $('#cibleVideoLink:not([href=""])').on('click', function (e) {
                    // JavaScript to be fired on the home page
                    // 2. This code loads the IFrame Player API code asynchronously.

                    e.preventDefault();
                    videoId = youtubeParser($(this).attr('href'));

                    if (YTApiReady) {
                        onPlayerReady();
                    } else {
                        var tag = document.createElement('script');

                        tag.src = "https://www.youtube.com/iframe_api";
                        document.body.appendChild(tag);
                    }
                });
            }
        },
        'post_type_archive_med_event': {
            init: function () {
                // Sidebar push event

                var scene = {
                    update: function () {
                    },
                    updateDuration: function () {
                    }
                };

                if ($(window).width() >= window.breakpoints.desktop) {
                    var controller = new ScrollMagic.Controller();

                    scene = new ScrollMagic.Scene({
                        triggerElement: "#sidebar",
                        duration: Math.max(0, $('#content').outerHeight() - $('#pushEvent').outerHeight()),
                        triggerHook: 0
                    })
                        .setPin("#pushEvent")
                        .addTo(controller);

                    scene.updateDuration = function () {
                        this.duration(Math.max(0, $('#content').outerHeight() - $('#pushEvent').outerHeight()));
                    };
                }

                // Agenda filtering and navigation

                var $eventList;
                var $filters = $('.navAgendaFilters').find('.js-nav-filter');
                var interval;
                var monthSt;
                var $loader = $('#agendaLoader');

                function startAgendaLoading() {
                    TweenMax.to($loader, 10, {
                        scaleX: 0.8,
                        ease: Sine.easeOut
                    });
                }

                function endAgendaLoading() {
                    TweenMax.killTweensOf($loader);

                    TweenMax.to($loader, 0.3, {
                        scaleX: 1, onComplete: function () {
                            TweenMax.to($loader, 0.2, {opacity: 0, clearProps: "all"});
                        }
                    });
                }

                function updateFilters() {
                    clearInterval(interval);
                    var target = $filters.filter('.active').data('target');


                    $eventList.find('.js-agenda-event').css('display', 'none');

                    endAgendaLoading();

                    if (target === "*") {
                        $eventList.find('.js-agenda-event').css('display', 'block');

                        if (!$eventList.find('.js-agenda-event').length) {
                            $eventList.addClass('empty');
                        }
                    } else {
                        var dataName = "";
                        var data = "";

                        $filters.filter('.active').each(function () {

                            if($(this).data("target")) {
                                dataName = "target";
                                data= $(this).data("target");
                            }
                            else if($(this).data("theme")) {
                                dataName = "theme";
                                data = $(this).data("theme");
                            }
                            else if($(this).data("filiere")) {
                                dataName = "filiere";
                                data = $(this).data("filiere");
                            }

                            $eventList.find('.js-agenda-event[data-'+dataName+'*="' + data + ',"]').css('display', 'block');

                            if (!$eventList.find('.js-agenda-event[data-'+dataName+'*="' + data + ',"]').length && $filters.filter('.active').length === 1) {
                                $eventList.addClass('empty');

                                if ($eventList.find('.js-agenda-event').length) {
                                    $eventList.addClass('empty--cat-only');
                                }
                            }
                        })
                    }

                    if (scene.updateDuration) {
                        scene.updateDuration();
                    }
                }

                function changeFilter(e) {
                    e.preventDefault();
                    $this = $(this);

                    clearInterval(interval);

                    if($this.data('target') == "*") {
                        $filters.removeClass('active');
                        $this.addClass('active');
                    }
                    else {
                        //$filters.removeClass('active');
                        $this.toggleClass('active');
                        $($filters[0]).removeClass('active');

                        if($filters.parent().find('.active').length < 1 ) {
                            $($filters[0]).addClass('active');
                        }
                    }



                    startAgendaLoading();
                    $eventList.removeClass('empty');
                    $eventList.removeClass('empty--cat-only');

                    eventListItemOutAnim(function () {
                        console.log("callback");
                        $eventList.find('.js-agenda-event').css('display', 'none');

                        updateFilters();

                        eventListItemInAnim();
                    });
                }

                $filters.on('click', changeFilter);

                $('.selecteur').on('click', function () {
                    $(this).parent().toggleClass('open')
                });

                function eventListItemOutAnim(callback) {
                    callback = callback || function () {
                    };

                    if ($eventList.find('.js-agenda-event').length) {
                        TweenMax.staggerTo($eventList.find('.js-agenda-event'), 0.3, {
                            y: 30,
                            opacity: 0,
                            ease: Quad.easeInOut
                        }, 0.08, callback);
                    } else {
                        callback();
                    }
                }

                function eventListItemInAnim(callback) {
                    callback = callback || function () {
                    };

                    if ($eventList.find('.js-agenda-event').length) {
                        TweenMax.staggerFromTo($eventList.find('.js-agenda-event'), 0.3, {
                            y: 30,
                            opacity: 0
                        }, {
                            y: 0,
                            opacity: 1,
                            ease: Quad.easeInOut
                        }, 0.08, callback);
                    } else {
                        callback();
                    }
                }

                function loadAgendaList(e) {
                    var $this = $(this);

                    e.preventDefault();
                    startAgendaLoading();
                    $eventList.removeClass('empty');
                    $eventList.removeClass('empty--cat-only');

                    history.pushState({}, e.target.textContent, e.target.href);

                    eventListItemOutAnim();

                    TweenMax.staggerTo(monthSt.chars, 0.18, {
                        y: -5,
                        opacity: 0,
                        ease: Quad.easeInOut
                    }, 0.03, function () {
                        $('#agendaNavMonthTitle').html($this.attr("data-date-string"));
                        monthSt = new SplitText(document.getElementById('agendaNavMonthTitle'));

                        TweenMax.staggerFrom(monthSt.chars, 0.18, {
                            y: 5,
                            opacity: 0,
                            ease: Quad.easeInOut
                        }, 0.03);

                        $.get($this.attr('href'), function (data) {
                            $eventList.replaceWith($(data).find("#" + $eventList.attr('id')));

                            $eventList.removeClass('empty');
                            $eventList.removeClass('empty--cat-only');
                            initAgenda();

                            $('#agendaNavMonth').replaceWith($(data).find("#agendaNavMonth"));

                            initNav(data);

                            eventListItemInAnim();

                            updateFilters();
                        });
                    });
                }

                function initAgenda() {
                    $eventList = $('#agendaEventList');
                    endAgendaLoading();
                }

                function initNav() {
                    monthSt = new SplitText(document.getElementById('agendaNavMonthTitle'));
                    $('#agendaNavPrev, #agendaNavNext').on('click', loadAgendaList);
                }

                initAgenda();
                initNav();

            }
        },

        'page_template_template_contact': {
            init: function () {
                new MaterialInput($('.js-material-input'));
            }
        },

        'page_template_template_map': {
            init: function () {
                function wpgmapsAddEventListener() {
                    $('.wpgmaps_blist_row')
                        .off('.med_wpgmaps')
                        .on('click.med_wpgmaps', function (e) {
                            $('html,body').animate({scrollTop: $('.wpgmza_map').offset().top});
                        });
                }

                wpgmapsAddEventListener();

                $('.wpgmza_checkbox').on('change', function (e) {
                    setTimeout(function () {
                        wpgmapsAddEventListener();
                    }, 1500);
                });
            }
        },
        'elementor_page': {
            init: function () {
                // change section

                if ($('.waouh_main_section').length && !$('body').hasClass('elementor-editor-active')) {
                    launch_loader();
                }

                // responsive menu

                $('.waouh_main_section').append("<div class='waouh_resp_menu'>En savoir +</div>");

                $(".waouh_resp_menu").click(function (e) {
                    $('.waouh_main_section').toggleClass("is_opened");
                    $("html, body").animate({
                        scrollTop: 0
                    }, "slow");
                });

                // if elementor editor
                if (!$('.elementor-editor-active').length) {
                    $.when(download_page()).then(initiate_page);
                }

                // loading functions

                function download_page() {
                    return $.get("/rezup2", function (data) {
                        // $(".result").html(data);
                        $(".waouh_main_section > div > div").append($(data).find(".waouh_import > div > div").contents());
                    });
                }

                function gestion_carousel_nav() {

                    // gestion des fleches du carousel
                    var carouselParentNav = $(".waouh_navigation:not(.fadeOut):visible .waouh_selected");

                    if (carouselParentNav.closest('.elementor-column').prev('.elementor-column').find('.waouh_button a').length === 0) {
                        $('.slideWaouhGauche').hide();
                        $('.slideWaouhDroite').show();
                    }

                    if (carouselParentNav.closest('.elementor-column').next('.elementor-column').find('.waouh_button a').length === 0) {
                        $('.slideWaouhDroite').hide();
                        $('.slideWaouhGauche').show();
                    }

                    if (carouselParentNav.closest('.elementor-column').prev('.elementor-column').find('.waouh_button a').length !== 0 && carouselParentNav.closest('.elementor-column').next('.elementor-column').find('.waouh_button a').length !== 0) {
                        $('.slideWaouhDroite').show();
                        $('.slideWaouhGauche').show();
                    }

                }


                var wrapperCustom; // global wrapper around waouh_modules

                var current_section = 'A1';
                var array_section = ['A2', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B71', 'B8', 'B9', 'B10', 'B11', 'B12', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'D1', 'E1', 'F1'];

                function setModulesPosition() {
                    setTimeout(function () {

                        var containerHeight = 0;

                        $.each(array_section, function (indexInArray, valueOfElement) {
                            var top_spacing = 0;
                            $('.waouh_module_' + valueOfElement).each(function (index, element) {
                                $(this).css('top', top_spacing + 'px');
                                top_spacing += 20;
                                top_spacing += $(this).height();
                            });
                            if (valueOfElement == current_section) {
                                containerHeight = top_spacing;
                            }
                        });

                        if (containerHeight == 0) containerHeight = 'auto';

                        // Set container height based on current module
                        wrapperCustom.css({
                            height: containerHeight
                        });
                    }, 1000);
                }


                function initiate_page() {
                    $(".waouh_module_C1 .slick-slide .slick-slide-image").each(function () {
                        $("<span>" + $(this).attr("alt") + "</span>").insertAfter(this);
                    });

                    start_carousell();


                    // Set custom wrapper
                    $(".waouh_sidebar").prev().wrap('<div class="wrapper-elt-custom"></div>');
                    wrapperCustom = $('.wrapper-elt-custom');


                    // All the module EXCEPT those of first step (A1) have the class .waouh_module => hide all except first section
                    var animationHasEnded = false;
                    $('.waouh_module').addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        if (!animationHasEnded) { // needed because we pass here 140 times...
                            animationHasEnded = true;
                            // Remove launch loader after .waouh_module transition fadeout
                            $('#overlay').remove();
                        }
                    });


                    // Position the (now hidden) modules
                    setModulesPosition();


                    var windowResize = function () {
                        var w = window,
                            d = document,
                            e = d.documentElement,
                            g = d.getElementsByTagName('body')[0],
                            x = w.innerWidth || e.clientWidth || g.clientWidth;

                        var $elt = $('.rezup.sidebar-primary .elementor-2596 .elementor-element.elementor-element-oohxrva');
                        var clone = $elt.clone(true);

                        if (x <= 992) {
                            if (!$elt.hasClass('w_992')) {
                                $elt.addClass('w_992');
                                $elt.removeClass('w_more_992');

                                if (wrapperCustom.length) {
                                    $elt.remove();
                                    clone.appendTo(wrapperCustom.closest('.main').find('.elementor-inner>.elementor-section-wrap').parent());
                                }
                            }
                        } else {
                            if (!$elt.hasClass('w_more_992')) {
                                $elt.addClass('w_more_992');
                                $elt.removeClass('w_992');

                                if (wrapperCustom.length) {
                                    var $tmp = $elt;
                                    if ($tmp.length) {
                                        clone = $elt.clone(true);
                                        $elt.remove();

                                        wrapperCustom.find('>div>div>div').append(clone);

                                    }
                                }
                            }
                        }

                        // Reposition the modules
                        setModulesPosition();
                    };

                    $(window).off('resize').on('resize', windowResize);


                    $.fn.extend({
                        animateCss: function (animationName, this_section, new_section) {
                            var animation_done = 0;
                            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                            if ($(window).width() < 960) {
                                var fadedOut = "fadeOut";
                            } else {
                                var fadedOut = "fadeOut" + animationName;
                            }


                            $(".waouh_module_" + this_section).addClass('animated ' + fadedOut).one(animationEnd, function () {
                                if (animation_done == 0) {
                                    $(".waouh_module_" + this_section).addClass('animated ' + "fadeOut");
                                    $(".waouh_module_" + this_section).removeClass(' fadeInUpBig' + ' fadeInRightBig' + ' fadeInLeftBig' + ' fadeInDownBig');
                                    $(".waouh_module_" + new_section).removeClass('animated' + ' fadeOut' + ' fadeOutUp' + ' fadeOutRight' + ' fadeOutLeft' + ' fadeOutDown' + ' fadeInUpBig' + ' fadeInRightBig' + ' fadeInLeftBig' + ' fadeInDownBig');
                                    animation_done++;


                                    switch (animationName) {
                                        case "Right":
                                            $(".waouh_module_" + new_section).addClass('animated fadeIn' + "Left" + "Big");
                                            break;
                                        case "Left":
                                            $(".waouh_module_" + new_section).addClass('animated fadeIn' + "Right" + "Big");
                                            break;
                                        default:
                                            $(".waouh_module_" + new_section).addClass('animated fadeIn' + animationName + "Big");
                                    }

                                    $(".waouh_module").css("z-index", "0");
                                    $(".waouh_module_" + new_section).css("z-index", "10");


                                    // Update current section var
                                    current_section = new_section;

                                    // Set container height
                                    var top_spacing = 0;
                                    $('.waouh_module_' + new_section).each(function (index, element) {
                                        top_spacing += 20;
                                        top_spacing += $(this).height();
                                    });
                                    wrapperCustom.css({
                                        height: top_spacing
                                    });


                                    gestion_carousel_nav();
                                }
                            });
                        }
                    });

                    if ($(".elementor-widget-button:not(.waouh_lien) .elementor-button, .elementor-icon-list-text").length > 0) {

                        // add element
                        var slideWaouhHtml = "<div class='slideWaouh'><div class='slideWaouhAction slideWaouhGauche'></div><div class='slideWaouhAction slideWaouhDroite'></div></div>";

                        // add element to section
                        //$(".waouh_sidebar").prev().wrap('<div class="wrapper-elt-custom"></div>');
                        $('.wrapper-elt-custom').append(slideWaouhHtml);

                        // add event
                        $('body').on('click', '.slideWaouhAction', function (e) {
                            e.preventDefault();

                            // on recupere la navigation visible
                            var $waouhCurrent = $(".waouh_navigation:not(.fadeOut):visible .waouh_selected");

                            if ($(this).hasClass("slideWaouhGauche")) {
                                $waouhCurrent.closest('.elementor-column').prev('.elementor-column').find('.waouh_button a').trigger('click');
                            } else {
                                $waouhCurrent.closest('.elementor-column').next('.elementor-column').find('.waouh_button a').trigger('click');
                            }
                        });

                        gestion_carousel_nav();

                    }


                    $(".elementor-widget-button:not(.waouh_lien) .elementor-button, .elementor-icon-list-text").click(function (event) {
                        event.preventDefault();


                        $("html, body").animate({
                            scrollTop: 175
                        }, "slow");

                        var classStr = $(this).closest(".waouh_button").attr("class");

                        var arrCls = classStr.split(" ");
                        var arrClsTmp = [];
                        var target = "";

                        $.each(arrCls, function (i, v) {
                            arrClsTmp = v.split('_');

                            if (arrClsTmp.length === 3) {
                                target = arrClsTmp;
                            }
                        });

                        $(this).animateCss(target[0], target[1], target[2]);
                    });
                }

                function start_carousell() {
                    $(".waouh_module .elementor-image-carousel").not('.slick-initialized').slick({
                        "slidesToShow": 1,
                        "autoplaySpeed": 3000,
                        "autoplay": true,
                        "infinite": true,
                        "pauseOnHover": true,
                        "speed": 500,
                        "arrows": false,
                        "dots": true,
                        "rtl": false,
                        "slidesToScroll": 1,
                        responsive: [
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            },
                            {
                                breakpoint: 500,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }
                        ]
                    });

                    $('.waouh_module .elementor-image-carousel').slick('slickPlay');
                }

                function launch_loader() {
                    // add the overlay with loading image to the page
                    var over = '<div id="overlay">' +
                        '<i id="loading" class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Loading...</span>' +
                        '</div>';

                    $(over).appendTo('body');

                    // click on the overlay to remove it

                    //$('#overlay').click(function() {
                    //    $(this).remove();
                    //});

                    // hit escape to close the overlay

                    /*setTimeout(function () {
                        $('#overlay').remove();
                    }, 3000);*/
                }
            }
        }
    };

    // The routing fires all common scripts, followed by the page specific scripts.
    // Add additional events for more control over timing e.g. a finalize event
    var UTIL = {
        fire: function (func, funcname, args) {
            var fire;
            var namespace = Sage;
            funcname = (funcname === undefined) ? 'init' : funcname;
            fire = func !== '';
            fire = fire && namespace[func];
            fire = fire && typeof namespace[func][funcname] === 'function';

            if (fire) {
                namespace[func][funcname](args);
            }
        },
        loadEvents: function () {
            // Fire common init JS
            UTIL.fire('common');

            // Fire page_specific init JS, and then finalize JS
            $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function (i, classnm) {
                UTIL.fire(classnm);
                UTIL.fire(classnm, 'finalize');
            });

            // Fire common finalize JS
            UTIL.fire('common', 'finalize');
        }
    };

    // Load Events
    $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
