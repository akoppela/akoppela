var slideMenu = new Class ({
	
	initialize: function(block){
		this.block = $(block);
		if(!this.block) return false;
		
		this.fx = new Fx.Slide(this.block, {duration: 300, transition: Fx.Transitions.Sine.easeInOut, wait:false});
		this.linktest = this.block.getParent('li').getElement('a');
		
		this.startPosition();
		
		this.linktest.addEvent('click', this.start.bind(this));
	},
	
	startPosition: function(){
		this.block.getParent('div').addClass('slide');
		if(!this.block.getParent('ul').getParent('ul')) this.fx.hide();
		if(this.block.getElement('.current')){
			this.fx.show();
			this.block.getParent('li').addClass('current');
		}
	},
	
	start: function(e){
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
	
	initialize: function(main, link){
		this.main = $(main);
		this.link = $(link);
		if(!this.main || !this.link) return false;
		
		this.fx = new Fx.Slide(this.main, {duration: 400, transition: Fx.Transitions.Sine.easeInOut, mode: 'horizontal'});
		this.closeLink = this.main.getElement('.head a');
		this.elements = this.main.getElement('tr');
		this.startPosition();
		
		this.link.addEvent('click', this.start.bind(this));
		this.closeLink.addEvent('click', this.close.bind(this));
		/* this.main.addEvents({
			'mouseenter': this.stopTimer.bind(this),
			'mouseleave': this.startTimer.bind(this)
		}); */
	},
	
	startPosition: function(){
		if(this.elements) this.link.addClass('active');
		this.main.addClass('winblock');
		this.main.getParent('div').addClass('winfx');
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
		this.main.removeClass('closeWindow');
		this.fx.toggle();
		return false;
	},
	
	close: function(){
		if(!this.main.getElement('tr')) this.link.removeClass('active');
		this.fx.slideOut();
		(function(){ this.main.addClass('closeWindow'); }).delay(500, this);
		return false;
	}
	
});

var myScroll = new Class({
	
	initialize: function(main){
		this.main = $(main);
		if(!this.main) return false;
		
		this.scrollBox = this.main.getElement('.scrollBox');
		this.scrollBoxHeight = this.scrollBox.getHeight();
		this.menu = this.scrollBox.getElement('table');
		this.menuHeight = this.menu.getHeight();
		this.maxHeight = this.menuHeight - this.scrollBoxHeight;
		this.deletes = this.main.getElements('.delete');
		if(this.maxHeight <= 0) return false;
		
		this.fx = new Fx.Scroll(this.scrollBox, {duration: 200, wait: false, wheelStops: false, transition: Fx.Transitions.Sine.easeInOut});
		this.arrows = this.main.getElements('.arrows');
		this.upArrow = this.main.getElement('.up');
		this.downArrow = this.main.getElement('.down');
		this.stepHeight = this.scrollBox.getElement('tr').getHeight();
		this.curPosition = 0;
		
		this.startPosition();

		this.scrollBox.addEvent('mousewheel', this.start.bind(this));
		this.deletes.addEvent('click', this.check.bind(this));
		this.upArrow.addEvent('mousedown', this.moveUp.bind(this));
		this.downArrow.addEvent('mousedown', this.moveDown.bind(this));
		this.arrows.addEvent('click', this.pause.bind(this));
	},
	
	startPosition: function(){
		this.scrollBox.addClass('scroll');
		this.arrows.addClass('scroll');
	},
	
	check: function(){
		this.scrollBoxHeight = this.scrollBox.getHeight();
		this.menuHeight = this.menu.getHeight();
		this.maxHeight = this.menuHeight - this.scrollBoxHeight;
		if(this.maxHeight <= 0) this.arrows.removeClass('scroll')
		else this.arrows.addClass('scroll');
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
		return false;
	},
	
	moveDown: function(){
        if(this.interval) return false;
        this.interval = this.plusPosition.periodical(150, this);
        this.plusPosition();
		return false;
	},
	
	pause: function(){
        if(!this.interval) return false;
        this.interval = $clear(this.interval);
        return false;
	},
	
	start: function(e){
		e.wheel > 0	? this.minusPosition() : this.plusPosition();
		return false;
	}
	
});

var Basket = new Class({
	
	initialize: function(form){
		this.form = $(form);
		if(!this.form) return false;
		
		this.all = this.form.getElement('.all span');
		this.fxAll = new Fx.Tween(this.all);
		this.summ = this.form.getElement('.summ span');
		this.fxSumm = new Fx.Tween(this.summ);
		this.deletes = this.form.getElements('.delete');
		this.inputs = this.form.getElements('td input');
		this.elements = this.form.getElements('td.second');
		this.body = document.body;
		this.bodyHeight = $('container').getHeight();
		
		this.check();
		
		this.deletes.addEvent('click', this.remove.bind(this));
		this.inputs.addEvents({
			'keyup': this.start.bind(this),
			'keydown': this.test.bind(this)
		});
		this.elements.addEvent('click', this.createWindow.bind(this));
		$(window.document).addEvent('keydown', function(e){
			if(e.key = 'esc') this.destroyWindow();
		}.bind(this));
	},
	
	check: function(){
		this.allText = 0;
		this.summText = 0;
		this.form.getElements('td input').each(function(element){
			if(element.get('value') != '') this.allText += element.get('value').toInt()
		}.bind(this));
		this.form.getElements('td.third').each(function(element){
			this.summText += element.get('text').toInt() * element.getParent('tr').getElement('input').get('value').toInt();
		}.bind(this));
		this.fxAll.set('color', '#fff');
		this.fxSumm.set('color', '#fff');
		this.all.set('text', this.allText + ' товар(ов)');
		this.summ.set('text', this.summText + ' грн');
		this.fxAll.start('color', '#162b48');
		this.fxSumm.start('color', '#162b48');
	},
	
	remove: function(e){
		this.currentDelete = $(e.target);
		this.currentTr = this.currentDelete.getParent('tr');
		this.currentTr.destroy();
		this.check();
		return false;
	},
	
	start: function(e){
		this.inputValue = this.currentInput.get('value');
		if(this.inputValue == '') this.currentInput.set('value', '0');
		if(e.key.match(/^[0-9]*$/) || e.key == 'backspace' || e.key == 'delete') { this.check(); }
	},

	test: function(e){
		this.currentInput = $(e.target);
		this.inputValue = this.currentInput.get('value').toInt();
		if(e.key == 'up'){
			this.inputValue++;
			this.currentInput.set('value', this.inputValue);
			this.check();
			return false;
		} else if(e.key == 'down'){
			this.inputValue--;
			if(this.inputValue <= 0) this.inputValue = 0;
			this.currentInput.set('value', this.inputValue);
			this.check();
			return false;
		}
		if(this.currentInput.get('value') == '0') this.currentInput.set('value', '');
		if(e.key == 'right' || e.key == 'left' || e.key == 'backspace' || e.key == 'delete') return true
		else if(e.key.match(/^[^0-9]*$/)) return false;
	},
	
	createWindow: function(e){
		this.currentSrc = $(e.target).get('href');
		this.overlay = new Element('div', {
			'id': 'overlay',
			'styles': {
				'height': this.bodyHeight
			},
			'events': {
				'click': this.destroyWindow.bind(this)
			}
		}).inject(this.body);
		this.popupWindow = new Element('div', {
			'id': 'popupBasket',
			'class': 'box',
			'styles': {
				'top': $(window).getScroll().y + 50
			}
		}).inject(this.body);
		this.popupHead = new Element('div', { 'class': 'head' }).inject(this.popupWindow);
		this.popupHeadLink = new Element('a', {
			'href': '#',
			'text': 'закрыть',
			'events': {
				'click': this.destroyWindow.bind(this)
			}
		}).inject(this.popupHead);
		this.popupMain = new Element('div', { 'class': 'main' }).inject(this.popupWindow);
		this.popupBorder = new Element('div', { 'class': 'border' }).inject(this.popupMain);
		this.popupImgBox = new Element('div', {	'class': 'img' }).inject(this.popupBorder);
		this.popupImg = new Element('img', {
			'src': this.currentSrc,
			'events': {
				'load': function(){
					alert(1);
					this.setStyle('visibility', 'hidden');
				}
			}
		}).inject(this.popupImgBox);
	},
	
	destroyWindow: function(){
		if(this.overlay && this.popupWindow){
			this.overlay.destroy();
			this.popupWindow.destroy();
		}
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
	if($('basketBox')){ new slideWindows('basketBox', 'basketLink'); }
	if($('basket')){ new myScroll('basketBox'); }
	if($('basketForm')){ new Basket('basketForm'); }
	
});