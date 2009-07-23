var changeTitle = new Class({
	
	initialize: function(str){
		this.str = str;
		if(!this.str) return false;
		
		this.chStr = this.str.substr(0, 1);
		this.i = 1;
		this.change.periodical(200, this);
	},
	
	change: function(){
		document.title = this.chStr;
		this.i += 1;
		if(this.chStr == this.str){
			this.chStr = '';
			this.i = 0; 
		} else {
			this.chStr = this.str.substr(0, this.i);
		}
	}
	
});

window.addEvent('domready', function(){
	
	var str = 'Тулуп, привет! =)'
	
	var tulup = new changeTitle(str);
	
});