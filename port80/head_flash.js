if (swfobject.hasFlashPlayerVersion("10.0.0")) {<!-- ��������� ������ flash, �� ������� ������ ����� -->
	var fn = function() {
		var att = { data:"top_flash.swf", width:"990", height:"182" };<!-- ��������� ���� � ��� flash-�������, � ��� �� ��� ������� -->
		var par = {
			menu:"true", <!-- ��� ������������ ���� ����������� ��������� ��������� -->
			quality:"high", <!-- ������� �������� -->
			wmode:"opaque" <!-- ����� ����� ���� ��������� flash -->
		};
		var id = "topflash"; <!-- id �����, ���� ����� �������� flash -->
		var myObject = swfobject.createSWF(att, par, id);
	};
	swfobject.addDomLoadEvent(fn);
}