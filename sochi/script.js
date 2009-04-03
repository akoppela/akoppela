var SearchPar = new Class({
	
	currentElement : null,
	
	initialize: function(el){
		this.el = $(el);
		if(!this.el) return;
		this.el.getElement('ul').slide('hide');
		
		this.fx = new Fx.Slide(this.el.getElement('ul'), {duration: '250'});
		this.el.getElement('div').addEvent('click', this.show.bind(this));
		this.el.getElements('li').addEvents({
			'mouseenter': this.enterMenu,
			'mouseleave': this.leaveMenu,
			'click': this.setFilter
		});
	},
	
	show: function(){
		this.fx.cancel();
		this.fx.toggle();
		return false;
	},
	
	hide: function(){
		this.fx.cancel();
		this.fx.slideOut();
		return false;
	},
	
	setFilter: function(){
		this.getParent('div').getParent().getElement('div p').set('text', this.get('text'));
		this.getParent('ul').set('slide', {duration: 250});
		this.getParent('ul').slide('out');
	},
	
	enterMenu: function(){
		this.getElement('span').setStyle('color', '#0098E6');
	},
	
	leaveMenu: function(){
		this.getElement('span').setStyle('color', '#000');
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
		
		this.LevelTwo.set('slide', {duration: 400, transition: 'quad:in'});
		if(!this.options.slidePos) {
			this.LevelTwo.slide('hide');
		} else {
			this.LevelTwo.slide('show');
		}
		this.menuHead.addEvent('click', this.toggleMenu);
	},
	
	toggleMenu: function(){
		this.getParent('li').getElement('ul').slide('toggle');
		mTop = this.getParent('li').getElement('ul').getStyle('margin-top').toInt();
		if(mTop < 0){
			this.getParent('.first-level-cat').set('class', 'first-level-cat active-cat');
		} else {
			this.getParent('.first-level-cat').set('class', 'first-level-cat');
		}
	},
	
	showAll: function(){
		this.LevelTwo.slide('in');
		this.menuHead.getParent('.first-level-cat').set('class', 'first-level-cat active-cat');
	},
	
	hideAll: function(){
		this.LevelTwo.slide('out');
		this.menuHead.getParent('.first-level-cat').set('class', 'first-level-cat');
	}
		
});

var Scrollbar = new Class({
	
	initialize: function(sbar){
		this.sbar = $(sbar);
		if(!this.sbar) return false;
		
		this.arrowUp = this.sbar.getElement('.arrowUp');
		this.arrowDown = this.sbar.getElement('.arrowDown');
		this.vThumb = this.sbar.getElement('.vThumb');
		this.vTrack = this.sbar.getElement('.vTrack');
		
		this.vThumb.addEvent('mousedown', this.vDrag.bind(this));
	},
	
	vDrag: function(event){
		
	}
	
});

window.addEvent('domready', function(){
	var slmenu = new SearchPar('search-cat');
	var searchText = new inputText('search-text');
	var ms = new mapSlide('razvmap', 'catalog');
	var catSlide = new menuSlide('flevel-catalog');
	var catScroller = new Scrollbar('cat-scrollbar');
	
	$('razvcat').addEvent('click', function(){ catSlide.showAll(); });
	
});

