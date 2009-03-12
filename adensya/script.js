window.addEvent('domready', function(){
    
    //Выбор итема поиска
        
    var searchbgnone = function() {
        $$('#search-box li').each(function(name){
            $(name).style.background = '';
            $(name).style.color = '#fff';
            $(name).style.textDecoration = 'underline';
        });
    }
    
    var searchbg = function(obj) {
        $(obj).style.background = '#fff';
		$(obj).style.color = '#000';
		$(obj).style.textDecoration = 'none';
    }
    
    var searchbgstart = function(obj) {
		searchbgnone();
		searchbg(obj);
    }
    
    //Выпадающие меню
    
    var menubgnone = function(obj, ctl, ctr) {
        $(obj).style.background = '#fff';
        $(ctl).style.color = '#fff';
        $(ctr).style.color = '#fff';
    }
    
    var menubg = function(obj, ctl, ctr) {
        $(obj).style.background = '#C32300';
        $(ctl).style.color = '#C32300';
        $(ctr).style.color = '#C32300';
    }
    
    var menubgover = function(slideitem, obj1, obj2, obj3, ctl, ctr) {
        $(obj2).style.color = '#fff';
        $(obj2).style.background = 'url(images/arr_menu_a.gif) no-repeat left center';
        $(obj3).style.display = 'block';
		slideitem.cancel();
		menubg(obj1, ctl, ctr);
		slideitem.slideIn();
    }
    
    var menubgout = function(slideitem, obj1, obj2, obj3, ctl, ctr) {
		slideitem.cancel();
		slideitem.slideOut().chain(function(){
    	    menubgnone(obj1, ctl, ctr);
    	    $(obj2).style.color = '#000';
            $(obj2).style.background = 'url(images/arr_menu.gif) no-repeat left center';
            $(obj3).style.display = 'none';
        });
	    
    }
        
    var slideMenu1 = new Fx.Slide($('submenu1')); 
    var slideMenu2 = new Fx.Slide($('submenu2')); 
    var slideMenu3 = new Fx.Slide($('submenu3')); 
    var slideMenu4 = new Fx.Slide($('submenu4')); 
    var slideMenu5 = new Fx.Slide($('submenu5'));
    
    //Выбор search итема
    
    searchbg('all');
    
    $$('#search-box li').addEvent('click', function(e){
        searchbgstart(this);
        return false;
    });
   
    //Выпадающие меню
    
    $$('.submenu').slide('hide');
            
    $('users').addEvent('mouseenter', function(e){
		menubgover(slideMenu1, 'users_li', 'users', 'rm1', 'sub1_ctl', 'sub1_ctr');
        return false;
    });

    $('users_li').addEvent('mouseleave', function(e){
		menubgout(slideMenu1, 'users_li', 'users', 'rm1', 'sub1_ctl', 'sub1_ctr');
        return false;
    });
    
    $('what_dress').addEvent('mouseenter', function(e){
		menubgover(slideMenu2, 'what_dress_li', 'what_dress', 'rm2', 'sub2_ctl', 'sub2_ctr');
        return false;
    });
    
    $('what_dress_li').addEvent('mouseleave', function(e){
		menubgout(slideMenu2, 'what_dress_li', 'what_dress', 'rm2', 'sub2_ctl', 'sub2_ctr');
        return false;
    });
    
    $('kuda_dress').addEvent('mouseenter', function(e){
		menubgover(slideMenu3, 'kuda_dress_li', 'kuda_dress', 'rm3', 'sub3_ctl', 'sub3_ctr');
        return false;
    });
    
    $('kuda_dress_li').addEvent('mouseleave', function(e){
		menubgout(slideMenu3, 'kuda_dress_li', 'kuda_dress', 'rm3', 'sub3_ctl', 'sub3_ctr');
        return false;
    });
    
    $('how_dress').addEvent('mouseenter', function(e){
		menubgover(slideMenu4, 'how_dress_li', 'how_dress', 'rm4', 'sub4_ctl', 'sub4_ctr');
        return false;
    });
    
    $('how_dress_li').addEvent('mouseleave', function(e){
		menubgout(slideMenu4, 'how_dress_li', 'how_dress', 'rm4', 'sub4_ctl', 'sub4_ctr');
        return false;
    });
    
    $('where_dress').addEvent('mouseenter', function(e){
		menubgover(slideMenu5, 'where_dress_li', 'where_dress', 'rm5', 'sub5_ctl', 'sub5_ctr');
        return false;
    });
    
    $('where_dress_li').addEvent('mouseleave', function(e){
		menubgout(slideMenu5, 'where_dress_li', 'where_dress', 'rm5', 'sub5_ctl', 'sub5_ctr');
        return false;
    });
    
    $$('.submenu_li').addEvent('mouseover', function(e){
        this.style.backgroundColor = "#A61E00";
    });
    
    $$('.submenu_li').addEvent('mouseout', function(e){
        this.style.backgroundColor = "#C32300";
    });
    
});