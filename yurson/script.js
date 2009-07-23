var slideFx = new Class ({
	
	initialize: function(link){
		this.link = $(link);
		if(!this.link) return false;
		
		this.block = this.link.getElement('.install-wrapper');
		if(!this.block) return false;
		
		this.fx = new Fx.Slide(this.block, {duration: '300', transition: Fx.Transitions.Sine.easeInOut});
		
		this.startPos();
		
		this.link.addEvents({
			'mouseenter': this.start.bind(this),
			'mouseleave': this.startTimer.bind(this)
		});
	},
	
	startPos: function(){
		this.block.addClass('slide');
		this.fx.hide();
	},
	
    startTimer: function(){
        if(this.interval) return false;
        this.interval = this.close.delay(200, this);
        return true;
    },
    
    stopTimer: function(){
        if(!this.interval) return false;
        this.interval = $clear(this.interval);
        return true;
    },
	
	open: function(){
		this.fx.cancel();
		this.fx.slideIn();
	},
	
	close: function(){
		this.fx.cancel();
		this.fx.slideOut();
	},
	
	start: function(e){
		this.stopTimer();
		this.open();
		
		return false;
	}
	
});

window.addEvent('domready', function(){
	
	$$('#slideMenu li li').each(function(element){
		var install = new slideFx(element);
	});
	
});