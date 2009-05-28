var menuSlide = new Class({
    
    initialize: function(menu){
        this.menu = $(menu);
        if(!this.menu) return false;
        
        this.secMenuTitle = this.menu.getElements('.doublelist');
        
        this.bound = {
            close: this.close.bind(this),
            stop: this.stop.bind(this)
        };
        this.secMenuTitle.addEvent('mouseenter', this.open.bind(this));
    },
    
    open: function(e){
        this.curSecMenu = $(e.target).getParent('li').getElement('.secnav');
        this.curTitle = $(e.target);
        if(this.clTimer){
            this.stop();
            this.hideAll();
        }
        this.curTitle.addClass('nav-active');
        this.curTitle.addEvent('mouseleave', this.bound.close);
        this.show();
        this.menuAddEvents();
    },
    
    close: function(){
        this.timer = (function(){
            this.hide();
            this.clTimer = false;
        }).delay(1000, this);
        this.clTimer = true;
    },
    
    show: function(){
        this.curSecMenu.fade('show');
    },
    
    hide: function(){
        this.curTitle.removeClass('nav-active');
        this.curSecMenu.fade('hide');
        this.menuRemoveEvents();
    },
    
    hideAll: function(){
        this.menu.getElements('.secnav').fade('hide');
        this.secMenuTitle.removeClass('nav-active');
        this.menuRemoveEvents();
    },
    
    stop: function(){
        $clear(this.timer);
        this.clTimer = true;
    },
    
    menuAddEvents: function(){
        this.curSecMenu.addEvents({
            'mouseenter': this.bound.stop,
            'mouseleave': this.bound.close
        });
    },
    
    menuRemoveEvents: function(){
        this.curSecMenu.removeEvents({
            'mouseenter': this.bound.stop,
            'mouseleave': this.bound.close
        });
    }

});

var changeSolution = new Class({
    
    initialize: function(main){
        this.main = $(main);
        if(!this.main) return false;
        
        this.List = this.main.getElements('li a');
        this.Content = this.main.getElements('.solution-content');
        this.activeLink = this.main.getElement('.active-solution .solution-content');
        this.cur = this.main.getElement('ul').getElement('.active-solution');
        
        this.Content.fade('hide');
        this.activeLink.fade('show');
        this.start();
        
        this.List.each(function(element){
            if(element.get('class') != 'full-list') element.addEvent('mouseenter', this.change.bind(this));
        }.bind(this));
        this.main.addEvents({
            'mouseenter': this.pause.bind(this),
            'mouseleave': this.start.bind(this)
        });
    },
    
    startTimer: function(){
        if(this.interval) return false;
        this.interval = this.step.periodical(5000, this);
        return true;
    },
    
    stopTimer: function(){
        if(!this.interval) return false;
        this.interval = $clear(this.interval);
        return true;
    },
    
    start: function(){
        this.startTimer();
        return this;
    },
    
    pause: function(){
        this.stopTimer();
        return this;
    },
    
    next: function(){
        this.cur = this.cur.getNext();
        if(!this.cur || this.cur.getElement('a').get('class') == 'full-list') this.cur = this.main.getElement('ul').getFirst();
    },
    
    step: function(){
        this.next();
        this.activeLink = this.cur.getElement('a');
        this.changeSolution();
    },
    
    change: function(e){
        this.activeLink = $(e.target);
        this.cur = this.activeLink.getParent('li');
        this.changeSolution();
    },
    
    changeSolution: function(){
        this.Content.fade('hide');
        this.activeLink.getNext().fade('show');
        this.main.getElements('li').removeClass('active-solution');
        this.activeLink.getParent('li').addClass('active-solution');
        return false;
    }
    
});

