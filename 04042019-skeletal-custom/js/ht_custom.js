$(document).ready(function() {
	$('.product-list-page .product-list-content .colour-box a').each(function(){
		if($(this).size()<=1){
			$(this).parent().hide();
		}
	});
	AOS.init({
		easing: 'ease-out-back',
		duration: 1000
	});
	hljs.initHighlightingOnLoad();
	$('.hero__scroll').on('click', function(e) {
		e.preventDefault();
	    $('html,body').animate({ scrollTop: $(this.hash).offset().top}, 1200);
	});
});