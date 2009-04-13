var SearchPar = new Class({
	
	initialize: function(el){
		this.el = $(el);
		if(!this.el) return false;
		this.el.getElement('ul').slide('hide');
		
		this.fx = new Fx.Slide(this.el.getElement('ul'), {duration: '250'});
		this.el.addEvents({
			'click': this.show.bind(this),
			'mouseleave': this.hide.bind(this)
		});
		this.el.getElements('li').addEvents({
			'mouseenter': this.enterMenu,
			'mouseleave': this.leaveMenu,
			'click': this.setFilter
		});
	},
	
	show: function(){
		this.fx.toggle();
	},
	
	hide: function(){
		this.fx.slideOut();
	},
	
	setFilter: function(){
		this.getParent('div').getParent().getElement('div p').set('text', this.get('text'));
		this.getParent('ul').set('slide', {duration: 250});
		this.getParent('ul').slide('out');
	},
	
	enterMenu: function(){
		this.getElement('span').setStyle('color', '#fff');
		this.setStyle('background-color', '#0093DB');
	},
	
	leaveMenu: function(){
		this.getElement('span').setStyle('color', '#000');
		this.setStyle('background-color', '#fff');
	}
});

var inputText = new Class({
	
	initialize: function(el){
		this.el = $(el);
		if(!this.el) return false;
		
		this.el.val = this.el.get('value');
		this.el.addEvents({
			'click': this.hideText.bind(this),
			'blur': this.showText.bind(this)
		});
	},
	
	hideText: function(){
		if(this.el.get('value') == this.el.val)  this.el.set('value', '');
	},
	
	showText: function(){
		if(this.el.get('value') == '')  this.el.set('value', this.el.val);
	}
	
});

var mapSlide = new Class({
	
	initialize: function(map, cat){
		this.el = $(map);
		this.map = this.el.getParent('#map');
		this.cat = $(cat);
		if(!this.el || !this.cat) return false;
		
		this.mapSlide = new Fx.Morph(this.map, { duration: 500, fps: 200 });
		this.butSlide = new Fx.Morph(this.el.getParent()), {duration: 500};
		this.catMorph = new Fx.Morph(this.cat);
		this.scrollMorph = new Fx.Morph(this.cat.getElement('.vScrollbar'));
		this.mapPos = true;
		
		this.el.addEvent('click', this.slideMap.bind(this));
	},
	
	slideMap: function(){
		if(this.mapPos){
			this.catMorph.start({
				opacity: 0
			}).chain(function(){
				this.mapSlide.start({
					'margin-left': 15
				}).chain(function(){
					this.el.set('class', 'map-left');
				}.bind(this));
			}.bind(this));
			this.cat.getElement('.vScrollbar').set('opacity', 0);
			this.butSlide.start({
				'margin-left': 0
			});
			this.mapPos = false;
		} else {
			this.mapSlide.start({
				'margin-left': 372
			}).chain(function(){
				this.catMorph.start({
					opacity: 1
				});
				this.butSlide.start({
					'margin-left': -25
				}).chain(function(){
					this.el.set('class', 'map-right');
				}.bind(this));
			}.bind(this));
			this.mapPos = true;
		}
		return false;
	}
	
});

var menuSlide = new Class({
	
	Implements: [Options],
	
	options: {
		slidePos: false
	},
		
	initialize: function(menu, options){
		this.setOptions(options);
		this.menu = $(menu);
		if(!this.menu) return false;
		
		this.menuHead = this.menu.getElements('h3');
		this.LevelTwo = this.menu.getElements('ul');
		
		this.LevelTwo.set('slide', {duration: 800, transition: 'sine:out'});
		if(!this.options.slidePos) {
			this.LevelTwo.slide('hide');
			this.menuHead.set('class', 'close');
			this.timer = false;
		} else {
			this.LevelTwo.slide('show');
			this.menuHead.getParent('.first-level-cat').set('class', 'first-level-cat active-cat');
			this.menuHead.set('class', 'open');
			this.timer = true;
		}
		this.menuHead.addEvent('click', this.toggleMenu.bind(this));
	},
	
	getPos: function(){
		this.mTop = this.curHead.getParent('li').getElement('ul').getStyle('margin-top').toInt();
		if(this.timer) this.mTop = -this.mTop;
	},
	
	toggleMenu: function(e){
		this.curHead = $(e.target);
		this.curHead.getParent('li').getElement('ul').slide('toggle');
		if(this.curHead.get('class') == 'open'){
			this.timer = true;
		} else {
			this.timer = false;
		}
		this.getPos();
		if(this.mTop < 0){
			this.curHead.getParent('.first-level-cat').set('class', 'first-level-cat active-cat');
			this.curHead.set('class', 'open');
		} else {
			this.curHead.getParent('.first-level-cat').set('class', 'first-level-cat');
			this.curHead.set('class', 'close');
		}
	},
	
	showAll: function(){
		this.LevelTwo.slide('in');
		this.menuHead.getParent('.first-level-cat').set('class', 'first-level-cat active-cat');
		this.menuHead.set('class', 'open');
	},
	
	hideAll: function(){
		this.LevelTwo.slide('out');
		this.menuHead.getParent('.first-level-cat').set('class', 'first-level-cat');
		this.menuHead.set('class', 'close');
	}
		
});

