$(document).ready(function ($) {
    $("#menu_tabs .link").click(function () {
        //Animate
        let warp_left = $("#over_hidden_rel").offset().left;
       let rs_left = $(this).offset().left - warp_left;
        let divId = $($(this).attr('data-id'));
        $("#run_effect").css({"left": rs_left}).addClass('active');
        if($(this).hasClass('active')){
            $("#run_effect").removeClass('active');
            divId.slideUp( "slow" );
        }else{
            //Fade content tabs
            $("#content_tabs .content-tabs").not($(this).attr('data-id')).hide();
            divId.slideDown( "slow" );
        }
        $(this).toggleClass('active');
        $("#menu_tabs .link").not(this).removeClass('active');
    });
    $("#run_effect").click(function () {
        $(this).removeClass('active');
    })
    
    $('.tabs-vertical .tav-title').click(function () {
        let divID = $($(this).attr("data-id"));
        let tav_content = $(this).closest('.tabs-vertical').children('.tav-content');
        $(this).toggleClass('active');
        $('.tabs-vertical .tav-title').not(this).removeClass('active');
        tav_content.not($(this).attr("data-id")).slideUp();
        if($(this).hasClass('active')){
            divID.slideDown();
        }else{
            divID.slideUp();
        }
    });
});