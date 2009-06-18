var Menu = new Class({
	
	initialize: function(menu){
		this.menu = $(menu);
		if(!this.menu) return false;
		
		this.columns = this.menu.getElements('ul');
		this.titles = this.menu.getElements('li');
		
		this.columns.fade('hide');
		
		this.menu.addEvents({
			'mouseenter': this.stopTimer.bind(this),
			'mouseleave': this.startTimer.bind(this)
		});
		this.addTitlesEvents();
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
	
	addTitlesEvents: function(){
		this.titles.each(function(element){
			if(element.getElement('ul')){
				element.addEvents({
					'mouseenter': this.start.bind(this),
					'mouseleave': this.hide.bind(this)
				});
			} else element.addEvent('mouseenter', this.check.bind(this));
		}.bind(this));
	},
	
	start: function(e){
		this.curElement = $(e.target).getElement('ul') || $(e.target).getNext();
		if(!this.curElement || this.curElement.get('tag') != 'ul') return false;
		
		this.show();
	},
	
	close: function(){
		this.hideAll();
		this.stopTimer();
	},
	
	check: function(e){
		if(this.interval) this.stopTimer();
		if($(e.target).get('tag') == 'li') {this.curTitle = $(e.target)}
		else this.curTitle = $(e.target).getParent('li');
		
		if(!this.curTitle.getParent('li')) this.hideAll();
	},
	
	show: function(){
		if(!this.curElement) return false;
		this.curElement.fade('in');
	},
	
	hide: function(){
		if(!this.curElement || this.curElement.get('tag') != 'ul') return false;
		this.curElement.fade('out');
	},
	
	hideAll: function(){
		this.columns.fade('out');
	}
	
})

window.addEvent('domready', function(){
	
	var Nav = new Menu('nav');
	
})