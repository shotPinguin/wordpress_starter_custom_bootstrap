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
//# sourceMappingURL=core.js.map
