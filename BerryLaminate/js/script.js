var menuFx = new Class({
	
	initialize: function(block){
		this.block = $(block);
		if(!this.block) return;
		
		this.parent = this.block.getParent('li');
		this.fx = new Fx.Slide(this.block, { duration: 300, transition: Fx.Transitions.Sine.easeInOut, wait: false });
		this.fx.hide();
		this.block.getParent('div').addClass('fx');
		this.block.addClass('fx');
		
		this.parent.addEvents({
			'mouseenter': this.show.bind(this),
			'mouseleave': this.hide.bind(this)
		});
	},
	
	show: function(){ this.fx.slideIn(); },
	
	hide: function(){ this.fx.slideOut(); }
	
});

var Slider = new Class({
	
	initialize: function(box){
		this.box = $(box);
		if(!this.box) return;
		
		this.wrapper = this.box.getElement('.wrapper');
		this.fx = new Fx.Scroll(this.wrapper, { duration: 1200, fps:200, transition: Fx.Transitions.Back.easeInOut, wait: false });
		this.menu = this.box.getElement('ul');
		this.panel = this.box.getElement('.arrows-panel');
		this.panel.fade(0.5);
		this.currentImg = this.menu.getFirst('li');
		this.imgWidth = this.currentImg.getWidth();
		this.arrows = this.box.getElements('.arrows');
		this.leftArrow = this.box.getElement('.left');
		this.rightArrow = this.box.getElement('.right');
		this.setMenuWidth();
		if(this.maxWidth < 0) return;
		this.fx.set(this.paddingWidth, 0);
		this.startTimer();
		
		this.panel.addEvents({
			'mouseenter': this.fadeIn.bind(this),
			'mouseleave': this.fadeOut.bind(this)
		});
		this.arrows.addEvent('mouseenter', this.fadeIn.bind(this));
		this.leftArrow.addEvent('click', this.prev.bind(this));
		this.rightArrow.addEvent('click', this.next.bind(this));
		this.box.addEvents({
			'mouseenter': this.stopTimer.bind(this),
			'mouseleave': this.startTimer.bind(this)
		});
	},
	
	startTimer: function(){
		if(this.interval) return false;
		this.interval = this.next.periodical(5000, this);
		return true;
	},
	
	stopTimer: function(){
		if(!this.interval) return false;
		this.interval = $clear(this.interval);
		return true;
	},
	
	setMenuWidth: function(){
		this.width = 0;
		this.maxWidth = 0;
		this.menu.getElements('li').each(function(element){
			this.width += element.getWidth();
		}.bind(this));
		this.paddingWidth = this.menu.getStyle('padding-left').toInt()
		this.currentPosition = this.paddingWidth;
		this.width += this.paddingWidth * 2;
		this.maxWidth = this.width - this.imgWidth - this.paddingWidth;
		this.menu.setStyle('width', this.width);
	},
	
	fadeIn: function(){ this.panel.fade(1); },
	
	fadeOut: function(){ this.panel.fade(0.5); },
	
	prev: function(){
		this.currentPosition -= this.imgWidth;
		if(this.currentPosition < this.paddingWidth) this.currentPosition = this.maxWidth;
		this.move();
		return false;
	},
	
	next: function(){
		this.currentPosition += this.imgWidth;
		if(this.currentPosition > this.maxWidth) this.currentPosition = this.paddingWidth;
		this.move();
		return false;
	},
	
	move: function(){ this.fx.start(this.currentPosition, 0); }
	
});

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
	
	start: function(e){
		this.fx.toggle();
		return false;
	}
	
});

var Comments = new Class({
	
	initialize: function(main){
		this.main = $(main);
		if(!this.main) return;
		
		this.addLink = this.main.getElement('.add-comment');
		this.addBox = this.main.getElement('.add-commentfx');
		this.nameInput = this.main.getElement('input.name');
		this.textarea = this.main.getElement('textarea');
		this.fxAdd = new Fx.Slide(this.addBox, { duration: 400, wait: false, transition: Fx.Transitions.Sine.easeOut });
		new Input(this.nameInput);
		new Input(this.textarea);
		this.startPosition();
		
		this.addLink.addEvent('click', this.start.bind(this));
	},
	
	startPosition: function(){
		this.addBox.getParent('div').addClass('fx');
		this.fxAdd.hide();
	},
	
	start: function(){ this.fxAdd.toggle(); return false; }
	
});

var Input = new Class({
	
	initialize: function(element){
		this.element = $(element);
		if(!this.element) return false;
		
		this.elementText = this.element.get('value') || this.element.get('text');
		
		this.element.addEvents({
			'focus': this.removeText.bind(this),
			'blur': this.addText.bind(this)
		});
	},
	
	removeText: function(){	if(this.element.get('value') == this.elementText) this.element.set('value', ''); },
	
	addText: function(){ if(this.element.get('value') == '') this.element.set('value', this.elementText); }
	
});

window.addEvent('domready', function(){
	
	if($$('#header .navigation ul') != ''){
		$$('#header .navigation ul').each(function(element){
			new menuFx(element);
		});
	}
	if($('imgBox')){ new Slider('imgBox'); }
	if($('welittaLink')){
		$('welittaLink').tween('color', '#dad9d7');
		$('welittaLink').addEvents({
		'mouseenter': function(){
			this.tween('color', '#afafaf');
		},
		'mouseleave': function(){
			this.tween('color', '#dad9d7');
		}
	});}
	if($$('ul.left ul') != ''){
		$$('ul.left ul').each(function(element){
			new slideMenu(element);
		});
	}
	if($('Comments')){ new Comments('Comments'); }
	
});