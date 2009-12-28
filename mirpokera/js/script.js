var popUp = new Class({
	
	initialize: function(main, options){
		this.main = $(main);
		if(!this.main) return
		
		this.heightFx = this.main.hasClass('withoutHeight') ? false : true;
		this.main.addClass('active');
		this.popUpBox = this.main.getElement('ul');
		this.arrow = this.main.getElement('.arrow');
		this.fxDuration = this.heightFx ? 250 : 0;
		this.fx = new Fx.Tween(this.main, { duration: this.fxDuration, wait: false });
		this.fadeFx = new Fx.Tween(this.popUpBox, { duration:300, wait: false });
		this.startPosition();
		
		this.main.addEvents({
			'click': this.click.bind(this),
			'mouseleave': this.startTimer.bind(this),
			'mouseenter': this.stopTimer.bind(this)
		});
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

window.addEvent('domready', function(){
	
	$$('.popup').each(function(element){ new popUp(element) });
	
});