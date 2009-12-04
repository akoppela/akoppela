var tellAFriend = new Class({
	
	initialize: function(link){
		this.link = $(link);
		if(!this.link) return;
		
		this.main = $('tellAFriend');
		this.overlay = this.main.getElement('.overlay');
		this.box = this.main.getElement('.main');
		this.close = this.main.getElement('.close');
		this.startPosition();
		
		this.link.addEvent('click', this.show.bind(this));
		[this.overlay, this.close].each(function(element){
			element.addEvent('click', this.hide.bind(this));
		}.bind(this));
	},
	
	startPosition: function(){
		this.height = $(window).getScrollSize().y;
		[this.overlay, this.main].each(function(element){
			element.setStyle('height', this.height);
		}.bind(this));
		this.overlay.fade('hide');
		this.box.fade('hide');
	},
	
	show: function(){
		this.main.addClass('active');
		this.overlay.fade('0.5');
		this.box.fade('in');
	},
	
	hide: function(){
		this.box.fade('out');
		this.overlay.fade('out');
		( function(){ this.main.removeClass('active'); }.bind(this)).delay(500);
	}
	
});

window.addEvent('domready', function(){
	
	new tellAFriend('tellLink');
	
});