var Scrollbar = new Class({
	
	Implements: [Options],
	
	options: {
		vDur: 2000
	},
	
	initialize: function(sbar, main, options){
		this.setOptions(options)
		
		this.sbar = $(sbar);
		this.main = $(main);
		if(!this.sbar || !this.main) return false;
		
		this.arrowUp = this.sbar.getElement('.arrowUp');
		this.arrowDown = this.sbar.getElement('.arrowDown');
		this.vThumb = this.sbar.getElement('.vThumb');
		this.vTrack = this.sbar.getElement('.vTrack');
		
		this.hsteps = this.main.getParent('.moocontent').getHeight() - this.main.getHeight();
		this.steps = this.hsteps;
		this.vTrackLine = this.vTrack.getHeight() - this.vThumb.getHeight();
		
		this.fxscroll = new Slider(this.vTrack, this.vThumb, {
				mode: 'vertical',
				steps: this.hsteps,
				onChange: function(h){
					this.textPause();
					this.main.setStyles({top: h * this.hsteps / this.steps });
					return false;
				}.bind(this)
		});
		
		this.arrowUp.addEvents({
			'mousedown': this.textUp.bind(this),
			'mouseup': this.textPause.bind(this)
		});
		this.arrowDown.addEvents({
			'mousedown': this.textDown.bind(this),
			'mouseup': this.textPause.bind(this)
		});
		
		this.sbar.set('morph', {duration: 500});
		this.vThumb.set('morph', {duration: this.options.vDur});
		this.main.set('morph', {duration: this.options.vDur});
		this.main.getParent('.moocontent').addEvent('mousewheel', this.textWheel.bind(this));
		this.main.addEvent('click', this.updatePos.bind(this));
		this.vThumb.setStyle('top', 0);
		this.main.setStyle('top', 0);
		this.allHeight = this.main.getHeight();
		this.getH();
		this.scrollOp();
	},
	
	textUp: function(){
		this.dur('up');
		this.main.morph({
			top: 0
		});
		this.vThumb.morph({
			top: 0
		});
		return false;
	},
	
	textDown: function(){
		this.dur('down');
		this.main.morph({
			top: this.hsteps
		});
		this.vThumb.morph({
			top: this.vTrack.getHeight() - this.vThumb.getHeight()
		});
		return false;
	},
	
	textPause: function(){
		this.dur('pause');
		return false;
	},
	
	getPos: function(){
		this.scrollerpos = this.vThumb.getStyle('top').toInt();
		this.blockpos = this.main.getStyle('top').toInt();
		return false;
	},
		
	dur: function(pos){
		this.getPos();
		if(pos == 'up'){
			this.durat = this.scrollerpos * this.options.vDur / this.vTrackLine;
			if(this.durat == 0) this.durat = this.options.vDur;
			this.stepScroll = this.scrollerpos + 20 * this.vTrackLine / this.hsteps;
			this.stepMain = this.blockpos + 20;
			if(this.stepScroll < 0) this.stepScroll = 0;
			if(this.stepMain > 0) this.stepMain = 0;
		} else if(pos == 'down'){
			this.durat = this.options.vDur - this.scrollerpos * this.options.vDur / this.vTrackLine;
			if(this.durat == 0) this.durat = this.options.vDur;
			this.stepScroll = this.scrollerpos - 20 * this.vTrackLine / this.hsteps;
			this.stepMain = this.blockpos - 20;
			if(this.stepScroll > this.vTrackLine) this.stepScroll = this.vTrackLine;
			if(this.stepMain < this.hsteps) this.stepMain = this.hsteps;
		} else if(pos == 'pause') {
			this.durat = 0;
		}
		this.vThumb.set('morph', {duration: this.durat});
		this.main.set('morph', {duration: this.durat});
		return false;
	}, 
	
	textWheel: function(e){
		if(this.hsteps < 0){
			if(e.wheel > 0) {
				this.dur('up');
				this.main.setStyle('top', this.stepMain);
				this.vThumb.setStyle('top', this.stepScroll);
			} else if(e.wheel < 0) {
				this.dur('down');
				this.main.setStyle('top', this.stepMain);
				this.vThumb.setStyle('top', this.stepScroll);
			}
		} 
		return false;
	},
	
	scrollOp: function(){
		if(this.hsteps > 0){
			this.sbar.morph({
				opacity: 0
			});
		} else {
			this.sbar.morph({
				opacity: 1
			});
		}
	},
	
	updatePos: function(e){
		this.targ = $(e.target);
		if(this.targ.get('tag') == 'h3'){
			this.ulHeight = this.targ.getParent().getElement('ul').getHeight();
			if(this.targ.get('class') == 'close') this.ulHeight = -this.ulHeight;
			this.curHeight = this.main.getParent('.moocontent').getHeight() - this.main.getHeight() - this.ulHeight;
		} else return false;
		if(this.curHeight != this.hsteps) {
			this.hsteps = this.curHeight;
			this.setPos();
		}
		this.scrollOp();
	},
	
	setPos: function(){
		this.vThumb.set('morph', {duration: 1000});
		this.main.set('morph', {duration: 1000});
		
		if(Math.abs(this.main.getStyle('top').toInt()) < Math.abs(this.ulHeight) && this.targ.get('class') == 'close'){
			this.main.morph({
				top: 0 
			});
			this.vThumb.morph({
				top: 0
			});
		} else if(this.main.getStyle('top').toInt() < 0){
			this.main.morph({
				top: this.main.getStyle('top').toInt() - this.ulHeight 
			});
			this.vThumb.morph({
				top: ( this.main.getStyle('top').toInt() - this.ulHeight ) * this.vTrackLine / this.hsteps
			});
		}
	},
	
	updateAllPos: function(){
		this.getH();
		this.hsteps = this.main.getParent('.moocontent').getHeight() - this.allHeight;
		this.scrollOp();
		this.setAllPos();
	},
	
	setAllPos: function(){
		this.vThumb.set('morph', {duration: 1000});
		this.main.set('morph', {duration: 1000});
		
		if(this.main.getStyle('top').toInt() < 0){
			this.vThumb.morph({
				top: this.main.getStyle('top').toInt() * this.vTrackLine / this.hsteps
			});
		}
	},
	
	getH: function(){
		this.main.getElements('h3.close').each(function(name){
			this.allHeight = this.allHeight + name.getNext().getElement('ul').getHeight();
		}.bind(this));
	}
	
});

