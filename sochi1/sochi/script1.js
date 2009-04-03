

	var ScrollBar = new Class({

		Implements: [Events, Options],

		options: {
			maxThumbSize: 15,
			wheel: 8,
			arrows: true,
			hScroll: true // horizontal scrollbars
		},

		initialize: function(main, content, options){
			this.setOptions(options);
			
			this.main = $(main);
			this.content = $(content);
			
			if (this.options.arrows == true){
				this.arrowOffset = 30;
			} else {
				this.arrowOffset = 0;
			}
			
			if (this.options.hScroll == true){
				this.hScrollOffset = 15;
			} else {
				this.hScrollOffset = 0;
			}				

			this.vScrollbar = new Element('div', {
    				'class': 'vScrollbar'
				}).injectAfter(this.content);				

			if (this.options.arrows == true){				
				this.arrowUp = new Element('div', {
    					'class': 'arrowUp'
					}).injectInside(this.vScrollbar);
			}	

			this.vTrack = new Element('div', {
    				'class': 'vTrack'
				}).injectInside(this.vScrollbar);
				
			this.vThumb = new Element('div', {
    				'class': 'vThumb'
				}).injectInside(this.vTrack);

			if (this.options.arrows == true){				
				this.arrowDown = new Element('div', {
    					'class': 'arrowDown'
					}).injectInside(this.vScrollbar);
			}		
			
			this.hScrollbar = new Element('div', {
    				'class': 'hScrollbar'
				}).injectAfter(this.vScrollbar);

			if (this.options.arrows == true){							
				this.arrowLeft = new Element('div', {
    					'class': 'arrowLeft'
					}).injectInside(this.hScrollbar);
			}		

			this.hTrack = new Element('div', {
    				'class': 'hTrack'
				}).injectInside(this.hScrollbar);
				
			this.hThumb = new Element('div', {
    				'class': 'hThumb'
				}).injectInside(this.hTrack);							
	
			if (this.options.arrows == true){
				this.arrowRight = new Element('div', {
    					'class': 'arrowRight'
					}).injectInside(this.hScrollbar);
			}											

			this.corner = new Element('div', {
    				'class': 'corner'
				}).injectAfter(this.hScrollbar);
			
			this.bound = {
				'vStart': this.vStart.bind(this),
				'hStart': this.hStart.bind(this),				
				'end': this.end.bind(this),
				'vDrag': this.vDrag.bind(this),
				'hDrag': this.hDrag.bind(this),				
				'wheel': this.wheel.bind(this),
				'vPage': this.vPage.bind(this),
				'hPage': this.hPage.bind(this)				
			};

			this.vPosition = {};
			this.hPosition = {};			
			this.vMouse = {};
			this.hMouse = {};			
			this.update();
			this.attach();
		},

		update: function(){
			
			this.main.setStyle('height', this.content.offsetHeight + this.hScrollOffset);
			this.vTrack.setStyle('height', this.content.offsetHeight - this.arrowOffset);
						
			this.main.setStyle('width', this.content.offsetWidth + 15);
			this.hTrack.setStyle('width', this.content.offsetWidth - this.arrowOffset);
			
			// Remove and replace vertical scrollbar			
			if (this.content.scrollHeight <= this.main.offsetHeight) {
				this.vScrollbar.setStyle('display', 'none');
				if (this.options.hScroll == true){				
					this.hTrack.setStyle('width', this.hTrack.offsetWidth + 15);
				}	
				this.content.setStyle('width', this.content.offsetWidth + 15);	
			} else {
				this.vScrollbar.setStyle('display', 'block');			
			}
			
			if (this.options.hScroll == true){			
			
				// Remove and replace horizontal scrollbar
				if (this.content.scrollWidth <= this.main.offsetWidth) {
					this.hScrollbar.setStyle('display', 'none');
					this.vTrack.setStyle('height', this.vTrack.offsetHeight + this.hScrollOffset);				
					this.content.setStyle('height', this.content.offsetHeight + this.hScrollOffset);	
				} else {
					this.hScrollbar.setStyle('display', 'block');			
				}
			
				// Remove and replace bottom right corner spacer			
				if (this.content.scrollHeight <= this.main.offsetHeight || this.content.scrollWidth <= this.main.offsetWidth) {
					this.corner.setStyle('display', 'none');				
				} else {
					this.corner.setStyle('display', 'block');			
				}		
			
				// Horizontal

				this.hContentSize = this.content.offsetWidth;
				this.hContentScrollSize = this.content.scrollWidth;
				this.hTrackSize = this.hTrack.offsetWidth;

				this.hContentRatio = this.hContentSize / this.hContentScrollSize;

				this.hThumbSize = (this.hTrackSize * this.hContentRatio).limit(this.options.maxThumbSize, this.hTrackSize);

				this.hScrollRatio = this.hContentScrollSize / this.hTrackSize;

				this.hThumb.setStyle('width', this.hThumbSize);

				this.hUpdateThumbFromContentScroll();
				this.hUpdateContentFromThumbPosition();			

			} else {
					this.hScrollbar.setStyle('display', 'none');
					this.corner.setStyle('display', 'none');										
			}
			

			// Vertical
			
			this.vContentSize = this.content.offsetHeight;
			this.vContentScrollSize = this.content.scrollHeight;
			this.vTrackSize = this.vTrack.offsetHeight;

			this.vContentRatio = this.vContentSize / this.vContentScrollSize;

			this.vThumbSize = (this.vTrackSize * this.vContentRatio).limit(this.options.maxThumbSize, this.vTrackSize);

			this.vScrollRatio = this.vContentScrollSize / this.vTrackSize;

			this.vThumb.setStyle('height', this.vThumbSize);

			this.vUpdateThumbFromContentScroll();
			this.vUpdateContentFromThumbPosition();
			
		},

		vUpdateContentFromThumbPosition: function(){
			this.content.scrollTop = this.vPosition.now * this.vScrollRatio;
		},
		
		hUpdateContentFromThumbPosition: function(){
			this.content.scrollLeft = this.hPosition.now * this.hScrollRatio;
		},		

		vUpdateThumbFromContentScroll: function(){
			this.vPosition.now = (this.content.scrollTop / this.vScrollRatio).limit(0, (this.vTrackSize - this.vThumbSize));
			this.vThumb.setStyle('top', this.vPosition.now);
		},
		
		hUpdateThumbFromContentScroll: function(){
			this.hPosition.now = (this.content.scrollLeft / this.hScrollRatio).limit(0, (this.hTrackSize - this.hThumbSize));
			this.hThumb.setStyle('left', this.hPosition.now);
		},		

		attach: function(){
			this.vThumb.addEvent('mousedown', this.bound.vStart);
			if (this.options.wheel) this.content.addEvent('mousewheel', this.bound.wheel);
			this.vTrack.addEvent('mouseup', this.bound.vPage);
			
			this.hThumb.addEvent('mousedown', this.bound.hStart);
			this.hTrack.addEvent('mouseup', this.bound.hPage);			
			
			if (this.options.arrows == true){
				this.arrowUp.addEvent('mousedown', function(event){
						this.interval = (function(event){
						this.content.scrollTop -= this.options.wheel;
						this.vUpdateThumbFromContentScroll();
					}.bind(this).periodical(40))
				}.bind(this));
			
				this.arrowUp.addEvent('mouseup', function(event){
					$clear(this.interval);
				}.bind(this));
			
				this.arrowUp.addEvent('mouseout', function(event){
					$clear(this.interval);
				}.bind(this));
						
				this.arrowDown.addEvent('mousedown', function(event){
						this.interval = (function(event){
						this.content.scrollTop += this.options.wheel;
						this.vUpdateThumbFromContentScroll();
					}.bind(this).periodical(40))
				}.bind(this));
			
				this.arrowDown.addEvent('mouseup', function(event){
					$clear(this.interval);
				}.bind(this));
			
				this.arrowDown.addEvent('mouseout', function(event){
					$clear(this.interval);
				}.bind(this));
			
				this.arrowLeft.addEvent('mousedown', function(event){
						this.interval = (function(event){
						this.content.scrollLeft -= this.options.wheel;
						this.hUpdateThumbFromContentScroll();
					}.bind(this).periodical(40))
				}.bind(this));
			
				this.arrowLeft.addEvent('mouseup', function(event){
					$clear(this.interval);
				}.bind(this));
			
				this.arrowLeft.addEvent('mouseout', function(event){
					$clear(this.interval);
				}.bind(this));
			
				this.arrowRight.addEvent('mousedown', function(event){
						this.interval = (function(event){
						this.content.scrollLeft += this.options.wheel;
						this.hUpdateThumbFromContentScroll();
					}.bind(this).periodical(40))
				}.bind(this));
			
				this.arrowRight.addEvent('mouseup', function(event){
					$clear(this.interval);
				}.bind(this));
			
				this.arrowRight.addEvent('mouseout', function(event){
					$clear(this.interval);
				}.bind(this));
			}			
						
		},
		
		wheel: function(event){
			this.content.scrollTop -= event.wheel * this.options.wheel;
			this.vUpdateThumbFromContentScroll();
			event.stop();
		},

		vPage: function(event){
			if (event.page.y > this.vThumb.getPosition().y) this.content.scrollTop += this.content.offsetHeight;
			else this.content.scrollTop -= this.content.offsetHeight;
			this.vUpdateThumbFromContentScroll();
			event.stop();
		},
		
		hPage: function(event){
			if (event.page.x > this.hThumb.getPosition().x) this.content.scrollLeft += this.content.offsetWidth;
			else this.content.scrollLeft -= this.content.offsetWidth;
			this.hUpdateThumbFromContentScroll();
			event.stop();
		},		

		vStart: function(event){
			this.vMouse.start = event.page.y;
			this.vPosition.start = this.vThumb.getStyle('top').toInt();
			document.addEvent('mousemove', this.bound.vDrag);
			document.addEvent('mouseup', this.bound.end);
			this.vThumb.addEvent('mouseup', this.bound.end);
			event.stop();
		},
		
		hStart: function(event){
			this.hMouse.start = event.page.x;		
			this.hPosition.start = this.hThumb.getStyle('left').toInt();
			document.addEvent('mousemove', this.bound.hDrag);
			document.addEvent('mouseup', this.bound.end);
			this.hThumb.addEvent('mouseup', this.bound.end);
			event.stop();
		},		

		end: function(event){
			document.removeEvent('mousemove', this.bound.vDrag);
			document.removeEvent('mousemove', this.bound.hDrag);			
			document.removeEvent('mouseup', this.bound.end);
			this.vThumb.removeEvent('mouseup', this.bound.end);
			this.hThumb.removeEvent('mouseup', this.bound.end);			
			event.stop();
		},

		vDrag: function(event){
			this.vMouse.now = event.page.y;
			this.vPosition.now = (this.vPosition.start + (this.vMouse.now - this.vMouse.start)).limit(0, (this.vTrackSize - this.vThumbSize));
			this.vUpdateContentFromThumbPosition();
			this.vUpdateThumbFromContentScroll();
			event.stop();
		},
		
		hDrag: function(event){
			this.hMouse.now = event.page.x;
			this.hPosition.now = (this.hPosition.start + (this.hMouse.now - this.hMouse.start)).limit(0, (this.hTrackSize - this.hThumbSize));
			this.hUpdateContentFromThumbPosition();
			this.hUpdateThumbFromContentScroll();
			event.stop();
		}		

	});
	
window.addEvent('domready', function(){
	
var scr = new ScrollBar('catalog', 'cat-list');
	
})

