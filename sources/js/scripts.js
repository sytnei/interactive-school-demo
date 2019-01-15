(function() {

    $(document).ready(function() {
        menuButtonToggle();
        submenuToggle();
        submenuButtonClose();
    });

    /**
     * Function used to add on the navigation menu the burger icon
     * It haves an event on click, to show the menu and the close button
     */

    function menuButtonToggle() {

        $('.btn--nav').prepend('<span><span></span><span></span><span></span></span>');
        $('.btn--nav').click(function() {
            $('nav').toggleClass('opened');
            if ($('nav').hasClass('opened')) {
                $('.btn--nav strong').text('Close');
            } else {
                $('.btn--nav strong').text('Menu');

                submenuClearSelection();

            }
            return false;
        });
    }

    /**
     * Function uset to toggle submenu elements from main menu
     */

    function submenuToggle() {
        $('nav#main > ul > li').each(function(key, elm) {
            if ($(elm).find('ul').length) { $(elm).find('a').first().addClass('has-child'); }
        });

        $('nav#main > ul > li > a.has-child').click(function() {
            if ($(this).hasClass('has-child--expanded')) {

                submenuClearSelection();

            } else {
                /*add expanded icon to selected item*/
                submenuClearSelection();
                $(this).addClass('has-child--expanded');

                /*get submenu and apend at the end*/
                var subMenu = $(this).parent().find('ul').clone();
                $('nav#main').append(subMenu);
                $('nav#main>ul:nth-of-type(2)').animate({ "right": '0' }, 500, 'linear');

                /*append close button*/
                setTimeout(function() {
                    $('nav#main').append('<a href="#" class="btn btn--nav-close-submenu"><span><span></span><span></span><span></span></span></a>');
                }, 1400);
            }

            return false;
        });
    }

    function submenuButtonClose() {
        $('body').on('click', '.btn--nav-close-submenu', function() {
            submenuClearSelection();
        });
    }

    function submenuClearSelection() {

        $('.has-child').removeClass('has-child--expanded');
        $('.btn--nav-close-submenu').remove();

        if ($('nav#main>ul:nth-of-type(2)').length) {
            $('nav#main>ul:nth-of-type(2)').remove();
        };

    }


})();