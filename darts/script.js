window.addEvent('domready', function(){

	var clubSlide = new Fx.Slide($('club-menu'));
	var desSlide = new Fx.Slide($('design-menu'));

	$('club-menu').slide('hide');
	$('design-menu').slide('hide');
	
	
	$('club').addEvent('click', function(){
		clubSlide.toggle();
	});
	
	$('design').addEvent('click', function(){
		desSlide.toggle();
	});
	
})