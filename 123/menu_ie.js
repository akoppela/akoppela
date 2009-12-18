var slideMenu = new Class({

	initialize: function(main){
		this.main = $(main);
		if(!this.main) return false;
			
		this.title = this.main.getElements('li');
	
		this.title.addEvents({
			'mouseenter': this.open,
			'mouseleave': this.close
		});
	},

	open: function(){
		if(this) this.curTitle = this;

		this.curTitle.addClass('selected');
	},

	close: function(){
		this.curTitle.removeClass('selected');
	}	

});

window.addEvent('domready', function(){
	var Menu = new slideMenu("nav");
});