var Menu = new Class({
	
	initialize: function(menu){
		this.menu = $(menu);
		if(!this.menu) return false;
		
	}
	
})

window.addEvent('domready', function(){
	
	var Nav = new Menu('nav');
	
})