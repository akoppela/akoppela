window.addEvent('domready', function(){
	
	var x = 0, rezheight1, heightcat1, height1;
	
	fheight = function (){
		heightcat1 = $('flevel-catalog').offsetHeight;
		height1 = $('cat-list').offsetHeight;

		rezheight1 = heightcat1 - height1;	
		return rezheight1;
	}

	fheight();

	if(rezheight1 >= 0) {
		$('cat-scrollbar').setStyles({visibility: 'visible'});
	}
	
	var scroll1 = new Slider($('cat-scroll-line'), $('cat-scroller'), { 
		mode: 'vertical',
		steps: rezheight1,
		onChange: function(h){
			$('flevel-catalog').setStyles({top: -h});
		}

	 }).set(0);
	 
 	var rezheight2, heightcat2, height2;
	
	sheight = function (){
		heightcat2 = $('flevel-catalog').offsetHeight;
		height2 = $('cat-list').offsetHeight;

		rezheight2 = heightcat2 - height2;	
		return rezheight2;
	}
	
	sheight();
		
	if(rezheight2 >= 0) {
		$('cat-tree-scrollbar').setStyles({visibility: 'visible'});
	}
	
	var scroll2 = new Slider($('cat-tree-scroll-line'), $('cat-tree-scroller'), { 
		mode: 'vertical',
		steps: rezheight2,
		onChange: function(h){
			$('slevel-cat').setStyles({top: -h});
		}

	 }).set(0);
	 
	var searchslide = new Fx.Slide($('scul'), { duration: 400 });
	
	$('scul').slide('hide');
	
	
	$('search-cat-value').addEvent('click', function(){
		searchslide.cancel();
		if(x == 0) {
			$('search-cat').style.overflow = "visible";
			searchslide.slideIn();
			x = 1;
		} else {
			searchslide.slideOut().chain(function(){
				$('search-cat').style.overflow = "hidden";
				x = 0;
			});
		}
		return false;
	});
	
	var val = $('search-text').value;
	
	$('search-text').addEvent('click', function(){
		if(this.value == val) {
			this.value = '';
		}
	});
	
	$('search-text').addEvent('blur', function(){
		if(this.value == '') {
			this.value = val;
		}
	});
	
	
})