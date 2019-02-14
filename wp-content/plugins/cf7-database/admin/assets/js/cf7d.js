jQuery(document).ready(function($) {
    jQuery('#cf7d-list-field').sortable({
        placeholder: "sortable-placeholder"
    });
    jQuery('#cf7d-list-field li span.dashicons').click(function(event) {
        var $this = jQuery(this);
        var $parent = $this.parent();
        var $custom_label = $parent.find('.txt_show');
        //currently visible
        if ($this.hasClass('dashicons-visibility')) {
            $this.removeClass('dashicons-visibility').addClass('dashicons-hidden');
            $parent.removeClass('show').addClass('hide');
            $custom_label.val('0');
        } else if ($this.hasClass('dashicons-hidden')) {
            $this.removeClass('dashicons-hidden').addClass('dashicons-visibility');
            $parent.removeClass('hide').addClass('show');
            $custom_label.val('1');
        }
    });
    /*jQuery('#doaction').click(function(event) {
        alert('This function is not available for demo');
        return false;
    });
    jQuery('#doaction2').click(function(event) {
        alert('This function is not available for demo');
        return false;
    });*/
    /*
     * Edit value    
     */
    jQuery('a.cf7d-edit-value').click(function(event) {
        var rid = jQuery(this).data('rid');
        jQuery('form#cf7d-modal-form-edit-value input[name="rid"]').attr('value', rid);

        jQuery('form#cf7d-modal-form-edit-value input[class^="field-"]').attr('value', 'Loading...');
        jQuery.ajax({
            url: ajaxurl + '?action=cf7d_edit_value',
            type: 'POST',
            data: {'rid': rid},
        })
        .done(function(data) {
            var json = jQuery.parseJSON(data);
            jQuery.each(json, function(index, el) {
                jQuery('form#cf7d-modal-form-edit-value .field-' + index).attr('value', el);
            });
            jQuery('#cf7d-modal-form-edit-value').removeClass('loading');
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
        
    });
    /*
     * Change theme
     */
    var cf7d_cookie_theme = readCookie('cf7d-admin-list');
    if (cf7d_cookie_theme == null) {
        createCookie('cf7d-admin-list', 'vertical', 30);
    }
    cf7d_cookie_theme = readCookie('cf7d-admin-list');
    if (cf7d_cookie_theme == 'horizontal') {
        jQuery('.cf7d-switch-theme-vertical').removeClass('active');
        jQuery('.cf7d-switch-theme-horizontal').addClass('active');
    } else {
        jQuery('.cf7d-switch-theme-vertical').addClass('active');
        jQuery('.cf7d-switch-theme-horizontal').removeClass('active');
    }
    jQuery('.cf7d-admin-table').addClass(cf7d_cookie_theme);
    
    jQuery('.cf7d-switch-theme').click(function(event) {
        var $this = jQuery(this);
        jQuery('.cf7d-switch-theme').removeClass('active');

        $this.addClass('active');
        if ($this.hasClass('cf7d-switch-theme-horizontal')) {
            jQuery('.cf7d-admin-table').addClass('horizontal');
            createCookie('cf7d-admin-list', 'horizontal', 30);
        } else {
            jQuery('.cf7d-admin-table').removeClass('horizontal');
            createCookie('cf7d-admin-list', 'vertical', 30);
        }

    });
    /*
     * Search
     */
    jQuery('#cf7d-search-btn').click(function(event) {
        var $this = jQuery(this);
        var form = jQuery('#cf7d-admin-action-frm');
        var q = jQuery('#cf7d-search-q').val();
        if (q != "") {
            var fid = jQuery('input[name="fid"]', form).val();
            var url = $this.data('url');
            location.replace(url + '&fid=' + fid + '&search=' + q)
        } else {
            return false;
        }
    });
    /**
     * Export
     */
    /*jQuery('#cf7d-export').on('change', function() {
        var $val = $(this).find(":selected").val();
        if ($val != -1) {
            var $fid = jQuery(this).data('fid');
            jQuery.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {'action': 'cf7d_export_entry', 'type': 'csv', 'fid': $fid}
            })
            .done(function() {
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            });
            
        }
    });*/
});
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}