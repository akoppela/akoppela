
		this.links.each(function(element){
			this.curLink = $(element);
			this.curBlock = this.curLink.getElement('.install-wrapper');
			
			this.fx = new Fx.Slide(this.curBlock, {duration: '400', transition: Fx.Transitions.Sine.easeInOut});
			this.fx.hide();
			
			this.curLink.addEvents({
				'mouseenter': this.start.bind(this),
				'mouseleave': this.startTimer.bind(this)
			});
	
			start: function(e){
				this.stopTimer();
				this.open();
				
				return false;
			},
	
    		startTimer: function(){
    		    if(this.interval) return false;
    		    this.interval = this.close.delay(800, this);
    		    return true;
    		},
    
    		stopTimer: function(){
    		    if(!this.interval) return false;
    		    this.interval = $clear(this.interval);
    		    return true;
    		},
	
			open: function(){
				this.fx.slideIn();
			},
	
			close: function(){
				this.fx.slideOut();
			}
		});