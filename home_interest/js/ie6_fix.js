try{
	document.execCommand("BackgroundImageCache", false, true);
} catch(e) {
	
}

/*
 * Как использовать
 * В CSS-файле написать такое правило:
 * .png{
 * 	filter: expression(fixPNG(this));
 * }
 */
function fixPNG(element) {
	if (/MSIE (5\.5|6).+Win/.test(navigator.userAgent)) {
		var src;

		if (element.tagName == 'IMG') {
			if (/\.png$/.test(element.src)) {
				src = element.src;
				element.src = "img/blank.gif";
			}
		} else {
			src = element.currentStyle.backgroundImage
					.match(/url\("(.+\.png)"\)/i)
			if (src) {
				src = src[1];
				element.runtimeStyle.backgroundImage = "none";
			}
		}

		var re_scale_mode = /iesizing\-(\w+)/;
		var m = re_scale_mode.exec(element.className);

		var scale_mode = (m) ? m[1] : 'crop';

		if (src)
			element.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"
					+ src + "',sizingMethod='" + scale_mode + "')";
	}
}