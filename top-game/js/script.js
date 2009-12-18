var Carousel = new Class({
	
	Implements: [Options],
	
	options: {
		transition: Fx.Transitions.Sine.easeInOut,
		duration: 500,
		wheels: true
	},

	initialize: function(main, options){
		this.main = main;
		this.setOptions(options);
		if(!this.main) return;
		
		this.carousel = this.main.getElement('.carousel');
		this.fx = new Fx.Scroll(this.carousel, { duration: this.options.duration, wait: false, wheelStops: false, transition: this.options.transition });
		this.carouselWidth = this.carousel.getWidth();
		this.carouselBox = this.carousel.getElement('ul');
		this.carouselElements = this.carousel.getElements('li');
		this.carouselFirstElement = this.carouselBox.getFirst('li');
		this.getCarouselBoxWidth();
		this.arrows = this.main.getElements('.arrows');
		this.startPosition();
		this.leftArrow = this.main.getElement('.left') || this.main.getElement('.prev');
		this.rightArrow = this.main.getElement('.right') || this.main.getElement('.forw');
		
		if(this.options.wheels) this.carousel.addEvent('mousewheel', this.wheels.bind(this));
		this.leftArrow.addEvent('click', function(){ this.moveLeft(this.carouselWidth); return false; }.bind(this));
		this.rightArrow.addEvent('click', function(){ this.moveRight(this.carouselWidth); return false; }.bind(this));
	},
	
	getCarouselBoxWidth: function(){
		this.carouselBoxWidth = 0;
		this.carouselElements.each(function(element){
			this.carouselBoxWidth += element.getWidth();
		}.bind(this));
		this.carouselBox.setStyle('width', this.carouselBoxWidth);
	},
	
	startPosition: function(){
		this.currentPosition = 0;
		this.maxWidth = this.carouselBoxWidth - this.carouselWidth;
		this.oneBlockWidth = this.carouselFirstElement.getWidth();
		if(this.maxWidth > 0) this.arrows.addClass('active');
	},
	
	move: function(how){ this.fx.start(how, 0); },
	
	moveLeft: function(how){
    	if(this.currentPosition != 0) {
    		this.currentPosition -= how;
    		if(this.currentPosition < 0) this.currentPosition = 0;
        	this.move(this.currentPosition);
    	}
	},
	
	moveRight: function(how){
        if(this.currentPosition != this.maxWidth) {
        	this.currentPosition += how;
        	if(this.currentPosition > this.maxWidth) this.currentPosition = this.maxWidth;
        	this.move(this.currentPosition);
        }
	},
	
	wheels: function(e){
		if(e.wheel > 0) this.moveLeft(this.oneBlockWidth);
		else this.moveRight(this.oneBlockWidth);
		return false;
	}
	
});

var Input = new Class({

	initialize: function(element){
		this.element = element;
		if(!this.element) return false;

		this.defaultValue = this.element.get('default');

		this.element.addEvents({
			'focus': this.removeText.bind(this),
			'blur': this.addText.bind(this)
		});
	},

	removeText: function(){	if(this.element.get('value') == this.defaultValue) this.element.set('value', ''); },

	addText: function(){ if(this.element.get('value') == '') this.element.set('value', this.defaultValue); }

});

window.addEvent('domready', function(){

	if($('headSlider')){ new Carousel($('headSlider')); }
	if($('leftSlider')){ new Carousel($('leftSlider'), { transition: Fx.Transitions.Bounce.easeOut, wheels: false, duration: 700 }); }
	if($('search-text')){ new Input($('search-text')); }
	
});