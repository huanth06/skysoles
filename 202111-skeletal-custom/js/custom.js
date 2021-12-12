// NOTICE!! THIS IS REQUIRED TO MAKE YOUR NETO SHOPPING CART WORK
// DO NOT REMOVE UNLESS YOU REALLY KNOW WHAT YOU ARE DOING

(function($) {
    $.extend({
        initPageFuncs: function() {
            // Ajax Wish List
            $.addToWishList({
                'class': 'wishlist_toggle',
                'textclass': 'wishlist_text',
                'htmlon': 'Remove From Wishlist',
                'htmloff': 'Add To Wishlist',
                'tooltip_css': 'whltooltips'
            });
            // Ajax Add To Cart
            $.addToCartInit({
                'cart_id': 'cartcontents',
                'target_id': 'cartcontentsheader',
                'image_rel': 'itmimg'
            });

            $(".disp_ajax_templ").unbind();
            $(".disp_ajax_templ").change(function() {
                var sku = $(this).val();
                var rel = $(this).attr('rel');
                $.load_ajax_template(rel, { 'sku': sku, 'showloading': true, 'procdata': 'n' }, { onLoad: function() { $.initPageFuncs(); } });
            });
            // This renders the instant search results - edit design of ajax results here
            $.initSearchField({
                'result_header': '<ul class="nav nav-list">',
                'result_body': '<li><a href="javascript:void(0);" search-keyword="##keyword##"><img border="0" src="##thumb##" width="36" height="36"/><span class="title">##model##</span></a></li>',
                'result_footer': '</ul>',
                'category_header': '<ul class="nav nav-list">',
                'category_body': '<li><a href="##url##"><span class="thumb"><img border="0" src="##thumb##" width="36" height="36"/></span><span class="title">##fullname##</span> <span class="label label-default">##typename##</span></a></li>',
                'category_footer': '</ul>'
            });
        },

        // For child product multi-add to cart function
        checkValidQty: function() {
            var found = 0;
            $("#multiitemadd :input").each(function() {
                if ($(this).attr('id').match(/^qty/)) {
                    if ($(this).val() > 0) {
                        found = 1;
                    }
                }
            });
            if (found == 0) {
                $.fancybox("Please specify a quantity before adding to cart");
                return false;
            }
            return true;
        },

        modQtyByMulti: function(obj, act) {
            var mul = 1;
            var maxm;
            var minm = 0;
            var objid = obj.replace(/^qty/, '');
            if ($('#qty' + objid).length > 0) {
                if ($('#multiplier_qty' + objid).length > 0) {
                    mul = $('#multiplier_qty' + objid).val();
                }
                if ($('#min_qty' + objid).length > 0) {
                    minm = $('#min_qty' + objid).val();
                }
                if ($('#max_qty' + objid).length > 0) {
                    maxm = $('#max_qty' + objid).val();
                }

                var cur = $('#' + obj).val();
                if (isNaN(cur)) {
                    cur = 0;
                }

                if (act == 'add') {
                    cur = parseInt(cur) + parseInt(mul);
                    if (!isNaN(maxm) && cur > maxm) {
                        cur = maxm;
                    }
                } else if (act == 'subtract') {
                    cur = parseInt(cur) - parseInt(mul);
                    if (cur < minm) {
                        cur = minm;
                    }
                }

                $('#qty' + objid).val(cur);
            }
        }
    });
})(jQuery);

$(document).ready(function() {
    // Popup Credit Card CCV Description At Checkout
    $("#card_ccv").fancybox();

    // Popup Terms At Checkout
    $("#terms").fancybox({
        'width': 850,
        'height': 650
    });

    // Jquery Ui Date Picker
    $(".datepicker").datepicker({ dateFormat: "dd/mm/yy" });
    $.initPageFuncs();

    // Carousel
    $('.carousel').carousel();

});

$(".btn-loads").click(function() {
    $(this).button("loading");
    var pendingbutton = this;
    setTimeout(function() {
        $(pendingbutton).button("reset");
    }, 3000);
});

// Fancybox
$(document).ready(function() {
    $(".fancybox").fancybox();
});

// Tooltip
$('.tipsy').tooltip({ trigger: 'hover', placement: 'bottom' });

// Who needs AddThis?
function windowPopup(url, width, height) {
    // Calculate the position of the popup so
    // it’s centered on the screen.
    var left = (screen.width / 2) - (width / 2),
        top = (screen.height / 2) - (height / 2);
    window.open(url, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left);
}
$(".js-social-share").on("click", function(e) {
    e.preventDefault();
    windowPopup($(this).attr("href"), 500, 300);
});

$('.nToggleMenu').click(function() {
    var toggleTarget = $(this).attr('data-target')
    $(toggleTarget).slideToggle();
});

//Collapse filters
$(document).ready(function() {
    //$('.price-range-lg').hide();
    //$('.price-range').hide();
    //$('.filter').css('display','none');
    $('.filter-remove').each(function() {
        var showfilters = $(this).attr('data-filtercode');
        $('.filter-title[data-filtercode="' + showfilters + '"]').click();
    });
    $('.wrapper-testimonials .row, .js-accordionReviews').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        arrows: false,
        adaptiveHeight: true,
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});

$(window).on("resize", function() {});

$(window).on("load resize", function() {
    var width = $(document).width();
    if (width > 768) {
        $('.js-pentagon-list').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            vertical: true,
            arrows: true,
            adaptiveHeight: true
        });


    } else {
        $('.js-pentagon-list').filter('.slick-initialized').slick('unslick');
    }
});

