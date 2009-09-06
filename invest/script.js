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
		
		this.fx = new Fx.Slide(this.main, {duration: 300, transition: Fx.Transitions.Sine.easeInOut});
		this.closeLink = this.main.getElements('.close');
		this.elements = this.main.getElement('tr.active');
		this.startPosition();
		if($('basketAdd')) $('basketAdd').addEvent('click', this.start.bind(this));
		
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
		this.fx.slideIn();
		return false;
	},
	
	close: function(){
		if(!this.main.getElement('tr.active')) this.link.removeClass('active');
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
		this.arrows = this.main.getElements('.arrows');
		this.maxHeight = this.menuHeight - this.scrollBoxHeight;
		this.deletes = this.main.getElements('.delete');
		this.scrollBox.addClass('scroll');
		if(this.maxHeight <= 0) return false;
		
		this.arrows.addClass('scroll');
		
		this.fx = new Fx.Scroll(this.scrollBox, {duration: 600, wait: false, wheelStops: false, transition: Fx.Transitions.Sine.easeInOut});
		this.upArrow = this.main.getElement('.up');
		this.downArrow = this.main.getElement('.down');
		this.stepHeight = this.scrollBox.getHeight();
		this.stepWheelHeight = 22;
		this.curPosition = 0;

		if($('basketAdd')){
			alert(1);
			$('basketAdd').addEvent('click', this.check.bind(this));
		}
		this.scrollBox.addEvent('mousewheel', this.start.bind(this));
		this.deletes.addEvent('click', this.check.bind(this));
		this.upArrow.addEvent('click', function(){
			this.minusPosition(this.stepHeight);
			return false;
		}.bind(this));
		this.downArrow.addEvent('click', function(){
			this.plusPosition(this.stepHeight);
			return false;
		}.bind(this));
	},
	
	check: function(){
		alert(1);
		this.scrollBoxHeight = this.scrollBox.getHeight();
		this.menuHeight = this.menu.getHeight();
		this.maxHeight = this.menuHeight - this.scrollBoxHeight;
		if(this.maxHeight <= 0) this.arrows.removeClass('scroll')
		else this.arrows.addClass('scroll');
	},
	
	move: function(how){ this.fx.start(0, how); },
	
	minusPosition: function(how){
        if(this.curPosition > 0){
        	this.curPosition -= how;
        	if(this.curPosition < 0) this.curPosition = 0;
        	this.move(this.curPosition);
        }
	},
	
	plusPosition: function(how){
        if(this.curPosition < this.maxHeight){
        	this.curPosition += how;
        	if(this.curPosition > this.maxHeight) this.curPosition = this.maxHeight;
        	this.move(this.curPosition);
        }
	},
	
	start: function(e){
		e.wheel > 0	? this.minusPosition(this.stepWheelHeight) : this.plusPosition(this.stepWheelHeight);
		return false;
	}
	
});

