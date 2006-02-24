window.addEvent('domready', function(){
	
	var myMorph1 = new Fx.Morph($('first-frame'));
	var myMorph2 = new Fx.Morph($('second-frame'));
	var mySlide = new Fx.Slide($('first-frame'), {transition: Fx.Transitions.Expo.easeInOut});

	$('login').addEvent('click', function(e){
		e.stop();
		mySlide.slideOut();
		myMorph1.start({
			opacity : 0
		});
		myMorph2.start({
			opacity : 1
		});
	});
	
	$('back').addEvent('click', function(e){
		e.stop();
		mySlide.slideIn();
		myMorph1.start({
			opacity : 1
		});
		myMorph2.start({
			opacity : 0
		});
	});

});
