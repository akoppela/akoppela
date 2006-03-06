window.addEvent('domready', function(){

	
	var mySlide2 = new Fx.Slide($('second-nav'));
	var mySlide1 = new Fx.Slide($('news-ul'));
	
	$('second-nav').slide('hide');
		
	$('auto').addEvent('click', function(e){
		e = new Event(e);
		mySlide2.toggle();
		e.stop();
	});
		
	$('title-news').addEvent('click', function(e){	
		e = new Event(e);
		mySlide1.toggle();
		e.stop();
	});
	
});

