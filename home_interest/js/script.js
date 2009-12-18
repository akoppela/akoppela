var Input = new Class({

	initialize: function(element){
		this.element = $(element);
		if(!this.element) return

		this.defaultValue = this.element.get('default');
		this.assignEvents();
		this.addText();
	},
	
	assignEvents: function(element){
		(element || this.element).addEvents({
			'focus': this.removeText.bind(this),
			'blur': this.addText.bind(this)
		});
	},

	removeText: function(){
		if(this.element.hasClass('default')){
			this.element.set('value', '');
			this.element.removeClass('default');
			return true
		}
	},

	addText: function(){
		if(this.element.get('value').match(/^\s*$/) || this.element.get('value') == this.defaultValue){
			this.element.set('value', this.defaultValue);
			this.element.addClass('default');
			return true
		}
	}

});

Input.Password = new Class({
	
	Extends: Input,
	
	initialize: function(element){
		this.element = $(element);
		if(!this.element) return
		
		this.input = new Element('input', { 'class': this.element.className }).inject(this.element, 'after').setStyle('display', 'none');
		this.parent(this.element);
		this.assignEvents(this.input);
		this.input.removeEvents('blur');
	},
	
	removeText: function(){
		if(this.parent()){
			this.input.setStyle('display', 'none');
			this.element.setStyle('display', 'block');
			this.element.focus();
		}
	},
	
	addText: function(){
		if(this.parent()){
			this.element.setStyle('display', 'none');
			this.input.set('value', this.defaultValue).setStyle('display', 'block');
		}
	}
	
});

var Button = new Class({
	
	initialize: function(button){
		this.button = $(button);
		if(!this.button) return
		
		this.submit = this.button.getElement('input[type=submit]');
		if(this.submit){
			this.form = this.submit.getParent('form');
			this.submit.setStyle('display', 'none');
			new Element('a', {
				'html': this.submit.get('value'),
				'events': {
					'click': function(){
						this.form.submit();
					}.bind(this)
				}
			}).inject(this.submit, 'after');
		}
				
		this.button.addEvents({
			'mousedown': function(){ this.addClass('active'); },
			'mouseup': function(){ this.removeClass('active'); },
			'mouseleave': function(){ this.removeClass('active'); }
		});
	}
	
});

var Authorize = new Class({
	
	initialize: function(main){
		this.main = $(main);
		if(!this.main) return
		
		this.fx = new Fx.Scroll(this.main.getElement('.main'), { transition: Fx.Transitions.Expo.easeInOut, wait: false });
		this.label = this.main.getElement('label');
		this.labelFor = $(this.label.get('for'));
		this.swapLinks = this.main.getElements('.swap');
		this.swapLink = new Array();
		this.fxSwap = new Array();
		this.swapLinks.each(function(element){
			i = element.hasClass('first') ? 'first' : 'second';
			this.swapLink[i] = element;
			this.fxSwap[i] = new Fx.Tween(element, { duration: 250, wait: false });
		}.bind(this));
		
		this.swapLinks.addEvent('click', this.click.bind(this));
		this.label.addEvent('click', this.scrollToLogin.bind(this));
		window.addEvent('keydown', this.tabulation.bind(this));
		this.main.getElement('.pass input').addEvent('keydown', function(e){ if(e.key == 'tab'){ this.labelFor.focus(); return false; }}.bind(this));
	},
	
	changeLinks: function(first, second, label){
		this.position = first;
		this.fxSwap[second].start('color', '#fff').chain(function(){
			this.swapLink[first].removeClass('white');
			this.swapLink[second].addClass('white');
			this.fxSwap[first].start('color', '#606060').chain(function(){ this.busy = false; if(label) this.labelFor.focus(); }.bind(this));
		}.bind(this));
	},
	
	click: function(e){
		if(!this.busy){
			this.busy = true;
			this.activeLink = $(e.target);
			this.fx.start(this.activeLink.hasClass('first') ? 620 : 0, 0);
			this.activeLink.hasClass('second') ? this.changeLinks('first', 'second') : this.changeLinks('second', 'first');
		}
		return false;
	},
	
	scrollToLogin: function(){
		if(!this.busy){
			this.busy = true;
			this.fx.start(0, 0);
			this.changeLinks('first', 'second', true);
		}
		return false;
	},
	
	tabulation: function(e){
		if(e.key == 'tab'){
			
		}
	}
	
});

var Menu = new Class({
	
	initialize: function(menu){
		this.menu = $(menu);
		if(!this.menu) return
		
		this.menu.addClass('active');
		this.togglers = this.menu.getElements('li.first');
		this.elements = this.menu.getElements('li ul');
		this.displayPosition = this.menu.getElement('.first.active').get('displayPosition');
		
		new Fx.Accordion(this.togglers, this.elements, {
			trigger: 'mouseenter',
			opacity: false,
			onActive: function(toggler, element){
				toggler.addClass('active');
			},
			onBackground: function(toggler, element){
				toggler.removeClass('active');
			},
			display: this.displayPosition,
			duration: 400
		});
	}
	
});

window.addEvent('domready', function(){

	$$('.button').each(function(element){ new Button(element); });
	$$('input[default], textarea[default]').each(function(element){
		element.get('type') != 'password' ? new Input(element) : new Input.Password(element);
	});
	new Authorize('authorize');
	new Menu('accordion');
		
});