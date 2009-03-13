window.addEvent('domready', function(){
	
	var bgcolor, textcolor;
		
	$$('#header li div').addEvent('mouseenter', function(e){
		bgcolor = $(this).getStyle('background-color');
		this.style.background = "#fff";
		textcolor = $(this).getLast().getFirst().getStyle('color');
		$(this).getLast().getFirst().style.color = "#000";
		$(this).getAllNext().each(function(name){
			$(name).style.background = "#fff";
		});
		return false;
	});
	
	$$('#header li div').addEvent('mouseleave', function(e){
		$(this).getLast().getFirst().style.color = textcolor;
		this.style.background = bgcolor;
		$(this).getAllNext().each(function(name){
			$(name).style.background = bgcolor;
		});
	});

})