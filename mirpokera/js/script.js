var popUp = new Class({
	
	initialize: function(main, options){
		this.main = $(main);
		if(!this.main) return
		
		this.heightFx = this.main.hasClass('withoutHeight') ? false : true;
		this.main.addClass('active');
		this.popUpBox = this.main.getElement('ul');
		this.arrow = this.main.getElement('.clickarea');
		this.fxDuration = this.heightFx ? 250 : 0;
		this.fx = new Fx.Tween(this.main, { duration: this.fxDuration, wait: false });
		this.fadeFx = new Fx.Tween(this.popUpBox, { duration:300, wait: false });
		this.startPosition();
		
		this.main.addEvents({
			'mouseleave': this.startTimer.bind(this),
			'mouseenter': this.stopTimer.bind(this)
		});
		this.arrow.addEvent('click', this.click.bind(this));
	},
	
	startPosition: function(){
		this.currentHeight = this.main.getHeight();
		this.popUpHeight = this.popUpBox.getHeight();
		this.fadeFx.set('opacity', 0);
	},	

	startTimer: function(){
		if(this.interval) return false;
		this.interval = this.hidePopUp.delay(800, this);
		return true;
	},

	stopTimer: function(){
		if(!this.interval) return false;
		this.interval = $clear(this.interval);
		return true;
	},

	showPopUp: function(){
		this.fx.start('height', this.currentHeight + this.popUpHeight).chain(function(){
			this.fadeFx.start('opacity', 1).chain(function(){ this.main.addClass('opened'); this.busy = false; }.bind(this));
		}.bind(this));
	},

	hidePopUp: function(){
		this.fadeFx.start('opacity', 0).chain(function(){
			this.fx.start('height', this.currentHeight).chain(function(){ this.main.removeClass('opened'); this.busy = false; }.bind(this));
		}.bind(this));
	},
	
	click: function(){
		if(!this.busy){
			this.busy = true;
			this.main.hasClass('opened') ? this.hidePopUp() : this.showPopUp();
		}
		return false;
	}
	
});

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

