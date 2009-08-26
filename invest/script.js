var slideMenu = new Class ({
	
	initialize: function(block){
		this.block = $(block);
		if(!this.block) return false;
		
		this.fx = new Fx.Slide(this.block, {duration: 500, transition: Fx.Transitions.Back.easeInOut, wait:false});
		this.link = this.block.getParent('li').getElement('a');
		
		this.startPosition();
		if(this.block.getElement('.current')){
			this.fx.show();
			this.block.getParent('li').addClass('current');
		}
		
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

var Input = new Class({
	
	initialize: function(element){
		this.element = $(element);
		if(!this.element) return false;
		
		this.elementType = this.element.get('type');
		if(this.elementType != 'text') return false;
		this.elementText = this.element.get('value');
		
		this.element.addEvents({
			'focus': this.removeText.bind(this),
			'blur': this.addText.bind(this)
		});
	},
	
	removeText: function(){	if(this.element.get('value') == this.elementText) this.element.set('value', ''); },
	
	addText: function(){ if(this.element.get('value') == '') this.element.set('value', this.elementText); }
	
});

var slideHead = new Class({
	
	initialize: function(main){
		this.main = $(main);
		if(!this.main) return false;
		
		this.menu = this.main.getElement('.menu');
		this.fx = new Fx.Slide(this.menu, {duration: 300, transition: Fx.Transitions.Sine.easeInOut, wait:false});
		this.link = this.menu.getElement('.close');
		this.smMenu = this.main.getElement('.sm-menu');
		this.smFx = new Fx.Slide(this.smMenu, {duration: 300, transition: Fx.Transitions.Sine.easeInOut, wait:false});
		this.smLink = this.smMenu.getElement('.open a');
		
		this.startPosition();
		
		this.link.addEvent('click', this.close.bind(this));
		this.smLink.addEvent('click', this.open.bind(this));
	},
	
	startPosition: function(){
		this.menu.addClass('fx');
		this.menu.getParent('div').addClass('fx');
		this.smMenu.getParent('div').addClass('fx');
		this.fx.hide();
	},
	
	cancel: function(){
		this.fx.cancel();
		this.smFx.cancel();
	},
	
	open: function(){
		this.cancel();
		this.fx.slideIn();
		this.smFx.slideOut();
		return false;
	},
	
	close: function(){
		this.cancel();
		this.fx.slideOut();
		this.smFx.slideIn();
		return false;
	}
	
});

var slideWindows = new Class({
	
	initialize: function(main){
		this.main = $(main);
		if(!this.main) return false;
		
		this.block = this.main.getElement('.box');
		this.fx = new Fx.Slide(this.block, {duration: 400, transition: Fx.Transitions.Sine.easeInOut, mode: 'horizontal'});
		this.link = this.main.getElement('.link');
		this.linkFx = new Fx.Slide(this.link, {duration: 400, transition: Fx.Transitions.Sine.easeInOut, mode: 'horizontal'});
		this.closeLink = this.main.getElement('.head a');
		this.startPosition();
		
		this.link.addEvent('click', this.start.bind(this));
		this.closeLink.addEvent('click', this.close.bind(this));
		this.main.addEvents({
			'mouseenter': this.stopTimer.bind(this),
			'mouseleave': this.startTimer.bind(this)
		});
	},
	
	startPosition: function(){
		this.block.addClass('winblock');
		this.block.getParent('div').addClass('winfx');
		this.link.getParent('div').addClass('winfx');
		this.fx.hide();
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
	
	start: function(){
		this.fx.toggle();
		this.linkFx.toggle();
		return false;
	},
	
	close: function(){
		this.fx.slideOut();
		this.linkFx.slideIn();
		return false;
	}
	
});

var myScroll = new Class({
	
	initialize: function(main){
		this.main = $(main);
		if(!this.main) return false;
		
		this.scrollBox = this.main.getElement('.scrollBox');
		this.scrollBoxHeight = this.scrollBox.getHeight();
		this.menu = this.scrollBox.getElement('ul');
		this.menuHeight = this.menu.getHeight();
		this.maxHeight = this.menuHeight - this.scrollBoxHeight;
		if(this.maxHeight <= 0) return false;
		
		this.fx = new Fx.Scroll(this.scrollBox, {duration: 200, wait: false, wheelStops: false, transition: Fx.Transitions.Sine.easeInOut});
		this.arrows = this.main.getElements('.arrows');
		this.upArrow = this.main.getElement('.up');
		this.downArrow = this.main.getElement('.down');
		this.stepHeight = this.scrollBox.getElement('li').getHeight();
		this.curPosition = 0;
		
		this.startPosition();

		this.scrollBox.addEvent('mousewheel', this.start.bind(this));
		this.upArrow.addEvent('mousedown', this.moveUp.bind(this));
		this.downArrow.addEvent('mousedown', this.moveDown.bind(this));
		this.arrows.addEvent('mouseup', this.pause.bind(this));
	},
	
	startPosition: function(){
		this.scrollBox.addClass('scroll');
		this.arrows.addClass('scroll');
	},
	
	move: function(how){ this.fx.start(0, how); },
	
	minusPosition: function(){
        if(this.curPosition > 0) {
        	this.curPosition -= this.stepHeight;
        	if(this.curPosition < 0) this.curPosition = 0;
        	this.move(this.curPosition);
        }
	},
	
	plusPosition: function(){
        if(this.curPosition < this.maxHeight) {
        	this.curPosition += this.stepHeight;
        	if(this.curPosition > this.maxHeight) this.curPosition = this.maxHeight;
        	this.move(this.curPosition);
        }
	},
	
	moveUp: function(){
        if(this.interval) return false;
        this.interval = this.minusPosition.periodical(150, this);
        this.minusPosition();
		return true;
	},
	
	moveDown: function(){
        if(this.interval) return false;
        this.interval = this.plusPosition.periodical(150, this);
        this.plusPosition();
		return true;
	},
	
	pause: function(){
        if(!this.interval) return false;
        this.interval = $clear(this.interval);
        return true;
	},
	
	start: function(e){
		e.wheel > 0	? this.minusPosition() : this.plusPosition();
		return false;
	}
	
});

window.addEvent('domready', function(){

	if($$('#left .menu ul') != ''){ $$('#left .menu ul').each(function(element){ new slideMenu(element); }); } 
	if($$('#order input') != ''){
		$$('#order input').each(function(element){
			$(element).addEvents({
				'focus': function(){ this.addClass('focus'); },
				'blur': function(){ this.removeClass('focus'); }
			});
			new Input(element);
		});
	}
	if($('header')){ new slideHead('header'); }
	if($$('#windows li.mainlink') != ''){ $$('#windows li.mainlink').each(function(element){ new slideWindows(element); }); }
	if($('basket')){ new myScroll('basketBox'); }
	
});