var Basket = new Class({
	
	initialize: function(form){
		this.form = $(form);
		if(!this.form) return false;
		
		this.all = this.form.getElement('.all');
		this.fxAll = new Fx.Tween(this.all);
		this.summ = this.form.getElement('.summ');
		this.fxSumm = new Fx.Tween(this.summ);
		this.table = this.form.getElement('.scrollBox tbody');
		this.tableWrapper = this.table.getParent('table');
		this.maxWordWidth = 149;
		this.message = this.form.getElement('.message');
		this.body = document.body;
		this.bodyHeight = $('container').getHeight();
		this.saveButton = $('save');
		this.busy = $('busy');
		if($('basketAdd')) $('basketAdd').addEvent('click', this.addArticle.bind(this));
		
		this.check();
		$(window).addEvent('keydown', function(e){
			if($('overlay')){
				if(e.key == 'esc') this.destroyWindow();
				if(e.key == 'right' || e.key == 'space') this.next();
				if(e.key == 'left') this.prev();
				return false;
			}
		}.bind(this));
		this.saveButton.addEvent('click', this.save.bind(this));
	},

	addArticle: function(){
		this.request = new Request.JSON({
			method: 'post',
			url: 'requests/Cart.php',
			onRequest: function(){
				this.busy.addClass('active');
				this.message.setStyle('color', '#fff');
				$clear(this.interval);
			}.bind(this),
			onComplete: function(responseJSON, responseText){
				this.busy.removeClass('active');
				this.status = 'Объект добавлен!';
				if(!this.form.getElement('tbody')){
					this.table = new Element('tbody').inject(this.tableWrapper);
					$('basketLink').addClass('active');
				}
				this.product_id = 1;
				this.image = 'image.jpg';
				this.name = 'Жалюзи Торпеда Реактинвая';
				this.amount = 1;
				this.price = 1415.45;
				this.productInput = this.table.getElement('#'+this.product_id);
				if(this.productInput){
					this.inputValue = this.productInput.get('value');
					this.inputValue++;
					this.productInput.set('value', this.inputValue);
				} else {
					this.createElement();
					this.check();
				}
				this.message.set('text', this.status);
				this.message.tween('color', '#FF8000');
				this.interval = ( function(){ this.message.tween('color', '#fff')}).delay(5000, this);
			}.bind(this)
		}).send({ "data": { "action": "add", "product_id": "1",	"lang": "ru" }});
		return false;
	},
	
	save: function(){
		this.object = { "test": {"apple":"test"}};
		this.request = new Request.JSON({
			method: 'post',
			url: 'requests/Cart.php',
			onRequest: function(){
				this.busy.addClass('active');
				this.message.setStyle('color', '#fff');
				$clear(this.interval);
			}.bind(this),
			onComplete: function(responseJSON, responseText){
				this.busy.removeClass('active');
				this.status = 'Сохранено';
				this.message.set('text', this.status);
				this.message.tween('color', '#FF8000');
				this.interval = ( function(){ this.message.tween('color', '#fff')}).delay(5000, this);
			}.bind(this)
		}).send(this.form);
		
		return false;
	},

	createElement: function(){
		this.Tr = new Element('tr', { 'class': 'active' }).inject(this.table); 
		this.firstTd = new Element('td', { 'class': 'first' }).inject(this.Tr);
		this.arrowInputLeft = new Element('a', {
			'href': '#',
			'class': 'arrowsInput left',
			'text': 'влево',
			'events': {
				'click': this.minusInput.bind(this)
			}
		}).inject(this.firstTd);
		this.firstInputText = new Element('input', {
			'class': 'inputText',
			'id': this.product_id,
			'name': this.product_id,
			'type': 'text',
			'value': this.amount,
			'events': {
				'keyup': this.start.bind(this),
				'keydown': this.test.bind(this)
			}
		}).inject(this.firstTd);
		this.arrowInputRight = new Element('a', {
			'href': '#',
			'class': 'arrowsInput right',
			'text': 'вправо',
			'events': {
				'click': this.plusInput.bind(this)
			}
		}).inject(this.firstTd);
		this.firstInputHidden = new Element('input', {
			'class': 'hidden',
			'id': this.product_id,
			'name': this.product_id,
			'type': 'hidden',
			'value': 'n'
		}).inject(this.firstTd);
		this.secondTd = new Element('td', { 'class': 'second' }).inject(this.Tr);
		this.secondTdDiv = new Element('div').inject(this.secondTd);
		this.secondTdA = new Element('a', {
			'href': this.image
		}).inject(this.secondTdDiv);
		this.secondTdSpan = new Element('span', { 'text': this.name }).inject(this.secondTdA);
		this.secondTdB = new Element('b', { 'text': '...' }).inject(this.secondTd);
		this.thirdTd = new Element('td', { 'class': 'third' }).inject(this.Tr);
		this.thirdTdSpan = new Element('span', { 'text': this.price }).inject(this.thirdTd);
		this.thirdTdB = new Element('b', { 'text': 'грн' }).inject(this.thirdTd);
		this.fourthTd = new Element('td', { 'class': 'fourth' }).inject(this.Tr);
		this.fourthTdA = new Element('a', {
			'class': 'delete',
			'href': '#',
			'text': 'x',
			'title': 'Удалить товар',
			'events': {
				'click': this.remove.bind(this)
			}
		}).inject(this.fourthTd);
		this.checkLength(this.secondTdSpan);
	},
	
	plusInput: function(e){
		element = $(e.target) || e;
		this.currentInput = element.getParent('td').getElement('input');
		this.inputValue = this.currentInput.get('value');
		this.inputValue++;
		this.currentInput.set('value', this.inputValue);
		this.check();
		return false;
	},
	
	minusInput: function(e){
		element = $(e.target);
		this.currentInput = element.getParent('td').getElement('input');
		this.inputValue = this.currentInput.get('value');
		if(this.inputValue == 0) return false;
		this.inputValue--;
		this.currentInput.set('value', this.inputValue);
		this.check();
		return false;
	},
	
	check: function(){
		this.allText = 0;
		this.summText = 0;
		this.elementTrs = this.form.getElements('tr.active');
		this.elementTrs.each(function(element){
			element = element.getElement('td input.inputText');
			if(element.get('value') != '') this.allText += element.get('value').toInt()
		}.bind(this));
		this.elementTrs.each(function(element){
			element = element.getElement('td.third span');
			this.summText += element.get('text').toFloat() * element.getParent('tr.active').getElement('input.inputText').get('value').toInt();
		}.bind(this));
		this.summText = this.separate(this.summText);
		this.fxAll.set('color', '#fff');
		this.fxSumm.set('color', '#fff');
		this.all.set('text', this.allText + ' товар(ов)');
		this.summ.set('text', this.summText + 'грн');
		this.fxAll.start('color', '#1A3D92');
		this.fxSumm.start('color', '#1A3D92');
		this.blueTr();
	},
	
	checkLength: function(element){
		if(element.getWidth() > this.maxWordWidth) element.getParent('td').getElement('b').addClass('active');
	},
	
	blueTr: function(){
		i = true;
		this.table.getElements('tr').removeClass('blue');
		this.currentTr = this.table.getFirst('tr.active');
		if(!this.currentTr) return false;
		this.lastTr = this.table.getLast('tr.active');
		while(this.currentTr != this.lastTr){
			if(i){
				this.currentTr.addClass('blue');
				this.currentTr = this.currentTr.getNext('tr.active');
				i = false;
			} else { 
				this.currentTr = this.currentTr.getNext('tr.active');
				i = true;
			}
		}
		if(i) this.currentTr.addClass('blue');
	},
	
	separate: function(str){
		str = str.round(2).toString();
		i = 0;
		this.dotPosition = str.indexOf('.');
		this.afterDot = str.substring(this.dotPosition);
		str = str.substring(-1, this.dotPosition);
		this.length = str.length;
		this.howSep = (str.length / 3).toInt();
		this.str = '';
		while(i != this.howSep){
			this.length = this.length - 3;
			this.strLast = str.substring(this.length);
			str = str.substring(-1, this.length);
			this.str = " " + this.strLast + this.str;
			i++;
		}
		this.str = str + this.str + this.afterDot;
		return this.str;
	},
	
	remove: function(e){
		this.currentDelete = $(e.target);
		this.currentTr = this.currentDelete.getParent('tr');
		this.currentTr.set('class', 'deleted');
		this.currentTr.getElement('.hidden').set('value', 'y');
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
		this.inputValue = this.currentInput.get('value');
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
		if(!this.inputValue.match(/^.{1,3}$/)) return false;
	},
	
	count: function(){
		this.currentSrc = this.currentTr.getElement('td.second').get('href');
		this.textH2 = this.currentTr.getElement('td.second').get('text');
		this.inputText = this.currentTr.getElement('input.inputText').get('value');
		this.summText = this.currentTr.getElement('td.third span').get('text').toFloat() * this.inputText;
		this.summText = this.separate(this.summText);
	},
	
	createWindow: function(e){
		this.currentTr = $(e.target).getParent('tr');
		this.count();
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
				'top': $(window).getScroll().y + 90
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
		this.popupH2 = new Element('h2', { 'text': this.textH2 }).inject(this.popupBorder);
		this.popupImgBox = new Element('div', {	'class': 'img' }).inject(this.popupBorder);
		this.popupImg = new Asset.image(this.currentSrc, {
			onload: function(){
				this.addClass('loaded');
				this.fade('hide');
				this.fade('in');
			}
		}).inject(this.popupImgBox);
		this.popupRight = new Element('a', {
			'class': 'arrows right',
			'title': 'Следущий товар',
			'href': '#',
			'text': 'вправо',
			'events': {
				'click': this.next.bind(this)
			}
		}).inject(this.popupBorder);
		this.popupLeft = new Element('a', {
			'class': 'arrows left',
			'title': 'Предыдущий товар',
			'href': '#',
			'text': 'влево',
			'events': {
				'click': this.prev.bind(this)
			}
		}).inject(this.popupBorder);
		this.popupAll = new Element('p', { 'class': 'all', 'text': 'Всего:' }).inject(this.popupBorder);
		this.popupAllSpan = new Element('span', { 'text': this.inputText + ' товар(ов)'}).inject(this.popupAll);
		this.popupSumm = new Element('p', { 'class': 'summ', 'text': 'На сумму:' }).inject(this.popupBorder);
		this.popupSummSpan = new Element('span', { 'text': this.summText + 'грн'}).inject(this.popupSumm);
		this.overlay.fade('hide');
		this.overlay.fade('0.7');
		( function(){ this.popupWindow.addClass('ready'); }).delay(500, this);
	},
	
	setText: function(){
		this.popupH2.set('text', this.textH2);
		this.popupImg.set('src', this.currentSrc);
		this.popupAllSpan.set('text', this.inputText + ' товар(ов)');
		this.popupSummSpan.set('text', this.summText + 'грн');
	},
	
	prev: function(){
		this.currentTr = $pick(this.currentTr.getPrevious(), this.table.getLast('tr'));
		this.move();
		return false;
	},
	
	next: function(){
		this.currentTr = $pick(this.currentTr.getNext(), this.table.getFirst('tr'));
		this.move();
		return false;
	},
	
	move: function(){
		this.reset();
		this.count();
		this.setText();
		[this.popupAllSpan, this.popupSummSpan].each(function(element){
			element.tween('color', '#162b48');
		});
		this.popupH2.tween('color', '#393939');
		this.popupImg = new Asset.image(this.currentSrc, {
			onload: function(){
				this.addClass('loaded');
				this.fade('hide');
				this.fade('in');
			}
		}).inject(this.popupImgBox);
	},
	
	reset: function(){
		[this.popupAllSpan, this.popupH2, this.popupSummSpan].each(function(element){
			element.setStyle('color', '#fff');
		});
		this.popupImg.destroy();
	},
	
	destroyWindow: function(){
		if(this.overlay && this.popupWindow){
			this.overlay.fade('out');
			this.popupWindow.destroy();
			( function(){
				this.overlay.destroy();
			}).delay(500, this);
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