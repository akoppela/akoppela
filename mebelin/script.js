var Slider = new Class({
	
	initialize: function(main){
		this.main = $(main);
		if(!this.main) return false;
		
		this.first = this.main.getFirst('li');
		this.current = this.first;
		this.main.getElements('li').fade('hide');
		this.current.fade('in');
		
		this.start.periodical(5000, this);
	},
	
	to: function(element){
		this.current.fade('out');
		(function(){ 
			this.current = element;
			this.current.fade('in');
		}).delay(600, this);
	},
	
	start: function(){
		this.to($pick(this.current.getNext(), this.first));
	}
	
});

var slideMenu = new Class({
	
	initialize: function(main){
		this.main = $(main);
		if(!this.main) return false;
		
		this.main.addClass('fx');
		this.main.getParent('ul').getElements('li').removeClass('iefix');
		this.fx = new Fx.Slide(this.main, {duration: 300, transition: Fx.Transitions.Sine.easeInOut});
		this.fx.hide();
		this.link = this.main.getParent('li').getFirst('a');
		
		this.link.addEvent('click', this.start.bind(this));
	},
	
	start: function(){
		this.fx.toggle();
		return false;
	}
	
});

window.addEvent('domready', function(){
	
	if($('slider')){ var mySlider = new Slider('slider'); }
	
	if($$('#right-nav li ul')){ 
		$$('#right-nav li ul').each(function(element){
			new slideMenu(element);
		});
	}
	
});