window.addEvent('domready', function(){
	
	if($$('.column') != ''){
		maxHeight = 0;
		$$('.column').each(function(element){
			currentHeigh = element.getHeight();
			if(element.hasClass('min')) currentHeigh += 191;
			if(currentHeigh > maxHeight) maxHeight = currentHeigh;
		});
		$$('.column').each(function(element){
			if(element.hasClass('min')) element.getElement('.top').setStyle('height', maxHeight - 211)
			else element.getElement('.top').setStyle('height', maxHeight - 20);
		});
	}
	
});