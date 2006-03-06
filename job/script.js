window.addEvent('domready', function(){

	
	var mySlide2 = new Fx.Slide($('second-nav'));
	var mySlide1 = new Fx.Slide($('news-ul'));
	var mySlide4 = new Fx.Slide($('price'));
	var mySlide5 = new Fx.Slide($('oper'));
	var mySlide6 = new Fx.Slide($('selected-car'));
	var myMorph3 = new Fx.Morph($('extra'));
	var myMorph2 = new Fx.Morph($('content-index'));
	var myMorph1 = new Fx.Morph($('content-second'));
	
	$('second-nav').slide('hide');
	$('price').slide('hide');
	$('selected-car').slide('hide');
		
	$('auto').addEvent('click', function(e){
		e = new Event(e);
		mySlide2.toggle();
		e.stop();
	});
	
	$('hyundai-car').addEvent('click', function(e){
		e = new Event(e);
		myMorph2.start({
			display : "none"
		});
		myMorph1.start({
			display : "block"
		});
		myMorph3.start({
			display : "block"
		});
		e.stop();
	});
	
	$('company').addEvent('click', function(e){
		e = new Event(e);
		myMorph2.start({
			display : "block"
		});
		myMorph1.start({
			display : "none"
		});
		myMorph3.start({
			display : "none"
		});
		e.stop();
	});
		
	$('price-nav').addEvent('click', function(e){
		e = new Event(e);
		mySlide4.slideIn();
		mySlide5.slideOut();
		e.stop();
	});
	
	$('title-news').addEvent('click', function(e){	
		e = new Event(e);
		mySlide1.toggle();
		e.stop();
	});
	
	$('accent').addEvent('click', function(e){	
		e = new Event(e);
		mySlide6.slideIn();
		e.stop();
	});
	
});

