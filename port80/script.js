var menuSlide = new Class({
	
	initialize: function(menu){
		this.menu = $(menu);
		if(!this.menu) return false;
		
		this.secMenuTitle = this.menu.getElements('.doublelist');
		this.menu.getElements('.secnav').setStyle('opacity', 0);
		
		this.bound = {
			close: this.close.bind(this),
			stop: this.stop.bind(this),
			secMenuShow: this.secMenuShow.bind(this),
			secMenuHide: this.secMenuHide.bind(this)
		};
        this.secMenuTitle.addEvent('mouseenter', this.open.bind(this));
    },
    
    open: function(e){
    	this.curSecMenu = $(e.target).getParent('li').getElement('.secnav');
    	this.curTitle = $(e.target);
    	if(this.clTimer){
    		this.stop();
    		this.hideAll();
    	}
    	
    	this.curTitleClass = this.curTitle.get('class');
    	this.curTitle.set('class', this.curTitleClass+' nav-active');
        this.show();
        this.menuAddEvents();
    },
    
    close: function(){
    	this.stop();
    	this.timer = (function(){
    		this.hide();
    		this.clTimer = false;
    	}).delay(700, this);
    },
    
    show: function(){
        this.curSecMenu.set('tween', {duration: 800, transition: 'bounce:out'});
        this.curSecMenu.tween('opacity', 1);
    },
    
    hide: function(){
    	this.curTitle.set('class', this.curTitleClass);
        this.curSecMenu.set('tween', {duration: 1000, transition: 'expo:out'});
        this.curSecMenu.tween('opacity', 0);
    	this.curTitle.set('class', this.curTitleClass);
    },
    
    hideAll: function(){
    	this.menu.getElements('.secnav').set('tween', {duration: 1000, transition: 'expo:out'});
    	this.menu.getElements('.secnav').tween('opacity', 0);
    	this.secMenuTitle.set('class', this.curTitleClass);
    },
    
    stop: function(){
    	$clear(this.timer);
    	this.clTimer = true;
    },
    
    menuAddEvents: function(){
    	this.curTitle.addEvent('mouseleave', this.bound.close);
    	this.curSecMenu.addEvents({
    		'mouseenter': this.bound.stop,
    		'mouseleave': this.bound.close
		});
		this.curSecMenu.getElements('li').addEvents({
			'mouseenter': this.secMenuShow,
			'mouseleave': this.secMenuHide
		});
    },
    
    menuRemoveEvents: function(){
    	this.curTitle.removeEvent('mouseleave', this.bound.close);
    	this.curSecMenu.removeEvents({
    		'mouseenter': this.bound.stop,
    		'mouseleave': this.bound.close
		});
		this.curSecMenu.getElements('li').removeEvents({
			'mouseenter': this.bound.secMenuShow,
			'mouseleave': this.bound.secMenuHide
		});
    },
    
    secMenuShow: function(e){
    	this.curElement = $(e.target);
    	if(this.curElement.get('tag') != 'a') this.curElement = this.curElement.getElement('a');
    	if(this.curElement.get('class') == 'full-list') return false;
    	this.curElement.set('morph', {duration: 600, transition: 'back:out'});
    	this.curElement.morph('.secnav-active');
    },
    
    secMenuHide: function(){
		this.curElement.morph('.secnav-no-active');
    }

});

window.addEvent('domready', function(){
    
    var secnav = new menuSlide('nav');
    
});