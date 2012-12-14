/*!
 * jQuery TrEVo SideMenu v1.0
 * https://github.com/djtrevo/MegaMenu
 * 
 * Copyright 2012, Marco Trevisani
 * * * * * * * * * * * * * * * * * * * * * *
 * 
 * Official Website: http://www.djtrevo.com
 * 
 * * * * * * * * * * * * * * * * * * * * * * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */ (function ($) {
    $.fn.trevoSideMenu = function (options) {
        var defaults = {
            speed: 500,
            multi_l1_open: false,
            multi_l2_open: false,
            image_l1_open: 'images/arrow_blue_open.png',
            image_l1_close: 'images/arrow_blue.png'
        };

        var options = $.extend(defaults, options);
        var inAction = false;

        return this.each(function () {
            $(this).children('nav').children('ul').addClass('l1');
            $('ul.l1').children('li').addClass('lvl1');
            $('li.lvl1').children('ul').addClass('l2');
            $('ul.l2').children('li').addClass('lvl2');
            $('li.lvl2').children('ul').addClass('l3');
            $('ul.l3').children('li').addClass('lvl3');

            $(this).find('.l2').each(function () {
                if (!$(this).hasClass('open')) {
                    $(this).hide();
                }
            })

            $(this).find('.l3').each(function () {
                if (!$(this).hasClass('open')) {
                    $(this).hide();
                }
            })

            $(this).find('.lvl1 > a, .lvl2 > a').click(function () {
                var padreClass = $(this).parent().prop("class");
                var lvl = parseInt(padreClass.substring(3, 4));
                subMenu = $(this).parent().find("ul.l" + parseInt(lvl + 1));
                var isVisibile = subMenu.is(":visible");
                if (subMenu.length != 0) {
                    if (!isVisibile) {
                        closeAll(lvl);
                    }

                    if (!inAction) {
                        inAction = true;
                        changeActiveStyle($(this), lvl, isVisibile);
                        subMenu.animate({
                            easing: 'swing',
                            height: 'toggle'
                        }, {
                            duration: options.speed,
                            queue: false,
                            complete: function () {
                                if (subMenu.is(":visible")) {
                                    subMenu.addClass("open");
                                } else {
                                    subMenu.removeClass("open");
                                }
                                inAction = false;
                            }
                        });
                    }
                };
                return false;
            })
        });

        function changeActiveStyle(elem, lvl, isVisibile) {
            switch (lvl) {
                case 1:
                    if (isVisibile) {
                        elem.parent().css("background-image", "url('" + options.image_l1_close + "')");
                    } else {
                        elem.parent().css("background-image", "url('" + options.image_l1_open + "')");
                    }
                    break;
                case 2:
                    if (isVisibile) {
                        //elem.css("font-family", "'CabinRegular'");
                    } else {
                        //elem.css("font-family", "'CabinSemiBold'");
                    }
                    break;
                default:
            }
        }

        function closeAll(lvl) {
            if ((lvl == 1 && !options.multi_l1_open) || (lvl == 2 && !options.multi_l2_open)) {
                $('.lvl' + lvl).children('.open').each(function () {
                    if (!inAction) {
                    	changeActiveStyle($(this), lvl, true)
                        $(this).animate({
                            easing: 'swing',
                            height: 'toggle'
                        }, {
                            duration: options.speed,
                            complete: function () {
                                $(this).removeClass("open");
                            }
                        })
                    }
                })
            }
        }
    };
})(jQuery);