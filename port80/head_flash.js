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