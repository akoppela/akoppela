var menuSlide = new Class({
    
    initialize: function(menu){
        this.menu = $(menu);
        if(!this.menu) return false;
        
        this.secMenuTitle = this.menu.getElements('.doublelist');
        this.menu.getElements('.secnav').set('tween', {transition: 'sine:out'});
        this.menu.getElements('.secnav').set('opacity', 0);
        
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
        this.curTitleClass = this.curTitle.get('class');
        this.curTitle.set('class', this.curTitleClass+' nav-active');
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
        this.curSecMenu.tween('opacity', 1);
    },
    
    hide: function(){
        this.curTitle.set('class', this.curTitleClass);
        this.curSecMenu.tween('opacity', 0);
        this.curTitle.set('class', this.curTitleClass);
        this.menuRemoveEvents();
    },
    
    hideAll: function(){
        this.menu.getElements('.secnav').tween('opacity', 0);
        this.secMenuTitle.set('class', this.curTitleClass);
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
        this.Content.fade('out');
        this.activeLink.getNext().fade('in');
        this.main.getElements('li').set('class', '');
        this.activeLink.getParent('li').set('class', 'active-solution');
        return false;
    }
    
});

var slidePreview = new Class({
    
    titleMenuWidth: 0,
    
    initialize: function(main){
        this.main = $(main);
        if(!this.main) return false;
        
        this.titleMenu = this.main.getElement('#works-title ul');
        this.firstTitleMenu = this.titleMenu.getFirst(); 
        this.lastTitleMenu = this.titleMenu.getLast();
        this.cur = this.lastTitleMenu;
        this.arrows = this.main.getElements('.works-arrows');
        this.leftArrow = this.main.getElement('.prev-wtitle');
        this.rightArrow = this.main.getElement('.forw-wtitle');
        this.arrowWidth = 25;
        this.curPosition = this.arrowWidth;
        this.wrapWidth = this.main.getFirst('div').getWidth();
        this.fxTitleMenu = new Fx.Tween(this.titleMenu, {duration: 500, transition: Fx.Transitions.Sine.easeInOut});
        
        this.setTitleMenuWidth();
        if(this.titleMenuWidth < this.titleMenu.getParent().getWidth()) return false
        else this.main.getElement('#works-title').setStyle('overflow', 'hidden');
        
        [this.leftArrow, this.rightArrow].each(function(arrow){
            arrow.addEvents({
                'mousedown': this.start.bind(this),
                'mouseup': this.pause.bind(this)
            });
        }.bind(this));
        this.titleMenu.addEvent('mousewheel', this.start.bind(this));
        this.setStartPosition();
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
        if(e.wheel){
            if(e.wheel < 0){
                if(this.curPosition != this.wrapWidth - this.titleMenuWidth - this.arrowWidth) this.slideMenu('forw');
            } else if(e.wheel > 0){
                if(this.curPosition != this.arrowWidth) this.slideMenu('prev');
            }
            return false; 
        }
        this.curArrow = $(e.target);
        if(((this.curPosition == this.arrowWidth) && (this.curArrow.get('text') == '<')) || ((this.curPosition == this.wrapWidth - this.titleMenuWidth - this.arrowWidth) && (this.curArrow.get('text') == '>'))) return false;
        
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
    
    setTitleMenuWidth: function(){
        this.titleMenu.getElements('li').each(function(element){
            this.titleMenuWidth = this.titleMenuWidth + element.getWidth();
        }.bind(this));
        this.titleMenu.setStyle('width', this.titleMenuWidth);
    },
    
    setStartPosition: function(){
        this.arrows.setStyle('visibility', 'visible');
        this.fxTitleMenu.set('left', this.arrowWidth);
    },
    
    slideMenu: function(how){
        this.fxTitleMenu.pause();
        if(how == 'prev'){
            if(!this.cur.getNext()){
                this.stopTimer();
                return false;
            } else this.curWidth = this.cur.getWidth();
            this.curPosition += this.curWidth;
            if(this.curPosition >= this.arrowWidth){
                this.curPosition = this.arrowWidth;
                this.cur = this.lastTitleMenu;
            } else this.cur = this.cur.getNext();
        }
        else if(how == 'forw'){
            if(!this.cur.getPrevious()){
                this.stopTimer();
                return false;
            } else this.curWidth = this.cur.getWidth();
            this.curPosition -= this.curWidth;
            if(this.curPosition <= this.wrapWidth - this.titleMenuWidth - this.arrowWidth){
                this.curPosition = this.wrapWidth - this.titleMenuWidth - this.arrowWidth;
                this.cur = this.firstTitleMenu;
            } else this.cur = this.cur.getPrevious();
        }
        this.fxTitleMenu.start('left', this.curPosition);
    }
    
});

window.addEvent('domready', function(){
    
    var secnav = new menuSlide('nav');
    var solut = new changeSolution('solution');
    var works = new slidePreview('works');

    /* Флешка */
    
    if (swfobject.hasFlashPlayerVersion("10.0.0")) {<!-- указываем версию flash, на которой сделан ролик -->
        var fn = function() {
            var att = { data:"top_flash.swf", width:"990", height:"182" };<!-- указываем путь и имя flash-объекта, а так же его размеры -->
            var par = {
                menu:"true", <!-- для пользователя даем возможность управлять анимацией -->
                quality:"high", <!-- высокое качество -->
                wmode:"opaque" <!-- чтобы можно было перекрыть flash -->
            };
            var id = "topflash"; <!-- id блока, куда будет вставлен flash -->
            var myObject = swfobject.createSWF(att, par, id);
        };
        swfobject.addDomLoadEvent(fn);
    }
    
});