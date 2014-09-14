$.fn.stars = function() {
	return $(this).each(function() {
		$(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).attr('data-votes'))))) * 16));
	});
}

$.fn.views = function() {
	return $(this).each(function() {
		$(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).attr('data-views'))))) * 10));
	});
}