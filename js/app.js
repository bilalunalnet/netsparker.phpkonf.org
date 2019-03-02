"use strict";

jQuery(document).ready(function() {
	var $window = $(window);
	var $body = $('body');
	var $dropshadow = $('<div class="dropshadow"></div>');

	$.fancybox.defaults.infobar = false;
	$.fancybox.defaults.animationEffect = 'zoom-in-out';

	$dropshadow.appendTo($body);

	$window
	.scroll(function(){
		var $scrollTop = $window.scrollTop();

		if($scrollTop >= 670) {
			$body.addClass('fixed-header');
		} else if ($scrollTop < 300){
			$body.removeClass('fixed-header');
		}
	})
	.trigger('scroll')
	;

	var $menuToggle = $('nav.mobile-navigation .toggle input');
	$menuToggle.click(function(){
		$body.toggleClass('mobile-menu-open');
		if ($body.hasClass('mobile-menu-open')) {
			$('.dropshadow').one('click', function(){
				$menuToggle.click();
			});
		}
	});

	$('nav.mobile-navigation .toggle ul li').click(function(){
		$menuToggle.click();
	});

	$('nav.mobile-navigation .logo').click(function(){
		$('html, body').stop().animate({ scrollTop : 0 }, 800);
	});
});