var Help = new Class({
	
	initialize: function(elem, Link){
		this.elem = $(elem);
		this.Link = $(Link);
		this.close = this.elem.getElement('.close');
		if(!this.elem) return false;
		
		this.fx = new Fx.Morph(this.elem, {duration: 600});
		
		this.Link.addEvent('click', this.show.bind(this));
		this.close.addEvent('click', this.hide.bind(this));
		this.elem.setStyle('display', 'none');
		this.fx.set({
			opacity: 0
		});
	},
	
	show: function(){
		this.elem.setStyle('display', 'block');
		this.fx.start({
			opacity: 1
		});
	},
	
	hide: function(){
		this.fx.start({
			opacity: 0
		}).chain(function(){
			this.elem.setStyle('display', 'none');
		}.bind(this));
	}
	
});

var changeZindex = new Class({
	
	initialize: function(menu){
		this.menu = $$(menu);
		if(!this.menu) return false;
		
		this.curZind = 100000;
		
		this.menu.getElements('li span').each(function(name){
			name.addEvent('click', this.setZindex.bind(this));
		}.bind(this));
		
		this.window = this.menu.getParent('div').getElements('.head-window');
		
		this.window.each(function(name){
			name.addEvent('click', this.setWindZindex.bind(this));
		}.bind(this));
	},
	
	setZindex: function(e){
		this.curEl = $(e.target);
		this.getZindex();
		if(this.Zind < this.curZind - 1){
			this.wind.setStyle('z-index', this.curZind);
			this.curZind++;
		}
	}, 
	
	getZindex: function(){
		this.windClass = this.curEl.get('class');
		this.wind = this.menu.getParent('div').getElement('div.'+this.windClass);
		
		this.Zind = this.wind.getStyle('z-index');
		return this.Zind;
	}, 
	
	setWindZindex: function(e){
		this.curEl = $(e.target).getParent('.head-window');
		if(!this.curEl) this.curEl = $(e.target);
		this.Zind = this.curEl.getStyle('z-index');
		if(this.Zind < this.curZind - 1){
			this.curEl.setStyle('z-index', this.curZind);
			this.curZind++;
		}
	}
	
});