var Slider = new Class({
	
	initialize: function(main){
		this.main = $(main);
		if(!this.main) return
		
		this.scrollBox = this.main.getElement('.slider');
		this.scrollBoxWidth = this.scrollBox.getWidth();
		this.bannersBox = this.main.getElement('ul');
		this.banners = this.bannersBox.getElements('li');
		if(this.testWidth()){
			this.firstBanner = this.bannersBox.getFirst('li');
			this.lastBanner = this.bannersBox.getLast('li');
			this.fx = new Fx.Scroll(this.scrollBox, { duration:600, wait: false, wheelStops: false, transition: Fx.Transitions.Sine.easeInOut });
			this.startPosition();
		
			this.scrollBox.addEvents({
				'mousewheel': this.start.bind(this),
				'mouseenter': this.stopTimer.bind(this),
				'mouseleave': this.startTimer.bind(this)
			});
		}
	},
	
	testWidth: function(){
		this.bannersWidth = 0;
		this.banners.each(function(element){
			this.bannersWidth += element.getWidth();
		}.bind(this));
		this.maxWidth = this.bannersWidth - this.scrollBoxWidth;
		if(this.maxWidth <= 0) return false
		else return true;
	},

	startPosition: function(){
		this.bannersBox.addClass('active');
		this.bannersBox.fade('hide');
		this.bannersBox.set('tween', { duration: 1000 });
		this.bannersBox.setStyle('width', this.bannersWidth);
		this.currentBanner = this.firstBanner;
		this.currentPosition = 0;
		this.setCirc();
		this.startTimer();
	},

	setCirc: function(){
		this.circBannersLeft = [];
		this.circBannersRight = [this.lastBanner];
		this.circBannersLeftWidth = 0;
		this.circBannersRightWidth = this.lastBanner.getWidth();
		this.circtLeft = this.firstBanner;
		while(this.circBannersLeftWidth < this.scrollBoxWidth){
			this.circBannersLeftWidth += this.circtLeft.getWidth();
			this.circBannersLeft.push(this.circtLeft);
			this.circtLeft = this.circtLeft.getNext('li');
		}
		this.setCicrPosition();
		this.createCircBanners();
	},

	setCicrPosition: function(){
		this.newBannersWidth = this.bannersWidth + this.circBannersLeftWidth + this.circBannersRightWidth;
		this.bannersBox.setStyle('width', this.newBannersWidth);
		this.fx.set(this.circBannersRightWidth, 0);
		this.currentPosition = this.circBannersRightWidth;
		this.circWidth = this.bannersWidth + this.circBannersRightWidth;
		this.bannersBox.tween('opacity', 1);
	},
	
	createCircBanners: function(){
		this.circBannersLeft.each(function(element){
			elementClass =  'circ ' + element.get('class');
			elementId = element.get('id');
			elementLink = element.getElement('a');
			elementHref = elementLink.get('href');
			elementTitle = elementLink.get('title');
			elementImg = element.getElement('img');
			elementSrc = elementImg.get('src');
			elementAlt = elementImg.get('alt');
			this.circBannerLeft = new Element('li', { 'class': elementClass, 'id': elementId }).inject(this.bannersBox);
			this.circBannerLeftLink = new Element('a', { 'href': elementHref, 'title': elementTitle }).inject(this.circBannerLeft);
			new Element('img', { 'src': elementSrc, 'alt': elementAlt }).inject(this.circBannerLeftLink);
			new Element('b').inject(this.circBannerLeftLink);
		}.bind(this));
		this.circBannersRight.each(function(element){
			elementClass =  'circ ' + element.get('class');
			elementId = element.get('id');
			elementLink = element.getElement('a');
			elementHref = elementLink.get('href');
			elementTitle = elementLink.get('title');
			elementImg = element.getElement('img');
			elementSrc = elementImg.get('src');
			elementAlt = elementImg.get('alt');
			this.circBannerRight = new Element('li', { 'class': elementClass, 'id': elementId }).inject(this.firstBanner, 'before');
			this.circBannerRightLink = new Element('a', { 'href': elementHref, 'title': elementTitle }).inject(this.circBannerRight);
			new Element('img', { 'src': elementSrc, 'alt': elementAlt }).inject(this.circBannerRightLink);
			new Element('b').inject(this.circBannerRightLink);
		}.bind(this));
	},

	startTimer: function(){
		if(this.interval) return false;
		this.interval = this.moveRight.periodical(3000, this);
		return true;
	},

	stopTimer: function(){
		if(!this.interval) return false;
		this.interval = $clear(this.interval);
		return true;
	},
	
	move: function(set, left){
		this.fx.start(this.currentPosition, 0).chain(function(){
			if(set && !left){
				this.fx.set(this.circBannersRightWidth, 0);
				this.currentPosition = this.circBannersRightWidth;
			} else if(set && left){
				this.fx.set(this.circWidth - this.circBannersRightWidth, 0);
				this.currentPosition = this.circWidth - this.circBannersRightWidth;
			}
			this.busy = false;
		}.bind(this));
	},
	
	moveLeft: function(){
		this.currentPosition -= this.currentBanner.getPrevious('li').getWidth();
   	if(this.currentPosition == 0){
			this.currentBanner = this.lastBanner;
			this.move(true, true);
		} else {
			this.currentBanner = $pick(this.currentBanner.getPrevious('li'), this.lastBanner);
			this.move();
		}
	},
	
	moveRight: function(){
		this.currentPosition += this.currentBanner.getWidth();
   	if(this.currentPosition == this.circWidth){
			this.currentBanner = this.firstBanner;
			this.move(true, false);
		} else {
			this.currentBanner = $pick(this.currentBanner.getNext('li'), this.firstBanner);
			this.move();
		}
	},
	
	start: function(e){
		if(!this.busy){
			this.busy = true;
			e.wheel < 0 ? this.moveRight() : this.moveLeft();
		}	
		return false;
	}
	
});

var Tabs = new Class({
	
	initialize: function(main){
		this.main = $(main);
		if(!this.main) return
		
		this.titles = this.main.getElements('dt');
		this.activeTitle = this.main.getElement('dt.active');
		this.activeContent = this.main.getElement('dd.active');
		
		this.titles.addEvent('click', this.click.bind(this));
	},
	
	click: function(e){
		this.currentTitle = $(e.target).getParent('dt') || $(e.target);
		if(this.currentTitle != this.activeTitle) {
			this.currentContent = this.currentTitle.getNext('dd');
			this.changeTabs();
		}
		
		return false;
	},
	
	changeTabs: function(){
		if(this.activeTitle){ [this.activeTitle, this.activeContent].each(function(element){ element.removeClass('active'); }); }
		[this.currentContent, this.currentTitle].each(function(element){ element.addClass('active'); });
		this.activeTitle = this.currentTitle;
		this.activeContent = this.currentContent;
	}
	
});

window.addEvent('domready', function(){
	
	$$('.popup').each(function(element){ new popUp(element); });
	$$('input[default], textarea[default]').each(function(element){
		element.get('type') != 'password' ? new Input(element) : new Input.Password(element);
	});
	new Slider('bannerSlider');
	
	$$('.tabs').each(function(element){ new Tabs(element); });
	
});