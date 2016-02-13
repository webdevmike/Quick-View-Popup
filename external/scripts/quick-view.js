var quickView = {};
(function($) {
    quickView = {

        items: [],
        go: function() {

            // Quick view click
            $(document).on('click', 'a.quick-view-link', function() {

                // Find item object
                var itemID = $(this).closest('li').data('id');
                var findID = function(id) {
                for (var i = 0, len = quickView.items.length; i < len; i++) {
                    if (quickView.items[i].id === id)
                    return quickView.items[i]; // Return as soon as the object is found
                }
                    return null; // The object was not found
                }
                var currentItem = findID(itemID);

                // Handlebars.js templating
                // Register a helper
                Handlebars.registerHelper('applyCurrentImage', function(position) {
                    if(position === 0) {
                        return " current";
                    }
                })

                $.ajax({
                    url: 'templates/template.handlebars',
                    dataType: 'html',
                    cache: false,
                    success: function(data, status, response) {

                        var template = Handlebars.compile(response.responseText);

                        var html = template(currentItem);

                        $('#quick-view-popup').html(html);

                        // show quick view
                        $('body').addClass('show-quick-view');
                        
                    }
                });

            });

            // Thumbnails
            $(document).on('click', '#quick-view-popup .qv-left ul.thumbnails li img', function() {
                var position = $(this).closest('li').data('position');
                $('#quick-view-popup .qv-left .main-image-wrapper .image').removeClass('current');
                $('#quick-view-popup .qv-left .main-image-wrapper .image[data-position="' + position + '"]').addClass('current');
            });

            // Close quickview
            $(document).on('click', '#quick-view-popup a.qv-close, #quick-view-overlay', function() {
                $('body').removeClass('show-quick-view');
            });
            
        }

    }

})(jQuery);

$(document).ready(function() {
    quickView.go();
});