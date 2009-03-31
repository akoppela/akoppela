window.addEvent('domready', function(){
	
	var slide1 = new Fx.Slide($('cat1'));
	var slide2 = new Fx.Slide($('cat2'));
	var slide3 = new Fx.Slide($('cat3'));
	var slide4 = new Fx.Slide($('cat4'));
	var slide5 = new Fx.Slide($('cat5'));
	
	$('cat1').slide('hide');
	$('cat2').slide('hide');
	$('cat3').slide('hide');
	$('cat4').slide('hide');
	$('cat5').slide('hide');
	
	var x = 0, rezheight1, heightcat1, height1;
	
	fheight = function (){
		heightcat1 = $('flevel-catalog').offsetHeight;
		height1 = $('cat-list').offsetHeight;

		rezheight1 = heightcat1 - height1;	
		return rezheight1;
	}
	
	scrollbar = function(){
		if(rezheight1 >= 0) {
			$('cat-scrollbar').setStyles({visibility: 'visible'});
		} else {
			$('cat-scrollbar').setStyles({visibility: 'hidden'});
		}
	};
	
	catscroller = function () {
		var scroll1 = new Slider($('cat-scroll-line'), $('cat-scroller'), { 
			mode: 'vertical',
			steps: rezheight1,
			onChange: function(h){
				$('flevel-catalog').setStyles({top: -h});
			}
		}).set(0);
	};

	fheight();
	scrollbar();
	
	$('catzag1').addEvent('click', function(){
		slide2.slideOut();
		slide3.slideOut();
		slide4.slideOut();
		slide5.slideOut();
		slide1.slideIn();
		setTimeout("fheight()", 1000);
		setTimeout("scrollbar()", 1000);
		setTimeout("catscroller()", 1005);
	});
	
	$('catzag2').addEvent('click', function(){
		slide1.slideOut();
		slide3.slideOut();
		slide4.slideOut();
		slide5.slideOut();
		slide2.slideIn();
		setTimeout("fheight()", 1000);
		setTimeout("scrollbar()", 1000);
		setTimeout("catscroller()", 1005);
	});
	
	$('catzag3').addEvent('click', function(){
		slide2.slideOut();
		slide1.slideOut();
		slide4.slideOut();
		slide5.slideOut();
		slide3.slideIn();
		setTimeout("fheight()", 1000);
		setTimeout("scrollbar()", 1000);
		setTimeout("catscroller()", 1005);
	});
	
	$('catzag4').addEvent('click', function(){
		slide2.slideOut();
		slide3.slideOut();
		slide1.slideOut();
		slide5.slideOut();
		slide4.slideIn();
		fheight();
		setTimeout("fheight()", 1000);
		setTimeout("scrollbar()", 1000);
		setTimeout("catscroller()", 1005);
	});
	
	$('catzag5').addEvent('click', function(){
		slide2.slideOut();
		slide3.slideOut();
		slide4.slideOut();
		slide1.slideOut();
		slide5.slideIn();
		setTimeout("fheight()", 1000);
		setTimeout("scrollbar()", 1000);
		setTimeout("catscroller()", 1005);
	});
	
	$('razvcat').addEvent('click', function(){
		slide1.slideIn();
		slide2.slideIn();
		slide3.slideIn();
		slide4.slideIn();
		slide5.slideIn();
		setTimeout("fheight()", 1000);
		setTimeout("scrollbar()", 1000);
		setTimeout("catscroller()", 1005);
	});
	 
 	var rezheight2, heightcat2, height2;
	
	sheight = function (){
		heightcat2 = $('slevel-cat').offsetHeight;
		height2 = $('soder-cat-wrapper').offsetHeight;

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
	
	var catpos = 0;
	var catdvig = new Fx.Morph($('map'));

	$('razvmap').addEvent('click', function(){
		if(catpos == 0) {
			$('catalog').setStyles({
				'display': 'none'
			});
			catdvig.start({ 'margin-left': 30 });
			catpos = 1;
		} else {
			catdvig.start({ 'margin-left': 380 }).chain(function(){
				$('catalog').setStyles({
					'display': 'block'
				});
				catpos = 0;	
			});
		}
	});
	
})