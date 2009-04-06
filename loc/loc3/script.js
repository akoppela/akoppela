var locMenu = new Class({	
	
	curList: null,
	
	initialize: function(list, main){
		this.list = $(list);
		this.main = $(main);
		if(!this.main || !this.list) return false;
		
		this.list.getElements('li a').addEvent('click', this.changePage.bind(this));
		this.main.getElements('li').each(function(elem){
			if(elem.get('class') != 'active-text'){
				elem.slide('out');
			}
		}.bind(this));
		
	},
	
	changeList: function(){
		this.list.getElements('li a').set('class', '');
		this.curList.set('class', 'nav-active');
	},
	
	changeContent: function(){
		if(this.main.getElement('.active-text').get('id') != this.contentId){
			this.main.getElement('.active-text').set('slide', {
				duration:800,
				onComplete: function(){
					this.main.getElement('.active-text').set('class', '');
					this.main.getElement('#'+this.contentId).set('class', 'active-text');
					this.main.getElement('#'+this.contentId).set('slide', {duration: 800});
					this.main.getElement('#'+this.contentId).slide('in');
				}.bind(this)
			});
			this.changeList();
			this.main.getElement('.active-text').slide('out');
		}
	},
	
	changePage: function(e){
		this.curList = $(e.target);
		this.contentId = this.list.getElement('dt a').get('text')+'_'+this.curList.get('text')+'_content';
	
		this.changeContent();
	}
	
});

window.addEvent('domready', function(){
	var slmenu = new locMenu('sec-nav', 'content-text');
});