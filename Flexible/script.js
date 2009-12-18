window.addEvent('domready', function(){
	
	var heightsam = $('left-block').offsetHeight - $('slide').offsetHeight;
	var dur = -heightsam*60/5;
	var scroll = new Fx.Morph('slide', {duration: dur});
	
	$('up').addEvent('mouseenter', function(e) {
		scroll.start({
			'margin-top': 0
		});
		return false;
	});
	
	$('down').addEvent('mouseenter', function(e) {
		scroll.start({
			'margin-top': heightsam
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