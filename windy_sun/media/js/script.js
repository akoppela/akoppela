window.addEvent('domready', function(){
	
	ReMooz.assign('.photos a', {
		'origin': 'img',
		'shadow': 'onOpenEnd', // fx is faster because shadow appears after resize animation
		'resizeFactor': 0.9, // resize to maximum 80% of screen size
		'cutOut': false, // don't hide the original
		'opacityResize': 0.4, // opaque resize
		'dragging': false, // disable dragging
		'centered': true // resize to center of the screen, not relative to the source element
	});

});