var clearInput = new Class({
	
	initialize: function(ar){
		this.ar = $$(ar);
		if(!this.ar) return false;
		
		this.ar.addEvent('click', this.clearIn.bind(this));
	},
	
	clearIn: function(e){
		this.cur = $(e.target);
		this.cur.getParent('form').getElements('input').set('value', '');
	}
	
});

var FormValid = new Class({
	
	Implements: [Options],
	
	options: {
		rule: 'login'
	},
	
	initialize: function(elem, options){
		this.setOptions(options);
		this.elem = $(elem);
		if(!this.elem) return false;
		
		this.pass = this.elem.getParent('.valid-form').getElement('.valid-pass');
		this.repPass = this.elem.getParent('.valid-form').getElement('.valid-reppass');
		this.fx = new Fx.Morph(this.elem);
		
		this.elem.addEvent('keyup', this.start.bind(this));
	},
	
	start: function(){
		if(this.options.rule == 'password') {
			this.passwordValid();
		} else if(this.options.rule == 'reppass'){
			this.repPassValid();
			this.pass.addEvent('keyup', this.repPassValid.bind(this));
		} else if(this.options.rule == 'login'){
			this.loginValid();
		} else if(this.options.rule == 'email'){
			this.emailValid();
		}
	},
	
	noVal: function(){
		this.fx.cancel();
		this.fx.start({
			'border-width': '2px',
			'border-color': '#EF1D25',
			'border-style': 'solid',
			margin: '0 13px 7px 0'
		});
		return false;
	}, 
	
	Val: function(){
		this.fx.cancel();
		this.fx.start({
			'border-width': '2px',
			'border-color': '#2EEF00',
			'border-style': 'solid',
			margin: '0 13px 7px 0'
		}).chain(function(){
			this.fx.start({
				'border-width': '0px',
				'border-color': '#fff',
				margin: '2px 15px 9px 2px'
			});
		}.bind(this));
		return false;
	},
	
	repPassValid: function(){
		this.getPassValue();
		if(this.fpass == '' || this.sPass == ''){
			this.noVal();
		} else if(this.fPass == this.sPass){
			this.Val();
		} else {
			this.noVal();
		}
	},
	
	getPassValue: function(){
		this.fPass = this.pass.get('value');
		this.sPass = this.repPass.get('value');
	},
	
	loginValid: function(e){
		if(/^([\-0-9a-zA-Z_]+)$/.test(this.elem.get('value'))){
			this.Val();
		} else {
			this.noVal();
		}
	},
	
	passwordValid: function(){
		if(/^([\-0-9a-zA-Z_]{6,})$/.test(this.elem.get('value'))){
			this.Val();
		} else {
			this.noVal();
		}
	},
	
	emailValid: function(){
		if (/^([\-0-9A-Za-z_]+)@([\-0-9a-z_^.]+\.[a-z]{2,4})$/.test(this.elem.get('value'))) {
			this.Val();
		} else {
			this.noVal();
		}
	}
	
});

window.addEvent('domready', function(){
	var slmenu = new SearchPar('search-cat');
	var searchText = new inputText('search-text');
	var ms = new mapSlide('razvmap', 'catalog');
	var catSlide = new menuSlide('flevel-catalog');
	var catScroller = new Scrollbar('cat-scrollbar', 'flevel-catalog');
	var cat2Scroller = new Scrollbar('cat-tree-scrollbar', 'slevel-cat');
	var helpScroller = new Scrollbar('help-scrollbar', 'help-content');
	var heplmenu = new Help('help', 'help-link');
	var ukoz = new Help('ukoz', 'karta');
	var signinwindow = new Help('signin', 'signin-link');
	var signupwindow = new Help('signup', 'signup-link');
	var chngwind = new changeZindex('.hnav');
	var signinInp = new clearInput('.clearinput');
	var repPassVal = new FormValid('reppwd', {rule: 'reppass'});
	var passVal = new FormValid('pwd', {rule: 'password'});
	var logVal = new FormValid('login', {rule: 'login'});
	var mailVal = new FormValid('email', {rule: 'email'});
	
	$('razvcat').addEvent('click', function(){ 
		catSlide.showAll(); 
		catScroller.updateAllPos();
	});
	
});