$(function() {
    if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {
        
    } else {
        $(window).resize(function() {
            var parallaxHeight = Math.max($(window).height() * 0.7, 200) | 0;
            $('.paralax-bg').height(parallaxHeight);
        }).trigger('resize');
    }
});

$('.filter-title').click(function() {
    var filtercode = $(this).attr('data-filtercode')
        // $('.filter[data-filtercode="'+filtercode+'"]').slideToggle();
    if ($("i", this).hasClass("fa-caret-down")) {
        $("i", this).removeClass('fa-caret-down').addClass('fa-caret-up');
    } else {
        $("i", this).removeClass('fa-caret-up').addClass('fa-caret-down');
    }
});
$('.filter-title[data-filtercode=price]').click(function() {
    $(this).next('.price-range').toggle();
    if ($("i", this).hasClass("fa-caret-down")) {
        $("i", this).removeClass('fa-caret-down').addClass('fa-caret-up');
    } else {
        $("i", this).removeClass('fa-caret-up').addClass('fa-caret-down');
    }
});
$('.filter-title[data-filtercode=price-lg]').click(function() {
    $(this).next('.price-range-lg').toggle();
    if ($("i", this).hasClass("fa-caret-down")) {
        $("i", this).removeClass('fa-caret-down').addClass('fa-caret-up');
    } else {
        $("i", this).removeClass('fa-caret-up').addClass('fa-caret-down');
    }
});
$('.support-list-title').click(function() {

    if ($(this).hasClass('active')) {
        $('.arrow').addClass('hide');
        $('.support-list-menu').addClass('hide');
        $(this).removeClass('active');
        $(this).next().addClass('hide');
        $(this).find('.arrow').addClass('hide');
    } else {
        $('.arrow').addClass('hide');
        $('.support-list-title').removeClass('active');
        $('.support-list-menu').addClass('hide');
        $(this).addClass('active');
        $(this).next().removeClass('hide');
        $(this).find('.arrow').removeClass('hide');
    }




});
$('.size-guide a').click(function(e) {
    e.preventDefault();
    $('html,body').animate({
            scrollTop: $(".js-size").offset().top
        },
        'slow');
    setTimeout(function() { $('.js-size.inactive a').click(); }, 1000);
});
$('.js-lv1').click(function() {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').removeClass('active');

    } else {
        $('.level_1.js-lv1').removeClass('active');
        $('.level_1>.dropdown-menu').removeClass('active');
        $(this).toggleClass('active');

        $(this).find('.dropdown-menu').toggleClass('active');
    }
});


$('.menu-mobile').click(function() {
    $('.menu-sp').slideToggle();
});
$('.account-menu h3').click(function() {
    $('.account-menu').toggleClass('active');
    $('.account-menu ul').slideToggle();
});

$('.pentagon-menu h3').click(function() {

    $('.pentagon-menu').toggleClass('active');
    $('.pentagon-menu ul').slideToggle();
});
$(".pentagon-menu li").on("click", function(e) {

    const getIn = $(this).attr('index');
    $('html,body').animate({
            scrollTop: $("#section-pentagon-" + getIn).offset().top
        },
        'slow');
    $('.pentagon-menu').removeClass('active');

});

$(".js-pentagon-list li").on("click", function(e) {
    e.preventDefault();
    const getImg = $(this).find('img').attr('src');
    const arr = getImg.split('/'); //["images","banner","Penguins.jpg"]
    const file = arr[arr.length - 1]; //Penguins.jpg
    const Name = file.split('.')[0];
    const lastChar = Name.substr(Name.length - 1);
    $('html,body').animate({
            scrollTop: $("#section-pentagon-" + lastChar).offset().top
        },
        'slow');
    $('.section-pentagon').removeClass('active');
    $("#section-pentagon-" + lastChar).addClass('active');
});



var url = window.location.href;
if (url.indexOf('quotes') != -1) {
    $('.quotes-content').removeClass('hide');
    $('html,body').animate({
            scrollTop: $(".quotes-content").offset().top
        },
        'slow');
}

$('.account-menu a').click(function() {
    var url = $(this).attr('href');
    if (url.indexOf('quotes') != -1) {
        $('.quotes-content').removeClass('hide');
        $('html,body').animate({
                scrollTop: $(".quotes-content").offset().top
            },
            'slow');
    }
});

$('.wrapper-homepage-banner .arrow-down').click(function() {
    $('html,body').animate({
            scrollTop: $(".wrapper-homepage-blurb").offset().top
        },
        'slow');

});

$('.page-cor-overview .arrow-down').click(function() {
    $('html,body').animate({
            scrollTop: $(".secondary-content").offset().top
        },
        'slow');

});

// Alt image hover effect
$('.nColourList > .nSwatch')
    .mouseover(imageSwap)
    .mouseout(imageSwap2);

function imageSwap() {
    var myImage = $(this).parents(".wrapper-thumbnail").find('img.product-image');
    newSRC = $(this).attr('data-variation-image');
    if (newSRC) {
        console.log(newSRC);
        currentSRC = $(myImage).attr('src');
        $(myImage).attr('src', newSRC);
        $(myImage).attr('data-altimg', currentSRC);
    }
}

function imageSwap2() {
    var myImage = $(this).parents(".wrapper-thumbnail").find('img.product-image');
    if (newSRC) {
        console.log(newSRC);
        currentSRC = $(myImage).attr('data-altimg');
        $(myImage).attr('src', currentSRC);
    }
}

