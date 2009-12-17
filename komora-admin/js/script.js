var Tabs = new Class({
	
	initialize: function(main){
		this.main = $(main);
		if(!this.main) return;
		
		this.mainWidth = this.main.getWidth();
		this.menu = this.main.getElement('ul');
		this.menuElements = this.main.getElements('li');
		this.getMenuWidth();
		if(this.menuWidth > this.mainWidth){
			this.menu.addClass('big');
			if(this.elementsAmount > 8){
				this.menu.addClass('with-out');
				this.lastBox = this.main.getElement('.last');
				this.lastBoxLink = this.main.getElement('.last a');
				this.moreLinks = this.main.getElement('.last span');
				this.setLastBox();
				this.addLinksBox();
				
				this.moreLinks.addEvent('click', function(){ this.opened ? this.closeBox() : this.openBox(); }.bind(this));
			}
		}
	},
	
	closeBox: function(){ this.fx.start('opacity', 0).chain(function(){ this.opened = false; }.bind(this)); },
	
	openBox: function(){ this.fx.set('opacity', 0.95); this.opened = true; },
	
	getMenuWidth: function(){
		this.menuWidth = 0;
		this.elementsAmount = 0;
		this.menuElements.each(function(element){
			if(!element.hasClass('last')){
				this.menuWidth += element.getWidth();
				this.elementsAmount++;
				if(this.elementsAmount > 7) element.addClass('out');
			}
		}.bind(this));
	},
	
	addLinksBox: function(){
		this.linksBox = new Element('div', { 'class': 'link-box' }).inject(this.main);
		this.normalLinks = new Element('ul', { 'class': 'normal' }).inject(this.linksBox);
		this.outLinks = new Element('ul', { 'class': 'out' }).inject(this.linksBox);
		this.menuElements.each(function(element){
			this.currentLink = element.getElement('a');
			this.linkHref = this.currentLink.get('href');
			this.linkText = this.currentLink.get('text');
			if(element.hasClass('out')) this.listElement = new Element('li').inject(this.outLinks)
			else this.listElement = new Element('li').inject(this.normalLinks);
			this.listWrapper = new Element('div').inject(this.listElement);
			this.listLink = new Element('a', { 'href': this.linkHref, 'text': this.linkText }).inject(this.listWrapper);
			if(element.hasClass('active')) this.listElement.addClass('active');
		}.bind(this));
		this.fx = new Fx.Tween(this.linksBox, { duration:200, wait:false });
		this.fx.set('opacity', 0);
	},
	
	setLastBox: function(){
		this.activeElement = this.main.getElement('.menu .active');
		if(this.activeElement.hasClass('out')){
			this.lastLink = this.activeElement.getElement('a');
			this.active = true;
		} else this.lastLink = this.main.getElement('li:nth-child(8)').getElement('a');
		this.lastBoxLink.set('href', this.lastLink.get('href'));
		this.lastBoxLink.set('text', this.lastLink.get('text'));
		if(this.active) this.lastBox.addClass('active');
	}
	
});

var Bookmark = new Class({
	
	initialize: function(bookmark){
		this.bookmark = $(bookmark);
		if(!this.bookmark) return
		
		this.fx = new Fx.Tween(this.bookmark, { duration: 200, wait: false });
		this.top = this.bookmark.getStyle('top');
		this.fx.set('top', this.top);
		
		this.bookmark.addEvents({
			'mouseenter': function(){ this.fx.start('top', -1); }.bind(this),
			'mouseleave': function(){ this.fx.start('top', this.top) }.bind(this)
		})
	}
	
});

window.addEvent('domready', function(){
	
	new Tabs('tabs');
	new Bookmark('decor');
	
});