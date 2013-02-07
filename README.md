Crimson Tour
=========
Author: [drazion]

Crimson Tour is a Javascript Library that allows you to add a web tour tool to your website.  The color scheme is fully customizable.  There are no CSS3 or version dependent components to this tool, although CSS3 is used to style the boxes, the stylings are not required to view the pages. It is the most backwards compatible and lightweight tour library I have encountered thus far.
> Tested and functional in the following browers:
  - FireFox 
  - Chrome
  - Safari
  - Internet Explorer 7, 8, 9

A working example is available at [Crimson Cardinal][1].  

Usage & Installation
--------------
1. Copy the tour/js and tour/css to your server. 
2. Call the `tour.js` script in your header file `<script src="js/tour.js" type="text/javascript"></script>`.
3. Initialize the tour inbetween your `<head> ... </head>` 
> `<script type="text/javascript"> var tour = new Tour();` 
> `var tour = new Tour()`
4. Add one to multiple steps by repeating the following:
> `tour.newStep({
    placement: "element_identifier",
    position: "location",
    title: "title",
    content: "Tour Box Content",
    animation: true
});`
5. newStep elements are as follows:
> `placement`: the identifier for your element (ex. `#top_banner` or `.top_banner`)
> `position`: One of the following  will specify where to place the tool tip relative to your element `n`, `ne`, `e`, `se`, `s`, `sw`, `w`, `nw`
> `title`: The title of the tour box
> `content`: The content text of your box, HTML is suppoted
> `animation`: Not current supported - coming in future version
6. Start the tour by executing this command when the document is ready (ex).
> ` $(document).ready(function(){
        tour.start();
    });`
7. You can also fire the tour on click by calling tour.start() on item click (ex).
> `$(document).on('click', '#start_tour', function() { 
tour.start(); 
})`

Version
----

Alpha 1.0

Tech
-----------

Crimson Tour relies on [jQuery] library to function

License
-
MIT

  [drazion]: mailto:aaron.harvey@gmail.com
  [1]: http://www.crimson-cardinal.com/crimson_tour
  [jQuery]: http://jquery.com  
  
    
