window.addEvent('domready', function(){
	
	var myMorph1 = new Fx.Morph($('first-frame'));
	var myMorph2 = new Fx.Morph($('second-frame'));
		
	$('login').addEvent('click', function(e){
		e.stop();
		$('first-frame').set('morph', {duration: '500', transition: Fx.Transitions.Back.easeIn});
		$('first-frame').morph('.first-frame-anim');
		myMorph1.start({
			opacity : 0
		});
		myMorph2.start({
			opacity : 1
		});
	});
	
	$('back').addEvent('click', function(e){
		e.stop();
		$('first-frame').set('morph', {duration: '700', transition: Fx.Transitions.Back.easeOut});
		$('first-frame').morph('.first-frame');
		myMorph1.start({
			opacity : 1
		});
		myMorph2.start({
			opacity : 0
		});
	});

});

