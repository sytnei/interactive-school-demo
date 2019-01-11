(function() {

    $(document).ready(function() {
        addNavigationBurgerIcon();
        headerResize();
    });


    function addNavigationBurgerIcon() {

        $('.btn--nav').prepend('<span><span></span><span></span><span></span></span>');

        $('.btn--nav').click(function() {

            $('nav').toggleClass('opened');

            if ($('nav').hasClass('opened')) {
                $('.btn--nav strong').text('Close');
            } else {
                $('.btn--nav strong').text('Menu');
            }

            return false;
        });

    }

    function headerResize() {

    }

})();