var Carousel = new Class({

	menuWidth: 0,
	
	initialize: function(main, id){
        this.main = $(main);
        this.id = id;
        if(!this.main) return false;
        
        this.menu = this.main.getElement('.carousel');
        if (this.id) this.menu = $(this.id);
       
        this.firstSlide = this.menu.getFirst(); 
        this.lastSlide = this.menu.getLast();
        this.cur = this.lastSlide;
        this.arrows = this.main.getElements('.arrows');
        this.leftArrow = this.main.getElement('.prev-arrow');
        this.rightArrow = this.main.getElement('.forw-arrow');
        this.arrowWidth = this.leftArrow.getStyle('width').toInt() + 2;
        if(this.leftArrow.get('class').test('nowidth')) this.arrowWidth = 0;
        this.curPosition = this.arrowWidth;
        this.wrapWidth = this.main.getWidth();
        this.fx = new Fx.Tween(this.menu, {duration: 500, transition: Fx.Transitions.Sine.easeInOut});
        
        this.setMenuWidth();
        if(this.menuWidth <= this.main.getWidth()) return false
        else this.setStartPosition();
        
        this.arrows.each(function(arrow){
            arrow.addEvents({
                'mousedown': this.start.bind(this),
                'mouseup': this.pause.bind(this),
        		'mouseleave': this.pause.bind(this)
            });
        }.bind(this));
        this.menu.addEvent('mousewheel', this.start.bind(this));
	},
    
    startTimer: function(){
        if(this.interval) return false;
        this.interval = this.step.periodical(500, this);
        this.step();
        return true;
    },
    
    stopTimer: function(){
        if(!this.interval) return false;
        this.interval = $clear(this.interval);
        return true;
    },
    
    start: function(e){
    	if(!this.menu.get('class').test('active')) return false;
        if(e.wheel){
            if(e.wheel < 0){
                if(this.curPosition != this.wrapWidth - this.menuWidth - this.arrowWidth) this.slideMenu('forw');
            } else if(e.wheel > 0){
                if(this.curPosition != this.arrowWidth) this.slideMenu('prev');
            }
            return false; 
        }
        this.curArrow = $(e.target);
        if(((this.curPosition == this.arrowWidth) && (this.curArrow.get('text') == '<')) || ((this.curPosition == this.wrapWidth - this.menuWidth - this.arrowWidth) && (this.curArrow.get('text') == '>'))) return false;
        
        this.startTimer();
        return this;
    },
    
    pause: function(){
        this.stopTimer();
        return this;
    },
    
    step: function(){
        if(this.curArrow.get('text') == '>') this.slideMenu('forw');
        else if(this.curArrow.get('text') == '<') this.slideMenu('prev');
    },
    
    setMenuWidth: function(){
        this.menu.getElements('li').each(function(element){
            this.menuWidth = this.menuWidth + element.getWidth();
        }.bind(this));
        this.menu.setStyle('width', this.menuWidth);
    },
    
    setStartPosition: function(){
        this.arrows.setStyle('visibility', 'visible');
        this.fx.set('left', this.arrowWidth);
        if(this.main.get('id') == 'works-title-wrapper') $('works-title').setStyle('float', 'none');
    },
    
    slideMenu: function(how){
        this.fx.pause();
        if(how == 'prev'){
            if(!this.cur.getNext() && this.curPosition == this.arrowWidth){
                this.stopTimer();
                return false;
            } else this.curWidth = this.cur.getWidth();
            this.curPosition += this.curWidth;
            if(this.curPosition >= this.arrowWidth){
                this.curPosition = this.arrowWidth;
                this.cur = this.lastSlide;
            } else this.cur = this.cur.getNext();
        }
        else if(how == 'forw'){
            if(!this.cur.getPrevious() && this.curPosition == this.wrapWidth - this.menuWidth - this.arrowWidth){
                this.stopTimer();
                return false;
            } else this.curWidth = this.cur.getWidth();
            this.curPosition -= this.curWidth;
            if(this.curPosition <= this.wrapWidth - this.menuWidth - this.arrowWidth){
                this.curPosition = this.wrapWidth - this.menuWidth - this.arrowWidth;
                this.cur = this.firstSlide;
            } else this.cur = this.cur.getPrevious();
        }
        this.fx.start('left', this.curPosition);
    }
	
});

var changeWork = new Class({

	initialize: function(title, main){
		this.title = $(title);
		this.main = $(main);
		if(!this.title || !this.main) return false;
		
		this.titles = this.title.getElements('li');
		this.previews = this.main.getElements('ul');
		this.arrows = this.main.getParent().getElements('.arrows');

		this.titles.addEvent('click', this.start.bind(this));
	},
	
	start: function(e){
		if($(e.target).getParent('li') == this.curTitle) return false;
		this.curTitle =  $(e.target).getParent('li') || $(e.target);
		this.curWork = $('p-'+this.curTitle.get('id'));
		this.changeTitle();
		this.changeWork();
		this.testArrow();
	},
	
	changeTitle: function(){
		this.titles.removeClass('active-wlink');
		this.curTitle.addClass('active-wlink');
	},
	
	changeWork: function(){
		this.previews.removeClass('active-work');
		this.curWork.addClass('active-work');
		
	},
	
	testArrow: function(){
		if(this.curWork.getWidth() <= this.main.getWidth()) this.arrows.setStyle('display', 'none')
		else this.arrows.setStyle('display', 'block');
	}
	
});

createCarouselPreview = function(name) {
	var worksPreviews = $(name).getElements('.carousel');
	
	worksPreviews.each(function(element){
		var preview = new Carousel(name, element.get('id'));
	});
	
	if($(name).getElement('.active-work').getWidth() <= $(name).getWidth()) $(name).getElements('.arrows').setStyle('display', 'none');
};

window.addEvent('domready', function(){
    
    var secnav = new menuSlide('nav');
    var solut = new changeSolution('solution');
    if($('works-title-wrapper')) {
    	var worksTitle = new Carousel('works-title-wrapper');
    	
    	createCarouselPreview('works-preview-wrapper');
		$('works-title-wrapper').setStyle('visibility', 'visible');
	}
    if($('instroy-preview')) {
    	var instroy = new Carousel('instroy-preview');
    	
		$('instroy-preview').setStyle('overflow', 'hidden');
	}
    if($('works-title')) var works = new changeWork('works-title', 'works-preview');
    
});