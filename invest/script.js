var slideMenu = new Class ({
	
	initialize: function(block){
		this.block = $(block);
		if(!this.block) return false;
		
		this.fx = new Fx.Slide(this.block, {duration: 300, transition: Fx.Transitions.Sine.easeInOut, wait:false});
		this.link = this.block.getParent('li').getElement('a');
		
		this.startPosition();
		
		this.link.addEvent('click', this.start.bind(this));
	},
	
	startPosition: function(){
		this.block.getParent('div').addClass('slide');
		this.fx.hide();
	},
	
	start: function(){
		this.fx.toggle();
		return false;
	}
	
});

var fxMenu = new Class({
	
	initialize: function(link){
		this.link = $(link);
		if(!this.link) return false;
		
		this.fx = new Fx.Tween(this.link, {duration: 100, transition: Fx.Transitions.Sine.easeInOut, wait:false});
		
		this.link.addEvents({
			'mouseenter': this.forward.bind(this),
			'mouseleave': this.back.bind(this)
		});
	},
	
	forward: function(){
		this.fx.cancel();
		this.fx.start('text-indent', 3);
		return false;
	}, 
	
	back: function(){
		this.fx.cancel();
		this.fx.start('text-indent', 0);
		return false;
	}
	
});

window.addEvent('domready', function(){

	if($$('#left .menu ul') != ''){ $$('#left .menu ul').each(function(element){ new slideMenu(element); }); } 

	$$('#left .menu li a').each(function(element){ new fxMenu(element); });
});