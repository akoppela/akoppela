var slideMenu = new Class({
	
	initialize: function(main){
		this.main = $(main);
		if(!this.main) return false;
		
		this.list = this.main.getElement('ul');
		this.fx = new Fx.Slide(this.list, {duration: 200, transition: Fx.Transitions.Sine.easeInOut})
		this.fx.hide();
		this.list.setStyle('display', 'block');
		
		this.main.addEvents({
			'mouseenter': this.open.bind(this),
			'mouseleave': this.startTimer.bind(this)
		});
	},
	
	startTimer: function(){
		if(this.interval) return false;
		this.interval = this.close.delay(700, this);
		return true;
	},
	
	stopTimer: function(){
		if(!this.interval) return false;
		this.interval = $clear(this.interval);
		return true;
	},
	
	open: function(){
		if(this.interval) this.stopTimer()
		else this.show();
	},
	
	close: function(){
		this.hide();
		this.stopTimer();
	},
	
	show: function(){
		this.fx.cancel();
		this.fx.slideIn();
	},
	
	hide: function(){
		this.fx.slideOut();
	}
	
});

window.addEvent('domready', function(){
	
	var langMenu = new slideMenu('languages');
	
});