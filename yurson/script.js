var slideFx = new Class ({
	
	initialize: function(link){
		this.link = $(link);
		if(!this.link) return false;
		
		this.block = this.link.getElement('.install-wrapper');
		this.curLink = this.link.getFirst('a');
		if(!this.block) return false;
		
		this.fx = new Fx.Slide(this.block, {duration: '300', transition: Fx.Transitions.Sine.easeOut});
		
		this.startPos();
		
		this.curLink.addEvent('click', this.start.bind(this));
	},
	
	startPos: function(){
		this.block.addClass('slide');
		this.link.removeClass('iefix');
		this.fx.hide();
	},
	
	start: function(e){
		this.fx.toggle();
		return false;
	}
	
});

var formValidator = new Class({
	
	initialize: function(form){
		this.form = $(form);
		if(!this.form) return false;
		
		this.needs = this.form.getElements('.need');
		this.mails = this.form.getElements('.email');
		if(!this.needs && !this.mails) return false;
		
		this.form.addEvent('submit', this.start.bind(this));
		this.needs.addEvent('click', this.check.bind(this));
	},
	
	needValid: function(){
		this.needs.each(function(element){
			this.curNeedInput = $(element);
			this.text = this.curNeedInput.get('value');
			if(this.text == '' || this.text.test('заполните поле')){
				this.curNeedInput.addClass('notValid');
				this.curNeedInput.set('value', 'заполните поле');
				this.col += 1;
			}
		}.bind(this));
	},
	
	mailValid: function(){
		this.mails.each(function(element){
			this.curMailInput = $(element);
			this.text = this.curMailInput.get('value');
			this.regex = /^([\-0-9A-Za-z_]+)@([\-0-9a-z_^.]+\.[a-z]{2,4})$/.test(this.text);
			if(!this.regex) {	
				this.curMailInput.addClass('notValid');
				this.curMailInput.set('value', 'e-mail введен неправильно');
				this.col += 1;			
			}
		}.bind(this));
	},
	
	check: function(e){
		this.curInput = $(e.target);
		this.curInput.removeClass('notValid');
		if(this.curInput.get('value').test('заполните поле') || this.curInput.get('value').test('e-mail введен неправильно')) this.curInput.set('value', '');
	},
	
	start: function(){
		this.col = 0;
		this.needValid();
		this.mailValid();
		
		if(this.col > 0) return false;
	}
	
});

var Carousel = new Class({
	
	initialize: function(main){
		this.main = $(main);
		if(!this.main) return false;
		
		this.block = this.main.getElement('.carousel');
		this.blockWidth = this.block.getWidth();
		this.list = this.block.getElement('ul');
		this.oneBlockWidth = this.list.getElement('li').getWidth();
		this.fx = new Fx.Scroll(this.block, {duration: 500, wait: false, wheelStops: false, transition: Fx.Transitions.Sine.easeInOut});
		this.arrows = this.main.getElements('.arrows');
		this.leftArrow = this.main.getElement('.arrows.left');
		this.rightArrow = this.main.getElement('.arrows.right');
		
		this.setBlockWidth();
        if(this.blocksWidth <= this.blockWidth) return false
        else this.startPosition();
		
        this.block.addEvent('mousewheel', this.start.bind(this));
        this.leftArrow.addEvent('mousedown', this.moveLeft.bind(this));
        this.rightArrow.addEvent('mousedown', this.moveRight.bind(this));
        this.arrows.addEvent('mouseup', this.pause.bind(this));
	},
	
	setBlockWidth: function(){
		this.blocksWidth = 0;
		
		this.block.getElements('li').each(function(element){
			this.blocksWidth = this.blocksWidth + element.getWidth();
		}.bind(this));
		this.list.setStyle('width', this.blocksWidth);
	},
	
	startPosition: function(){
		this.arrows.addClass('active');
		this.curPosition = 0;
		this.maxWidth = this.blocksWidth - this.blockWidth;
	},
	
	move: function(how){
		this.fx.start(how, 0);
	},
	
	plusPosition: function(){
        if(this.curPosition != this.maxWidth) {
        	this.curPosition += this.oneBlockWidth;
        	if(this.curPosition > this.maxWidth) this.curPosition = this.maxWidth;
        	this.move(this.curPosition);
        }
	},
	
	minusPosition: function(){
    	if(this.curPosition != 0) {
    		this.curPosition -= this.oneBlockWidth;
    		if(this.curPosition < 0) this.curPosition = 0;
        	this.move(this.curPosition);
    	}
	},
	
	moveLeft: function(){
        if(this.interval) return false;
        this.interval = this.minusPosition.periodical(600, this);
        this.minusPosition();
        return true;
	},
	
	moveRight: function(){
        if(this.interval) return false;
        this.interval = this.plusPosition.periodical(600, this);
        this.plusPosition();
        return true;
	},
	
	pause: function(){
        if(!this.interval) return false;
        this.interval = $clear(this.interval);
        return true;
	},
	
	start: function(e){
        if(e.wheel){
            if(e.wheel < 0){
            	this.plusPosition();
            } else if(e.wheel > 0){
            	this.minusPosition();
            }
        }
    	return false; 
	}
	
});

window.addEvent('domready', function(){
	
	if($$('#slideMenu li li')){
		$$('#slideMenu li li').each(function(element){
			new slideFx(element);
		});
	}
	
	if($('dillerForm')){
		new formValidator('dillerForm');
	}
	
	if($('catDetail')){
		new Carousel('catDetail');
	}
	
});