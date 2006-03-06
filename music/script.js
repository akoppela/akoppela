window.addEvent('domready', function(){
	
	var myMorph1 = new Fx.Morph($('first-frame'));
	var myMorph2 = new Fx.Morph($('second-frame'));
		
	$('login').addEvent('click', function(e){
		e.stop();
		$('first-frame').set('morph', {duration: '500', transition: Fx.Transitions.Circ.easeInOut});
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
		$('first-frame').set('morph', {duration: '500', transition: Fx.Transitions.Circ.easeInOut});
		$('first-frame').morph('.first-frame');
		myMorph1.start({
			opacity : 1
		});
		myMorph2.start({
			opacity : 0
		});
	});
	
	var myMorph3 = new Fx.Morph($('nav-back'));
	var myMorph4 = new Fx.Morph($('nav-forvard'));
	
	$('nav-forvard').addEvent('click', function(e){
		e.stop();
		$('nav-anim').set('morph', {duration: '500', transition: Fx.Transitions.Back.easeOut});
		$('nav-anim').morph('.nav1');
		myMorph4.start({
			color : '#000'
		});
		myMorph3.start({
			color : '#fff'
		});
	});
	
	$('nav-back').addEvent('click', function(e){
		e.stop();
		$('nav-anim').set('morph', {duration: '500', transition: Fx.Transitions.Back.easeIn});
		$('nav-anim').morph('.nav-anim');
		myMorph4.start({
			color : '#fff'
		});
		myMorph3.start({
			color : '#000'
		});
		
	});
	
});
