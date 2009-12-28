var popUp = new Class({
	
	initialize: function(main, options){
		this.main = $(main);
		if(!this.main) return
		
		this.heightFx = this.main.hasClass('withoutHeight') ? false : true;
		this.main.addClass('active');
		this.popUpBox = this.main.getElement('ul');
		this.arrow = this.main.getElement('.clickarea');
		this.fxDuration = this.heightFx ? 250 : 0;
		this.fx = new Fx.Tween(this.main, { duration: this.fxDuration, wait: false });
		this.fadeFx = new Fx.Tween(this.popUpBox, { duration:300, wait: false });
		this.startPosition();
		
		this.main.addEvents({
			'mouseleave': this.startTimer.bind(this),
			'mouseenter': this.stopTimer.bind(this)
		});
		this.arrow.addEvent('click', this.click.bind(this));
	},
	
	startPosition: function(){
		this.currentHeight = this.main.getHeight();
		this.popUpHeight = this.popUpBox.getHeight();
		this.fadeFx.set('opacity', 0);
	},	

	startTimer: function(){
		if(this.interval) return false;
		this.interval = this.hidePopUp.delay(800, this);
		return true;
	},

	stopTimer: function(){
		if(!this.interval) return false;
		this.interval = $clear(this.interval);
		return true;
	},

	showPopUp: function(){
		this.fx.start('height', this.currentHeight + this.popUpHeight).chain(function(){
			this.fadeFx.start('opacity', 1).chain(function(){ this.main.addClass('opened'); this.busy = false; }.bind(this));
		}.bind(this));
	},

	hidePopUp: function(){
		this.fadeFx.start('opacity', 0).chain(function(){
			this.fx.start('height', this.currentHeight).chain(function(){ this.main.removeClass('opened'); this.busy = false; }.bind(this));
		}.bind(this));
	},
	
	click: function(){
		if(!this.busy){
			this.busy = true;
			this.main.hasClass('opened') ? this.hidePopUp() : this.showPopUp();
		}
		return false;
	}
	
});

var Input = new Class({

	initialize: function(element){
		this.element = $(element);
		if(!this.element) return

		this.defaultValue = this.element.get('default');
		this.assignEvents();
		this.addText();
	},
	
	assignEvents: function(element){
		(element || this.element).addEvents({
			'focus': this.removeText.bind(this),
			'blur': this.addText.bind(this)
		});
	},

	removeText: function(){
		if(this.element.hasClass('default')){
			this.element.set('value', '');
			this.element.removeClass('default');
			return true
		}
	},

	addText: function(){
		if(this.element.get('value').match(/^\s*$/) || this.element.get('value') == this.defaultValue){
			this.element.set('value', this.defaultValue);
			this.element.addClass('default');
			return true
		}
	}

});

var Slider = new Class({
	
	initialize: function(main){
		this.main = $(main);
		if(!this.main) return
		
		this.scrollBox = this.main.getElement('.slider');
		this.scrollBoxWidth = this.scrollBox.getWidth();
		this.banners = this.main.getElement('ul');
		this.firstBanner = this.banners.getFirst('li');
		this.lastBanner = this.banners.getLast('li');
		this.fx = new Fx.Scroll(this.scrollBox, { duration:600, wait: false, wheelStops: false, transition: Fx.Transitions.Sine.easeInOut });
		this.startPosition();
		
		this.scrollBox.addEvents({
			'mousewheel': this.start.bind(this),
			'mouseenter': this.stopTimer.bind(this),
			'mouseleave': this.startTimer.bind(this)
		});
	},
	
	startPosition: function(){
		this.bannersWidth = 0;
		this.banners.getElements('li').each(function(element){
			this.bannersWidth += element.getWidth();
		}.bind(this));
		this.banners.setStyle('width', this.bannersWidth);
		this.maxWidth = this.bannersWidth - this.scrollBoxWidth;
		this.currentBanner = this.firstBanner;
		this.currentPosition = 0;
		this.startTimer();
	},

	startTimer: function(){
		if(this.interval) return false;
		this.interval = this.start.periodical(3000, this);
		return true;
	},

	stopTimer: function(){
		if(!this.interval) return false;
		this.interval = $clear(this.interval);
		return true;
	},
	
	move: function(){
		this.fx.start(this.currentPosition, 0);
	},
	
	moveLeft: function(){
		this.currentBanner = $pick(this.currentBanner.getPrevious('li'), this.lastBanner);
		this.currentPosition -= this.currentBanner.getWidth();
  	if(this.currentPosition <= 0) this.currentPosition = 0;
		this.move();
	},
	
	moveRight: function(){
		this.currentPosition += this.currentBanner.getWidth();
   	if(this.currentPosition >= this.maxWidth) this.currentPosition = this.maxWidth;
		this.currentBanner = $pick(this.currentBanner.getNext('li'), this.firstBanner);
		this.move();
	},
	
	toLeft: function(){
		this.currentPosition = 0;
		this.currentBanner = this.firstBanner;
		this.fx.toLeft();
	},
	
	toRight: function(){
		this.currentPosition = this.maxWidth;
		this.currentBanner = this.lastBanner;
		this.fx.toRight();
	},
	
	start: function(e){
		if(this.interval || e.wheel < 0 ){ this.currentPosition != this.maxWidth ? this.moveRight() : this.toLeft(); }
		else { this.currentPosition != 0 ? this.moveLeft() : this.toRight(); }
		return false
	}
	
});

window.addEvent('domready', function(){
	
	$$('.popup').each(function(element){ new popUp(element); });
	$$('input[default], textarea[default]').each(function(element){
		element.get('type') != 'password' ? new Input(element) : new Input.Password(element);
	});
	new Slider('bannerSlider');
	
});