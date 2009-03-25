window.addEvent('domready', function(){
	
	var scroll = new Fx.Morph('slide', { duration: 600 });
	
	$('up').addEvent('mouseenter', function(e) {
		scroll.start({
			'margin-top': 0
		});
		return false;
	});
	
	$('down').addEvent('mouseenter', function(e) {
		scroll.start({
			'margin-top': -50
		});
		return false;
	});
	
	['up', 'down'].each(function(name){
		$(name).addEvent('mouseout', function(){
			scroll.cancel();
			return false;
		});
	});

	
})