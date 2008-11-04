(function($) {

  $.fn.iconoline = function(options) {
    // Extend our default options with those provided.
    // Note that the first arg to extend is an empty object -
    // this is to keep from overriding our "defaults" object.
  	var opts = $.extend({}, $.fn.iconoline.defaults, options);
    
    // if the "autoIcon" behavior is enabled (it is by default)
    // then consult the "mapping" function for matching patterns and add appropriate classes
    if(opts.autoIcon){
      $.each( mapping, function(k, v) {
        $(k).addClass(v);
      });
    }

    // find all elements with a class matching the "icon-folder_name-image_name" convention
    this.filter (function(){
      return $(this).attr('className').match(/icon-(\w*)-(\w*)/);
    }).each( function(){ 
      var i = 0;
      var classNames = $(this).attr('className').split(' ');
      var valid_class = '';
      while(i <= classNames.length - 1){ 
        if(classNames[i].match(/icon-(\w*)-(\w*)/)){
          valid_class = classNames[i];
        }
        i = i + 1;
      }
      var icon_path = valid_class.split('-');
    
      // add the appropriate background image
      // Note:  You can choose to point to png or gif (or anything else)
      $(this).css('background-image','url(' + opts.path + '/' + icon_path[1] + '/' + opts.format + '/' + icon_path[2] + '.' + opts.format + ')');
    
      // add the "iconic" class which will set up appropriate spacing, padding, margins, etc.
      $(this).addClass('iconic');
    })

    // disable auto icon behavior for a single element
    $('.no-icon').css({backgroundImage:"none", margin:0, padding:0});

    // disable the auto icon behavior for an entire table
    $('table.no-icons a').css({backgroundImage:"none", margin:0, padding:0});

    // disable auto icon behavior for a list - note that we aren't setting the margin and padding
    // to 0 because ul's often represent navigation
    $('ul.no-icons a, ol.no-icons a').css({backgroundImage:"none"});

  };
  
  // default mapping for common document types
  // add more or override in onReady...
  // Example:  $.fn.iconoline.autoIconMap['a[href$=".my_extension"]'] = 'icon-doctypes-whatever'
  var mapping = $.fn.iconoline.autoIconMap = {
	  'a[href^="mailto:"]':'icon-silk-email',
	  'a[href$=".pdf"]':'icon-silk-page_white_acrobat',
	  'a[href$=".doc"]':'icon-silk-page_white_word',
	  'a[href$=".docx"]':'icon-silk-page_white_word',
	  'a[href$=".xls"]':'icon-silk-page_white_excel',
	  'a[href$=".xlsx"]':'icon-silk-page_white_excel',
	  'a[href$=".txt"]':'icon-doctypes-txt',
	  'a[href$=".ppt"]':'icon-doctypes-ppt',
	  'a[href$=".zip"]':'icon-doctypes-zip'
	};
	
  //
  // plugin defaults
  // scripts can now get at these defaults with...
  // Example:  $.fn.iconoline.defaults.format = 'png'
  $.fn.iconoline.defaults = {
    // point to either gif or png icon images
		format: 'gif',
		// by default icons are located in /images/icons/icon-set-name/gif/
		// the "gif" portion of the path will be changed to png automatically if the format is changed
		// the /images/icons path can be changed, but the icon-set-name portion will need
		// to be changed within the code
		path: 'images/icons',
		// enable/disable the auto-inclusion of icons based upon patterns
		// included in the mapping object
		autoIcon: true 
	};

})(jQuery);