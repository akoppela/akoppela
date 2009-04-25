var newsSlider = new Class({
	
	curPosition: 0,
	step: 50,
	dur: 600,
	
	initialize: function(main){
		this.main = $(main);
		if(!this.main) return false;
		
		this.arrows = this.main.getElements('.arrows');
		this.news = this.main.getElement('p');
		this.newsLength = this.news.getElement('span').getWidth();
		this.newsBlock = this.news.getParent('dd');
		this.newsBlockWidth = this.newsBlock.getWidth();
		if(this.newsBlockWidth >= this.newsLength) return false
		else this.arrows.setStyle('display', 'block');
		this.dur = this.dur * this.newsLength / this.newsBlockWidth;
		this.maxTween = this.newsBlockWidth - this.newsLength
		this.fx = new Fx.Tween(this.news, {duration: this.dur, transition: Fx.Transitions.Linear});
		
		this.news.setStyle('width', this.newsLength);
		
		this.arrows.addEvents({
			'mousedown': this.start.bind(this),
			'mouseup': this.stop.bind(this)
		});
		this.newsBlock.addEvent('mousewheel', this.start.bind(this));
	},
	
	start: function(e){
		if(e.wheel){
			if(e.wheel > 0){
				if(this.curPosition == 0) return false
				else {
					this.fx.cancel();
					this.wheel('left');
				}
			} else if(e.wheel < 0){
				if(this.curPosition == this.maxTween) return false
				else {
					this.fx.cancel();
					this.wheel('right');
				}
			}
			return false;
		}
		this.curArrow = $(e.target);
		if(this.curArrow.get('class') == 'prev arrows'){
			this.fx.cancel();
			this.prev();
		}
		else if(this.curArrow.get('class') == 'forw arrows'){
			this.fx.cancel();
			this.forw();
		}
	},
	
	stop: function(){
		this.fx.cancel();
		this.curPosition = this.news.getStyle('left').toInt();
	},
	
	prev: function(){
		this.fx.start('left', 0);
	},
	
	forw: function(){
		this.fx.start('left', this.maxTween);
	},
	
	wheel: function(how){
		if(how == 'left'){
			this.curPosition += this.step;
			if(this.curPosition > 0) this.curPosition = 0;
		} else if(how == 'right'){
			this.curPosition -= this.step;
			if(this.curPosition < this.maxTween) this.curPosition = this.maxTween;
		}
		this.fx.start('left', this.curPosition);
	}
	
});

window.addEvent('domready', function(){
	
	var lastNews = new newsSlider('last-news');
	
});