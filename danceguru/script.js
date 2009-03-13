window.addEvent('domready', function(){
	
	var bgcolor;
	
	$$('#header li div').addEvent('mouseenter', function(e){
		bgcolor = $(this).getStyle('background-color');
		this.style.background = "#fff";
		$(this).getLast().getFirst().style.color = "#000";
		$(this).getAllNext().each(function(name){
			$(name).style.background = "#fff";
		});
		return false;
	});
	
	$$('#header li div').addEvent('mouseleave', function(e){
		$(this).getLast().getFirst().style.color = "#fff";
		this.style.background = bgcolor;
		$(this).getAllNext().each(function(name){
			$(name).style.background = bgcolor;
		});
	});

})