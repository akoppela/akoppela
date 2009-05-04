var changeNav = new Class({
	
	initialize: function(nav){
		this.nav = $(nav);
		if(!this.nav) return false;
		
		this.link = this.nav.getElements('li');
		
		this.link.addEvents({
			'mouseenter': this.show.bind(this),
			'mouseleave': this.hide.bind(this)
		});
	},
	
	show: function(e){
		this.curLinkWrapper = $(e.target) || $(e);
		this.curLink = this.curLinkWrapper.getChildren();
		this.curLinkWrapper.addClass('show-link-wrapper');
		this.curLink.addClass('show-link');
	},
	
	hide: function(){
		this.curLinkWrapper.removeClass('show-link-wrapper');
		this.curLink.removeClass('show-link');
	}
	
});

window.addEvent('domready', function(){
	
	var nav = new changeNav('nav');
	
})