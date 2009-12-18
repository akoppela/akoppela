window.addEvent('domready', function(){

	var bg, textcolor, bordercolor, bgend, bgendrepeat;

	$$('#products li').addEvent('mouseenter', function(e){
		bg = $(this).getStyle('background-image');
		textcolor = $(this).getFirst().getFirst().getStyle('color');
		bordercolor = $(this).getStyle('borderColor');
		bgend = $(this).getFirst().getStyle('background-image');
		bgendrepeat = $(this).getFirst().getStyle('background-repeat');
		$(this).style.background = '#d5d4c6';
		$(this).style.borderColor = '#d5d4c6';
		$(this).getFirst().style.background = 'none';
		$(this).getFirst().getFirst().style.background = ' url(images/products_arrow.gif) no-repeat left center';
		$(this).getFirst().getFirst().style.color = '#253c01';
	});
	
	$$('#products li').addEvent('mouseleave', function(e){
		$(this).style.background = bg;
		$(this).style.borderColor = bordercolor;
		$(this).getFirst().style.backgroundImage = bgend;
		$(this).getFirst().style.backgroundPosition = "bottom";
		$(this).getFirst().style.backgroundRepeat = bgendrepeat;
		$(this).getFirst().getFirst().style.background = 'none';
		$(this).getFirst().getFirst().style.color = textcolor;
	});

})