/**
	Copyright (c) 2008 Tim Blair; http://tim.bla.ir/

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/

/** 
 * @description   
 * @author        Tim Blair; http://tim.bla.ir/
 * @date          04/11/2008
 * @requires      prototype.js 1.6
*/

Iconoline = Class.create(Abstract, {

    initialize: function(options) {
        this.options = Object.extend(Iconoline.Defaults, options || {});
        // auto-addition of some icons?
        if (this.options.autoIcon) {
            $H(Iconoline.AutoIconMap).each(function(map) {
               $$(map.key).each(function(e) { e.addClassName(map.value); })
            });
        };
    },

    iconoline: function(klass) {
        var klass = klass || '[class*=icon-]';  // base class: default = anything with a classname starting icon-
        // find elems matching the provided class and reject those without an icon
        $$(klass).select(
            function(e) { return e.className.match(/icon-(\w*)-(\w*)/); }
        // apply the appropriate icon to each elem
        ).each(function(e) {
            var icon_klasses = $w(e.className);
            var icon_klass = "";
            // find the icon class name
            for (var i = 0; i < icon_klasses.length; i++) {
                if (icon_klasses[i].match(/icon-(\w*)-(\w*)/)) {
                    icon_klass = icon_klasses[i];
                    break;
                }
            }
            var icon_path = icon_klass.split('-');
            // add the appropriate background image
            e.setStyle({backgroundImage: 'url(' + this.options.path + '/' + icon_path[1] + '/' + this.options.format + '/' + icon_path[2] + '.' + this.options.format + ')'});
            // add the "iconic" class which will set up appropriate spacing, padding, margins, etc.
            e.addClassName('iconic');
        }.bind(this));

        // disable auto icon behavior for a single element
        $$('.no-icon').invoke('setStyle', { backgroundImage:"none", margin:0, padding:0 });

        // disable the auto icon behavior for an entire table
        $$('table.no-icons a').invoke('setStyle', { backgroundImage:"none", margin:0, padding:0 });

        // disable auto icon behavior for a list - note that we aren't setting the margin and padding
        // to 0 because ul's often represent navigation
        $$('ul.no-icons a, ol.no-icons a').invoke('setStyle', { backgroundImage:"none" });
    }
});

Iconoline.AutoIconMap = {
    'a[href^="mailto:"]' : 'icon-silk-email',
    'a[href$=".pdf"]'    : 'icon-silk-page_white_acrobat',
    'a[href$=".doc"]'    : 'icon-silk-page_white_word',
    'a[href$=".docx"]'   : 'icon-silk-page_white_word',
    'a[href$=".xls"]'    : 'icon-silk-page_white_excel',
    'a[href$=".xlsx"]'   : 'icon-silk-page_white_excel',
    'a[href$=".txt"]'    : 'icon-doctypes-txt',
    'a[href$=".ppt"]'    : 'icon-doctypes-ppt',
    'a[href$=".zip"]'    : 'icon-doctypes-zip'
};

Iconoline.Defaults = {
	format   : 'gif',
	path     : 'images/icons',
	autoIcon : true
};
