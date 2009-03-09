	
		
	var hide = true;
	var _x, _y;

	function remind() {
		if (document.getElementById("signin").reminput.checked) {
			document.getElementById("remimg").src = 'images/remind0.gif';
			document.getElementById("signin").reminput.checked = 0;
		} else {
			document.getElementById("remimg").src = 'images/remind1.gif';
			document.getElementById("signin").reminput.checked = 1;
		}
	}
	

	function hideAlt() {
		disappear(0);
		hide = true;
	}
	
	onload = function() {
		document.onmousemove = function(t) { 
			right = false;
			bottom = false;
			_dx = 10;
			_dy = 20;
		    if(!t) t = event; 
		    _x = t.clientX;
			_y = t.clientY;
			if (_x+_dx+document.getElementById("myalt").clientWidth>document.documentElement.clientWidth) {
				_x = document.documentElement.clientWidth-document.getElementById("myalt").clientWidth-(_dx+3);
				right = true;
			}
			if (_y+_dx+document.getElementById("myalt").clientHeight>document.documentElement.clientHeight) {
				_y = document.documentElement.clientHeight-document.getElementById("myalt").clientHeight-_dy;
				bottom = true;
			}
			if(bottom&&right) {
				_y = document.documentElement.clientHeight-document.getElementById("myalt").clientHeight-_dy*4;
			}
			document.getElementById("myalt").style.left = _dx+_x+document.documentElement.scrollLeft+"px";
			document.getElementById("myalt").style.top = _dy+_y+document.documentElement.scrollTop+"px";
		}
	} 
	
	function moveAlt(word) {				
		if (hide) {
			appear(1);
			document.getElementById("myalt").innerHTML = word;	
			document.getElementById("myalt").style.display = "block";
			hide = false;
		}
		
	}
	
	var op,t,t2,obj;
	
	op=0;
	
	function appear(x) { 	
		if(op < x) { 
	        clearTimeout(t2); 
	        op = op+0.05;  
	        obj.style.opacity = op; 
	        obj.style.filter = 'alpha(opacity='+op*100+')';
	        t=setTimeout('appear('+x+')',10); 
	    } 
	} 
	
	function disappear(x) { 
	    if(op+0.01 > 0) { 
	        clearTimeout(t); 
	        op = op-0.05; 
	        obj.style.opacity = op; 
	        obj.style.filter = 'alpha(opacity='+op*100+')'; 
	        t2=setTimeout('disappear('+x+')',10); 
	        if(op < 0 ) {
	       		obj.style.opacity = 0; 
	        	obj.style.filter = 'alpha(opacity=0)'; 
	        	document.getElementById("myalt").style.display = "none";
	        }
	    } 
	} 
	
	var osi,op2,t1osi,t2osi;
	osi=0;
	function opensi() {
		if (osi < 293) {
			osi = osi + 10;
			if (osi > 293) {
				osi = 293;
			}
			clearTimeout(t2osi);
			op2 = osi/293;
	        document.getElementById("signin").style.opacity = op2; 
	        document.getElementById("signin").style.filter = 'alpha(opacity='+op2*100+')'; 
			document.getElementById('form-wrapper').style.marginRight = -293+osi+"px";
			document.getElementById('open-si').style.display = "none";
	        t1osi=setTimeout('opensi()', 1); 
	        
		}
	}
	
	function closesi() {
		if (osi > 0) {
			osi = osi - 10;
			if (osi < 0) {
				osi = 0;
			}
			op2 = osi/293;
			clearTimeout(t1osi);
	        document.getElementById("signin").style.opacity = op2; 
	        document.getElementById("signin").style.filter = 'alpha(opacity='+op2*100+')'; 
			document.getElementById('form-wrapper').style.marginRight = -293+osi+"px";
			document.getElementById('open-si').style.display = "none";
	        t2osi=setTimeout('closesi()', 1); 
	        if (osi == 0) {
				document.getElementById('open-si').style.display = "block";
	        }
	        
		}		
	}
	
	onload = function() {
		document.getElementById("news").style.height = document.getElementById("text2").clientHeight+'px';
	}
	
	onresize = function() {
		document.getElementById("news").style.height = document.getElementById("text2").clientHeight+'px';
	}
	