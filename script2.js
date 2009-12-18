var SlideMenu = new Class({
	
	initialize: function(menu, sctext){
		this.menu = $(menu);
		this.sctext = $(sctext);
		
		this.menu.slide('hide');
		
		var slide = new Fx.Slide(menu);
		
		this.sctext.getParent().addEvents({
			'click': function(){
				slide.slideIn();
			}
		});
		
		this.sctext.getParent().getParent().addEvent('mouseleave', function(){
				slide.slideOut();
		});
		
		this.menu.getChildren().each(function(el){
			el.addEvent('click', function(){
				var text = el.getChildren().get('html');
				this.sctext.set('html', text);
				slide.slideOut();
			})
		});
	},
	
});

var intext = new Class({
	
	initialize: function(intext){
		intext = $$(intext);
		
		intext.each(function(elem){
			var val = elem.get('value');
			elem.addEvents({
				'click': function(){
					if(this.value == val) this.value = '';
				},
				'blur': function(){
					if(this.value == '') this.value = val;
				}
			});
		});
	}
	
});

var Scrollbar = function(scroller, scrollline, scrollblock){
		scroller = $(scroller);
		scrollline = $(scrollline);
		scrollblock = $(scrollblock);
		
		scrollheight(scrollblock, scrollblock.getParent());
		
		if(height > 0){
			var myScroll = new Slider(scrollline, scroller, { 
				mode: 'vertical',
				steps: height,
				onChange: function(h){
					scrollblock.setStyles({top: -h});
				}
			});
		} else {
			scrollline.getParent().setStyle('opacity', 0);
		}
}

var catmenu = new Class({
	
	initialize: function(titlecat, list, razv, cat, scbar){
		titlecat = $$(titlecat);
		list = $$(list);
		razv = $(razv);
		cat = $(cat);
		scbar = $(scbar);
		
		var scrollMorph = new Fx.Morph(scbar);
		var h, razvpos = 0, menupos = 0;
		
		list.each(function(name){
			name.slide('hide');
				
			titlecat.each(function(el){
				
				el.addEvent('click', function(){
					el.getNext().getFirst().set('slide', {duration: 'long', transition: 'quart:out', onComplete: function(){
						h = scrollheight(cat, cat.getParent()).toInt();
						if(h > 0){
							scrollMorph.start({
								opacity: 1
							}).chain(function(){
								Scrollbar('cat-scroller', 'cat-scroll-line', 'flevel-catalog');
							});
						} else {
							scrollMorph.start({
								opacity: 0
							});
							cat.set('morph', {duration: 'long', transition: 'back:out'});
							cat.morph({
								top: 0
							});
						}
						razvpos = 0;
					}});
					if(menupos == 0){
						el.getNext().getFirst().slide('in');
						el.getParent().set('class', 'first-level-cat active-cat');
						menupos = 1;
					} else {
						el.getNext().getFirst().slide('out');
						el.getParent().set('class', 'first-level-cat');
						menupos = 0;
					}
				});
			});
		
			razv.addEvent('click', function(){
				if(razvpos == 0) {
					name.set('slide', {duration: 'long', transition: 'quart:out', onComplete: function(){
						h = scrollheight(cat, cat.getParent()).toInt();
						if(h > 0){
							scrollMorph.start({
								opacity: 1
							}).chain(function(){
								Scrollbar('cat-scroller', 'cat-scroll-line', 'flevel-catalog');
							});
						} else {
							scrollMorph.start({
								opacity: 0
							});
							cat.set('morph', {duration: 'long', transition: 'back:out'});
							cat.morph({
								top: 0
							});
						}
						razvpos = 1;
					}});
					name.slide('in');
					titlecat.each(function(e){
						e.getParent().set('class', 'first-level-cat active-cat');
					});
				}
			});
			
		});
	}
	
});

var slideMap = new Class({
	
	initialize: function(but, map, cat){
		but = $(but);
		map = $(map);
		cat = $(cat);
		
		var catMorph = new Fx.Morph(cat);
		var mapMorph = new Fx.Morph(map);
		var butMorph = new Fx.Morph(but.getParent());
		var pos = 0;
		
		but.addEvent('click', function(){
			if(pos == 0){
				catMorph.start({
					opacity: 0
				}).chain(function(){
					mapMorph.start({
						'margin-left': 15
					}).chain(function(){
						but.setStyle('background-image', 'url(img/map_right.jpg)');
					});
				});
				butMorph.start({
					'margin-left': 0
				});
				pos = 1;
			} else {
				mapMorph.start({
					'margin-left': 372
				}).chain(function(){
					catMorph.start({
						opacity: 1
					});
					butMorph.start({
						'margin-left': -25
					}).chain(function(){
						but.setStyle('background-image', 'url(img/map_left.jpg)');
					});
				});
				pos = 0;
			}
		});
	}
});

var height;

var scrollheight = function(list, block){
	height = list.offsetHeight - block.offsetHeight;
	return height;
}

window.addEvent('domready', function(){
	var slmenu = new SlideMenu('scul', 'sc-text');
	var CatMenu = new catmenu('.first-cat h3', '.first-cat ul', 'razvcat',  'flevel-catalog', 'cat-scrollbar');
	var SliderMap = new slideMap('razvmap', 'map', 'catalog');
	Scrollbar('cat-scroller', 'cat-scroll-line', 'flevel-catalog');
});