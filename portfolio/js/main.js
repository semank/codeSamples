    $(document).ready(new function() {
      // Prepare layout options.
      var options = {
        autoResize: true, // This will auto-update the layout when the browser window is resized.
        container: $('#wookmark'), // Optional, used for some extra CSS styling
        offset: 5, // Optional, the distance between grid items
      };

      // Get a reference to your grid items.
      var handler = $('#tiles li');

      // Call the layout function.
      handler.wookmark(options);

      // Capture clicks on grid items.
      handler.click(function(){
        // Randomize the height of the clicked item.
        var newHeight = $('img', this).height() + Math.round(Math.random()*300+30);
        $(this).css('height', newHeight+'px');

        // Update the layout.
        handler.wookmark();
      });
    });