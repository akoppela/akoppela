var newsSlider = new Class({
	
	curPosition: 0,
	step: 5,
	dur: 20,
	
	initialize: function(main){
		this.main = $(main);
		if(!this.main) return false;
		
		this.arrows = this.main.getElements('.arrows');
		this.news = this.main.getElement('p');
		this.newsLength = this.news.getElement('span').getWidth();
		this.newsBlock = this.news.getParent('dd');
		this.newsBlockWidth = this.newsBlock.getWidth();
		if(this.newsLength < this.newsBlockWidth) return false
		else this.arrows.setStyle('display', 'block');
		this.maxTween = this.newsBlockWidth - this.newsLength
		this.bound = { wheel: this.wheel.bind(this) }
		this.fx = new Fx.Tween(this.news, {duration: this.dur, transition: Fx.Transitions.Linear, wait: false});
		
		this.news.setStyle('width', this.newsLength);
		
		this.arrows.addEvents({
			'mouseenter': this.start.bind(this),
			'mouseleave': this.stop.bind(this)
		});
		this.newsBlock.addEvent('mousewheel', this.start.bind(this));
	},
	
	startTimer: function(how){
		if(this.interval) return false;
		this.interval = ( function(){
			this.wheel(how); 
		}.periodical(this.dur, this));
		return true;
	},
	
	stopTimer: function(){
		if(!this.interval) return false;
		this.interval = $clear(this.interval);
		return true;
	},
	
	start: function(e){
		console.log(e);
		if(!e) return false;
		if(e.wheel){
			this.fx.options.duration = 500;
			this.step = 100;
			if(e.wheel > 0){
				this.wheel('left');
			} else if(e.wheel < 0){
				if(this.curPosition == this.maxTween) return false
				else this.wheel('right');
			}
			return false;
		} else {
			this.fx.options.duration = this.dur;
			this.step = 10;
			this.curArrow = $(e.target);
			if(this.curArrow.get('class') == 'prev arrows' && this.curPosition != 0){
				this.startTimer('left');
				this.wheel('left');
			}
			else if(this.curArrow.get('class') == 'forw arrows' && this.curPosition != this.maxTween){
				this.startTimer('right');
				this.wheel('right');
			}
		}
	},
	
	stop: function(){
		this.fx.cancel();
		this.stopTimer();
		this.curPosition = this.news.getStyle('left').toInt();
	},
	
	wheel: function(how){
		this.how = how;
		this.fx.cancel();
		if(this.how == 'left'){
			this.curPosition += this.step;
			if(this.curPosition > 0) this.curPosition = 0;
		} else if(this.how == 'right'){
			this.curPosition -= this.step;
			if(this.curPosition < this.maxTween) this.curPosition = this.maxTween;
		}
		this.fx.start('left', this.curPosition);
	}
	
});

window.addEvent('domready', function(){
	
	var lastNews = new newsSlider('last-news');
	
});