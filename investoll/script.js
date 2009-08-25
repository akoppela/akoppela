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
		this.fx = new Fx.Slide(this.menu, {duration: 300, transition: Fx.Transitions.Sine.easeInOut});
		this.link = this.menu.getElement('.close');
		this.smMenu = this.main.getElement('.sm-menu');
		this.smFx = new Fx.Slide(this.smMenu, {duration: 300, transition: Fx.Transitions.Sine.easeInOut});
		this.smLink = this.smMenu.getElement('.open a');
		
		this.startPosition();
		
		this.link.addEvent('click', this.close.bind(this));
		this.smLink.addEvent('click', this.open.bind(this));
	},
	
	startPosition: function(){
		this.smMenu.addClass('smfx');
		this.menu.getParent('div').addClass('fx');
		this.smFx.hide();
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
	new slideHead('header');
	
});