$(document).ready(function(){

  // parse hyperlinks for document types to automatically include icon
  $('a[href^="mailto:"]').addClass('icon-silk-email')
  $('a[href$=".pdf"]').addClass('icon-silk-page_white_acrobat')
  $('a[href$=".doc"], a[href$=".docx"]').addClass('icon-silk-page_white_word')
  $('a[href$=".xls"], a[href$=".xlsx"]').addClass('icon-silk-page_white_excel')
  $('a[href$=".txt"]').addClass('icon-doctypes-txt') 
  $('a[href$=".ppt"]').addClass('icon-doctypes-ppt') 
  $('a[href$=".zip"]').addClass('icon-doctypes-zip')
  
  // find all elements with a class matching the "icon-folder_name-image_name" convention
  $('*').filter (function(){
    return $(this).attr('className').match(/icon-(\w*)-(\w*)/);
  }).each( function(){ 
    var i = 0
    var classNames = $(this).attr('className').split(' ')
    var valid_class = ''
    while(i <= classNames.length - 1){ 
      if(classNames[i].match(/icon-(\w*)-(\w*)/)){
        valid_class = classNames[i]
      }
      i = i + 1
    }
    var icon_path = valid_class.split('-')
    
    // add the appropriate background image
    // Note:  You can choose to point to png or gif (or anything else)
    $(this).css('background-image','url(images/icons/' + icon_path[1] + '/gif/' + icon_path[2] + '.gif)')
    
    // add the "iconic" class which will set up appropriate spacing, padding, margins, etc.
    $(this).addClass('iconic')
    
  })


  // disable auto icon behavior for a single element
  $('.no-icon').css({backgroundImage:"none", margin:0, padding:0});

  // disable the auto icon behavior for an entire table
  $('table.no-icons a').css({backgroundImage:"none", margin:0, padding:0});

});