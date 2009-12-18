window.addEvent('domready', function(){

	
	var mySlide2 = new Fx.Slide($('second-nav'));
	var mySlide1 = new Fx.Slide($('news-ul'));
	var mySlide4 = new Fx.Slide($('price'));
	var mySlide5 = new Fx.Slide($('oper'));
	var mySlide6 = new Fx.Slide($('selected-car'));
	var mySlide7 = new Fx.Slide($('photo-gal'));
	var mySlide8 = new Fx.Slide($('content-index'));
	var myMorph1 = new Fx.Morph($('content-second'));
	var mySlide9 = new Fx.Slide($('model'));
	var myMorph2 = new Fx.Morph($('animat'), {duration: '80000', transition: Fx.Transitions.Linear});
	var myMorph3 = new Fx.Morph($('animat'), {duration: '4000', transition: Fx.Transitions.Circ.easeInOut});
	var pereodical;
	var pos;

	
	$('second-nav').slide('hide');
	$('price').slide('hide');
	$('selected-car').slide('hide');
	$('photo-gal').slide('hide');
	$('model').slide('hide');
	$('oper').slide('hide');
		
	$('auto').addEvent('click', function(e){
		e = new Event(e);
		mySlide2.toggle();
		e.stop();
	});
	
	$('hyundai-car').addEvent('click', function(e){
		e = new Event(e);
		mySlide7.slideOut();
		mySlide8.slideOut().chain(function(){
			mySlide5.slideIn();
			mySlide9.slideIn();
		});
		mySlide4.slideOut();
		e.stop();
	});
	
	$('photo-nav').addEvent('click', function(e){
		e = new Event(e);
		mySlide5.slideOut().chain(function(){
			mySlide7.slideIn();
		});
		mySlide4.slideOut().chain(function(){
			mySlide7.slideIn();
		});
		e.stop();
	});
	
	
	
	$('company').addEvent('click', function(e){
		e = new Event(e);
		mySlide9.slideOut().chain(function(){
			mySlide8.slideIn();
		});
		mySlide5.slideOut();
		mySlide7.slideOut();
		mySlide4.slideOut();
		mySlide6.slideOut();
		e.stop();
	});
		
	$('price-nav').addEvent('click', function(e){
		e = new Event(e);
		mySlide5.slideOut().chain(function(){
			mySlide4.slideIn();	
		});
		mySlide7.slideOut().chain(function(){
			mySlide4.slideIn();	
		});
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
	
	pos = 0;
	
	var fx = function() {
		if(pos == 0) {
			myMorph2.start({
				'margin-left': -1595
			}).chain(function(){
				myMorph2.start({
					'margin-left': 0
				});
			}).chain(function(){
				fx();
			});	
		} 
		if(pos == 1) {
			myMorph2.start({
				'margin-left': 0
			}).chain(function(){
				myMorph2.start({
					'margin-left': -1595
				});
			}).chain(function(){
				fx();
			});	
		}
	}
	
	fx();
	
	$('flash-left').addEvent('mousemove', function(e){
		e = new Event(e);
		myMorph2.cancel();
		myMorph3.start({
			'margin-left': 0
		}).chain(function(){
			pos = 0;
		});	
		e.stop();
	});
	
	$('flash-left').addEvent('mouseout', function(e){
		e = new Event(e);
		myMorph3.cancel();
		fx();
		e.stop();
	});
	
	$('flash-right').addEvent('mousemove', function(e){
		e = new Event(e);
		myMorph2.cancel();
		myMorph3.start({
			'margin-left': -1595
		}).chain(function(){
			pos = 1;
		});	
		e.stop();
	});
	
	$('flash-right').addEvent('mouseout', function(e){
		e = new Event(e);
		myMorph3.cancel();
		fx();
		e.stop();
	});
	

		
});

